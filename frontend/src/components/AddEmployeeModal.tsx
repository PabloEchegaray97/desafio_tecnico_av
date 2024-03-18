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
import 'react-toastify/dist/ReactToastify.css';

interface Skill {
    _id: string;
    name: string;
}

interface Career {
    _id: string;
    name: string;
    description: string;
}

interface AddEmployeeModalProps {
    open: boolean;
    onClose: () => void;
    refreshEmployees: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, onClose, refreshEmployees }) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCareer, setSelectedCareer] = useState<string>('');
    const [formValid, setFormValid] = useState<boolean>(false); 

    const [skills, setSkills] = useState<Skill[]>([]);
    const [careers, setCareers] = useState<Career[]>([]);

    useEffect(() => {
        fetchSkills();
        fetchCareers();
    }, []);

    useEffect(() => {
        const isFormValid = name !== '' && lastname !== '' && age !== '' && email !== '' && selectedCareer !== '';
        setFormValid(isFormValid);
    }, [name, lastname, age, email, selectedCareer]);

    const fetchSkills = async () => {
        try {
            const response = await axios.get<Skill[]>('http://localhost:3000/skill');
            setSkills(response.data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const fetchCareers = async () => {
        try {
            const response = await axios.get<Career[]>('http://localhost:3000/career');
            setCareers(response.data);
        } catch (error) {
            console.error('Error fetching careers:', error);
        }
    };

    const checkExistingEmail = async (email: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/employee/email/${email}`);
            return response.data !== null;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return false;
            }
        }
    };

    const handleAddEmployee = async () => {
        const emailExists = await checkExistingEmail(email);
        if (emailExists) {
            toast.error('El email ya está registrado.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/employee', {
                name,
                lastname,
                age: parseInt(age),
                email,
                skills: selectedSkills,
                career: selectedCareer
            });
            refreshEmployees();
            onClose();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleDeleteSkill = (skillId: string) => {
        setSelectedSkills((prevSkills) => prevSkills.filter((id) => id !== skillId));
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
                    Agregar Empleado
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                    required
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                    required
                />
                <TextField
                    label="Edad"
                    variant="outlined"
                    type='number'
                    required
                    value={age}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0 && value <= 120) {
                            setAge(e.target.value);
                        } else {
                            setAge('');
                        }
                    }}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                    required
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
                        {skills.map((skill) => (
                            <MenuItem key={skill._id} value={skill._id}>
                                {skill.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className='d-flex w100 chips-container'>
                        {selectedSkills.map((value) => (
                            <div key={value}>
                                <Chip
                                    label={skills.find((skill) => skill._id === value)?.name}
                                    onDelete={() => handleDeleteSkill(value)}
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
                        required
                    >
                        {careers.map((career) => (
                            <MenuItem key={career._id} value={career._id}>
                                {career.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className='w100 flex-center'>
                    <Button variant="contained" onClick={handleAddEmployee} disabled={!formValid} sx={{ mr: 2 }}>
                        Agregar
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddEmployeeModal;
