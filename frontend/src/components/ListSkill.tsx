import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';
import { toast } from 'react-toastify';
interface Skill {
    _id: string;
    name: string;
}

const SkillsList: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get<Skill[]>('http://localhost:3000/skill');
                setSkills(response.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, []);

    const handleDeleteSkill = async () => {
        try {
            await axios.delete(`http://localhost:3000/skill/${selectedSkill?._id}`);
            setSkills(prevSkills => prevSkills.filter(skill => skill._id !== selectedSkill?._id));
            toast.success('Habilidad eliminada con éxito');
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(`Error al eliminar habilidad: ${error}`)
            console.error('Error deleting skill:', error);
        }
    };

    const handleEditSkill = (skill: Skill) => {
        setSelectedSkill(skill);
        setIsEditModalOpen(true);
    };

    const handleUpdateSkill = async (updatedSkill: Skill) => {
        try {
            const response = await axios.patch<Skill>(`http://localhost:3000/skill/${updatedSkill._id}`, updatedSkill);
            setSkills(prevSkills => prevSkills.map(skill => (skill._id === updatedSkill._id ? response.data : skill)));
            toast.success('Habilidad editada con éxito');
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(`Error al editar habilidad: ${error}`)
            console.error('Error updating skill:', error);
        }
    };

    const handleAddSkill = async (newSkill: Skill) => {
        try {
            const response = await axios.post<Skill>('http://localhost:3000/skill', newSkill);
            setSkills(prevSkills => [...prevSkills, response.data]);
            toast.success('Habilidad agregada con éxito')
            setIsAddModalOpen(false);
        } catch (error) {
            toast.error(`Error al agregar habilidad: ${error}`)
            console.error('Error adding skill:', error);
        }
    };

    return (
        <div className='table-container'>
            <div className='title-button'>
                <h2 className='table-title m-bottom m-top'>Lista de Habilidades</h2>
                <AddIcon
                    sx={{ color: 'white', backgroundColor: 'black', cursor: 'pointer' }}
                    onClick={() => setIsAddModalOpen(true)}
                />
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill) => (
                        <tr key={skill._id}>
                            <td>{skill.name}</td>
                            <td>
                                <EditIcon
                                    sx={{ color: '#FFBC52', cursor: 'pointer', marginRight: '8px' }}
                                    onClick={() => handleEditSkill(skill)}
                                />
                                <DeleteIcon
                                    sx={{ color: '#FE5B52', cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedSkill(skill);
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
                onConfirm={handleDeleteSkill}
                itemName="habilidad"
            />
            <EditModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={selectedSkill || { _id: '', name: '' }}
                onSave={handleUpdateSkill}
            />
            <AddModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddSkill}
                isSkill={true}
            />
        </div>
    );
};

export default SkillsList;
