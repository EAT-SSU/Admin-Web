import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function AddMealModal({ open, handleClose, handleAddMeal }) {
    const [menuItems, setMenuItems] = useState([{ name: '' }]);

    const handleChange = (index, field, value) => {
        const updatedItems = [...menuItems];
        updatedItems[index][field] = value;
        setMenuItems(updatedItems);
    };

    const addMenuItem = () => {
        setMenuItems([...menuItems, { name: '' }]);
    };

    const removeMenuItem = (index) => {
        const updatedItems = [...menuItems];
        updatedItems.splice(index, 1);
        setMenuItems(updatedItems);
    };

    const handleSubmit = () => {
        // 메뉴 추가 로직
        handleAddMeal(menuItems);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div className='modalContainer'>
                <h2>식단 추가</h2>
                {menuItems.map((item, index) => (
                    <div key={index} className='addMenuLine' >
                        <TextField
                            variant="filled"
                            placeholder='메뉴 이름을 입력해주세요.'
                            value={item.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            sx={{ width: '80%' }}
                        />
                            <IconButton variant="outlined" onClick={() => removeMenuItem(index)} aria-label="delete" size="large">
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                    </div>
                ))}
                <DialogActions>
                    <Button onClick={addMenuItem} color="primary">
                        메뉴 추가하기
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="primary" autoFocus>
                        식단 등록
                    </Button>
                </DialogActions>
            </div>
        </Modal>
    );
}

export default AddMealModal;