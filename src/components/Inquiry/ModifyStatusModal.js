import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

function ModifyStatusModal({ open, handleClose, handleModify }) {
    const [selectedStatus, setSelectedStatus] = useState('WAITING');

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSubmit = () => {
        // 선택된 상태(selectedStatus)를 처리하는 로직을 추가할 수 있습니다.
        handleModify(selectedStatus)
        handleClose();
    };


    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '50%' } }}>
            <DialogTitle>문의 상태 변경</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">처리 상태</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={selectedStatus}
                        label="Status"
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value={'WAITING'}>WAITING</MenuItem>
                        <MenuItem value={'ANSWERED'}>ANSWERED</MenuItem>
                        <MenuItem value={'HOLD'}>HOLD</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} variant="contained" color="primary">확인</Button>
                <Button color="grey" variant="contained" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModifyStatusModal;