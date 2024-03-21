import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { toast } from 'react-toastify';
import validator from 'validator';
import { Skill, Career, Employee } from '../types/types';


interface EditEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    employeeId: string;
    refreshEmployees: () => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ open, onClose, employeeId, refreshEmployees }) => {
    const [employee, setEmployee] = useState<Employee>({
        _id: '',
        name: '',
        lastname: '',
        age: 0,
        email: '',
        skills: [],
        career: undefined
    });

    const [allSkills, setAllSkills] = useState<Skill[]>([]);
    const [allCareers, setAllCareers] = useState<Career[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCareer, setSelectedCareer] = useState<string>('');
    const [originalEmail, setOriginalEmail] = useState<string>('');
    const [age, setAge] = useState<number>(0);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeResponse = await axios.get<Employee>(`http://localhost:3000/employee/${employeeId}`);
                const skillsResponse = await axios.get<Skill[]>('http://localhost:3000/skill');
                const careersResponse = await axios.get<Career[]>('http://localhost:3000/career');

                const employeeData = employeeResponse.data;
                if (employeeData) {
                    setEmployee(employeeData);
                    setSelectedSkills(employeeData.skills.map(skill => skill._id));
                    setSelectedCareer(employeeData.career?._id || '');
                    setOriginalEmail(employeeData.email);
                    setAge(employeeData.age);
                } else {
                    console.error('Error: No se encontraron datos para el empleado');
                }

                setAllSkills(skillsResponse.data);
                setAllCareers(careersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (open && employeeId) {
            fetchEmployeeData();
        }
    }, [open, employeeId]);

    const handleEditEmployee = async () => {
        try {
            const validateName = (str: string) => {
                return validator.isAlpha(str, 'es-ES');
            }
            if (!validateName(employee.name) || !validateName(employee.lastname)) {
                toast.error('El nombre y el apellido solo pueden contener letras.');
                return;
            }
            if (age <= 0 || age > 120) {
                toast.error('La edad debe estar entre 1 y 120 años.');
                return;
            }
            if (!validator.isEmail(employee.email)) {
                toast.error('Por favor ingrese un email válido.');
                return;
            }
            if (employee.email !== originalEmail) {
                const emailExists = await checkExistingEmail(employee.email);
                if (emailExists) {
                    toast.error('El nuevo email ya está en uso, por favor elija otro.');
                    return;
                }
            }
            await saveEditedEmployee();
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    };

    const saveEditedEmployee = async () => {
        try {
            await axios.patch(`http://localhost:3000/employee/${employeeId}`, {
                name: capitalize(employee.name),
                lastname: capitalize(employee.lastname),
                age: age,
                email: employee.email,
                skills: selectedSkills,
                career: selectedCareer
            });
            toast.success('Empleado editado con éxito');
            refreshEmployees();
            onClose();
        } catch (error) {
            toast.error(`Error al editar empleado: ${error}`);
            console.error('Error editing employee:', error);
        }
    };

    const checkExistingEmail = async (email: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/employee/email/${email}`);
            return response.data !== null;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="mod" sx={{
                position: 'absolute',
                borderRadius: '1rem',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'white',
                boxShadow: 24,
                p: 4
            }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center', fontWeight: '700' }}>
                    Editar Empleado
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={employee.name}
                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    value={employee.lastname}
                    onChange={(e) => setEmployee({ ...employee, lastname: e.target.value })}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                <TextField
                    label="Edad"
                    variant="outlined"
                    type='number'
                    value={age === 0 ? '' : age.toString()}  
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0 && value <= 120) {
                            setAge(value);
                        } else {
                            setAge(0);
                        }
                    }}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    value={employee.email}
                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                <Box sx={{ mt: 1, mb: 1, width: '100%' }}>
                    <InputLabel>Seleccionar habilidades</InputLabel>
                    <Select
                        labelId="skills-label"
                        multiple
                        value={selectedSkills}
                        onChange={(e) => setSelectedSkills(e.target.value as string[])}
                        sx={{ width: '100%' }}
                    >
                        {allSkills.map((skill) => (
                            <MenuItem key={skill._id} value={skill._id}>
                                {skill.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className='d-flex w100 chips-container'>
                        {selectedSkills.map((value) => (
                            <div key={value}>
                                <Chip
                                    label={allSkills.find((skill) => skill._id === value)?.name}
                                    onDelete={() => setSelectedSkills((prevSkills) => prevSkills.filter((id) => id !== value))}
                                    deleteIcon={<CancelIcon />}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </div>
                        ))}
                    </div>
                </Box>
                <FormControl variant="outlined" sx={{ mt: 1, mb: 4, width: '100%' }}>
                    <InputLabel id="career-label">Carrera</InputLabel>
                    <Select
                        labelId="career-label"
                        value={selectedCareer}
                        onChange={(e) => setSelectedCareer(e.target.value)}
                        label="Carrera"
                        sx={{ width: '100%' }}
                    >
                        {allCareers.map((career) => (
                            <MenuItem key={career._id} value={career._id}>
                                {career.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className='w100 flex-center'>
                    <Button variant="contained" onClick={handleEditEmployee} sx={{ mr: 2 }}>
                        Editar
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default EditEmployeeModal;
