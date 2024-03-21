import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import AddIcon from '@mui/icons-material/Add';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal'; 
import AddModal from './AddModal'; 
import { toast } from 'react-toastify';
import { Skill, Career } from '../types/types';

const CareersList: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); 
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false); 

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get<Career[]>('http://localhost:3000/career');
                setCareers(response.data);
            } catch (error) {
                console.error('Error fetching careers:', error);
            }
        };

        fetchCareers();
    }, []);

    const handleDeleteCareer = async () => {
        try {
            await axios.delete(`http://localhost:3000/career/${selectedCareer?._id}`);
            setCareers(prevCareers => prevCareers.filter(career => career._id !== selectedCareer?._id));
            toast.success('Carrera eliminada con éxito');
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(`Error al eliminar carrera ${error}`)
            console.error('Error deleting career:', error);

        }
    };
    const handleAddCareer = async (newCareer: Skill | Career) => {
        try {
            const existingCareer = await axios.get(`http://localhost:3000/career/${newCareer.name}`)
                        .catch(error => {
                            if (error.response && error.response.status === 404) {
                                return null; 
                            } else {
                                throw error;
                            }
                        });
            if(!existingCareer) {
                const response = await axios.post<Career>('http://localhost:3000/career', newCareer);
                setCareers(prevCareers => [...prevCareers, response.data]);
                toast.success('Carrera agregada con éxito');
                setIsAddModalOpen(false);
            }
            else {
                toast.error('La carrera ya existe en la base de datos')
            }
        } catch (error) {
            toast.error('Error al agregar carrera');
            console.error('Error adding career:', error);
        }
    };
    const handleEditCareer = async (editedItem: Skill | Career) => {
        try {
            const editedCareer = editedItem as Career;
            await axios.patch(`http://localhost:3000/career/${editedCareer._id}`, editedCareer);
            setCareers(prevCareers => prevCareers.map(career => (career._id === editedCareer._id ? editedCareer : career)));
            toast.success('Carrera editada con éxito');
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(`Error al editar carrera: ${error}`)
            console.error('Error editing career:', error);
        }
    };

    return (
        <div className='table-container'>
            <div className='title-button'>
                <h2 className='table-title m-bottom m-top'>Lista de Carreras</h2>
                <AddIcon
                    sx={{ color: 'white', backgroundColor: 'black', cursor: 'pointer' }}
                    onClick={() => setIsAddModalOpen(true)}
                />
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {careers.map((career) => (
                        <tr key={career._id}>
                            <td>{career.name}</td>
                            <td>{career.description}</td>
                            <td>
                                <EditIcon
                                    sx={{ color: '#FFBC52', cursor: 'pointer', marginRight: '5px' }}
                                    onClick={() => {
                                        setSelectedCareer(career);
                                        setIsEditModalOpen(true);
                                    }}
                                />
                                <DeleteIcon
                                    sx={{ color: '#FE5B52', cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedCareer(career);
                                        setIsDeleteModalOpen(true);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteCareer}
                itemName="carrera"
            />
            <EditModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={selectedCareer || { _id: '', name: '', description: '' }}
                onSave={handleEditCareer}
            />
            <AddModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddCareer}
                isSkill={false}
            />
        </div>
    );
};

export default CareersList;
