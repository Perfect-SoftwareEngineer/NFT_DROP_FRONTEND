import React from 'react';
import { Dialog, CircularProgress } from '@mui/material';

interface ComponentProps {
    open: boolean;
    onClose?: () => void;
}

const WaitingDlg: React.FC<ComponentProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            PaperProps={{
                sx: {
                    padding: 4,
                    background: 'none',
                    boxShadow: 'none',
                },
            }}
        >
            <CircularProgress />
        </Dialog>
    );
};

export default WaitingDlg;
