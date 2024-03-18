import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface Career {
    _id: string;
    name: string;
    description: string;
}

interface Skill {
    _id: string;
    name: string;
}

interface AddModalProps<T> {
    open: boolean;
    onClose: () => void;
    onAdd: (item: T) => void;
    isSkill: boolean;
}

const AddModal: React.FC<AddModalProps<Skill | Career>> = ({ open, onClose, onAdd, isSkill }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        if (isSkill) {
            const newSkill: Skill = { _id: '', name: name };
            onAdd(newSkill);
        } else {
            const newCareer: Career = { _id: '', name: name, description: description };
            onAdd(newCareer);
        }
        onClose();
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
                    {isSkill ? 'Agregar Habilidad' : 'Agregar Carrera'}
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                {!isSkill && (
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mt: 1, mb: 3, width: '100%' }}
                    />
                )}
                <div className='w100 flex-center'>
                    <Button variant="contained" onClick={handleAdd} sx={{ mr: 2 }}>
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

export default AddModal;
