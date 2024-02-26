import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function DeleteConfirmModal({ open, handleCancel, handleConfirm }) {
    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
            <DialogContent>삭제한 데이터는 복구할 수 없습니다.</DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    취소
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    삭제
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteConfirmModal;