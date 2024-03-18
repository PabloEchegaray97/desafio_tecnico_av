import React from 'react';
import { Modal, Button } from '@mui/material';

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    open,
    onClose,
    onConfirm,
    itemName,
}) => {
    const determiner = itemName === 'carrera' ? 'esta' : itemName === 'habilidad' ? 'esta' : 'este';

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <div className="modal-container">
                <div className="modal-content">
                    <h2 id="delete-modal-title">Eliminar {itemName}</h2>
                    <p id="delete-modal-description">
                        ¿Está seguro de que desea eliminar {determiner} {itemName}?
                    </p>
                    <div className="modal-actions">
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={onConfirm} variant="contained" color="error">
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
