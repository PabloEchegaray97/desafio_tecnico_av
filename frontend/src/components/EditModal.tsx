import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Skill, Career } from '../types/types';

interface EditModalProps<T> {
    open: boolean;
    onClose: () => void;
    item: T;
    onSave: (item: Skill | Career) => void;
}

const EditModal: React.FC<EditModalProps<Skill | Career>> = ({ open, onClose, item, onSave }) => {
    const [editedSkill, setEditedSkill] = useState<Skill>({ _id: '', name: '' });
    const [editedCareer, setEditedCareer] = useState<Career>({ _id: '', name: '', description: '' });
    const [originalName, setOriginalName] = useState<string>('');

    useEffect(() => {
        if ('description' in item) {
            // Es una carrera
            setEditedCareer(item as Career);
            setEditedSkill({ _id: '', name: '' });
            setOriginalName((item as Career).name);
        } else {
            // Es una habilidad
            setEditedSkill(item as Skill);
            setEditedCareer({ _id: '', name: '', description: '' });
            setOriginalName((item as Skill).name);
        }
    }, [item]);

    const handleSave = async () => {
        try {
            if ('description' in item) {
                if (originalName !== editedCareer.name) {
                    const response = await axios.get(`http://localhost:3000/career/${editedCareer.name}`)
                        .catch(error => {
                            if (error.response && error.response.status === 404) {
                                return null; 
                            } else {
                                throw error;
                            }
                        });
                    if (response === null || !response.data) {
                        onSave(editedCareer);
                    } else {
                        toast.error('La carrera ya existe en la base de datos');
                        return;
                    }
                } else {
                    onSave(editedCareer);
                }
            } else {
                if (originalName !== editedSkill.name) {
                    const response = await axios.get(`http://localhost:3000/skill/${editedSkill.name}`)
                        .catch(error => {
                            if (error.response && error.response.status === 404) {
                                return null; 
                            } else {
                                throw error;
                            }
                        });
                    if (response === null || !response.data) {
                        onSave(editedSkill);
                    } else {
                        toast.error('La habilidad ya existe en la base de datos');
                        return;
                    }
                } else {
                    onSave(editedSkill);
                }
            }
            onClose();
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };
    
    

    const handleNameChange = (newValue: string) => {
        console.log('Nombre original:', originalName);
        console.log('Nuevo nombre:', newValue);
        if ('description' in item) {
            setEditedCareer({ ...editedCareer, name: newValue });
        } else {
            setEditedSkill({ ...editedSkill, name: newValue });
        }
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
                    Editar {editedSkill._id ? 'Habilidad' : 'Carrera'}
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={editedSkill._id ? editedSkill.name : editedCareer.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                {!editedSkill._id && (
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        value={editedCareer.description}
                        onChange={(e) => setEditedCareer({ ...editedCareer, description: e.target.value })}
                        sx={{ mt: 1, mb: 3, width: '100%' }}
                    />
                )}
                <div className='w100 flex-center m-top'>
                    <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
                        Guardar
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default EditModal;
