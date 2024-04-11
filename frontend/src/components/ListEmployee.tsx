import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Chip } from '@mui/material';
import axios from 'axios';
import DeleteModal from './DeleteModal';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import { Employee } from '../types/types';
import { toast } from 'react-toastify';

const EmployeesList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<Employee[]>('http://localhost:3000/employee');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDeleteEmployee = async () => {
        try {
            await axios.delete(`http://localhost:3000/employee/${selectedEmployee?._id}`);
            toast.success('Empleado eliminado con éxito')
            fetchEmployees();
            setIsDeleteModalOpen(false);
        } catch (error) {
            toast.error(`Error al eliminar empleado ${error}`)
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className='table-container'>
            <div className='title-button'>
                <h2 className='table-title m-bottom m-top'>Lista de Empleados</h2>
                <AddIcon
                    sx={{ color: 'white', backgroundColor: '#1976d2', cursor: 'pointer' }}
                    onClick={() => setIsAddModalOpen(true)}
                />
            </div>
            <div className='table-list'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Carrera</th>
                            <th>Habilidades</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name} {employee.lastname} ({employee.age}) <br />{employee.email}</td>
                                <td>
                                    {employee.career ? employee.career.name : '-'}
                                </td>
                                <td>
                                    {employee.skills.length > 0 ? (
                                        employee.skills.map((skill) => (
                                            <Chip
                                                key={skill._id}
                                                label={skill.name}
                                                sx={{
                                                    margin: '2px',
                                                    fontSize: '0.7rem',
                                                    padding: '0px'
                                                }}
                                            />
                                        ))
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                
                                <td>
                                    <EditIcon
                                        sx={{ color: '#FFBC52', cursor: 'pointer' }}
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setIsEditModalOpen(true);
                                        }}
                                    />
                                    <DeleteIcon
                                        sx={{ color: '#FE5B52', cursor: 'pointer' }}
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setIsDeleteModalOpen(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteEmployee}
                itemName="empleado"
            />
            <AddEmployeeModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                refreshEmployees={fetchEmployees}
            />
            <EditEmployeeModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                refreshEmployees={fetchEmployees}
                employeeId={selectedEmployee?._id || ''} 
            />
        </div>
    );
};

export default EmployeesList;
