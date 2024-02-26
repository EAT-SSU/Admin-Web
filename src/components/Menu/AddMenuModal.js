import React, { useState } from 'react';
import { Button, Modal, TextField, DialogActions, Dialog, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';


function AddMenuModal({ open, handleClose, handleAddMenu }) {
    const [category, setCategory] = useState('');
    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');

    const handleSubmit = () => {
        handleAddMenu({ category: category, name: menuName, price: menuPrice });
        handleClose();
    };

    const SelectButton = styled(Button)({
        fontSize: '0.9rem',
        fontWeight: '600',
        alignItems: 'center',
        padding: '0.1rem 3rem',
        margin: '0 0.5rem',
    });

    const SelectTextField = styled(TextField)({
        width: '100%',
    });
    return (
        <Modal open={open} onClose={handleClose}>
            <div className='modalContainer'>
                <div className='modalTitle'>메뉴 추가</div>
                <div className='addMenuContainer'>
                    <SelectTextField
                        label="카테고리"
                        placeholder='카테고리를 입력해주세요(예: 분식, 라면, 세트메뉴 등)'
                        variant="outlined"
                        margin="normal"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <SelectTextField
                        label="메뉴명"
                        placeholder='메뉴명을 입력해주세요'
                        variant="outlined"
                        margin="normal"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />
                    <SelectTextField
                        label="가격"
                        placeholder='가격을 입력해주세요'
                        variant="outlined"
                        margin="normal"
                        value={menuPrice}
                        onChange={(e) => setMenuPrice(e.target.value)}
                    />
                </div>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <SelectButton variant="outlined" onClick={handleClose} color="inherit">
                        취소하기
                    </SelectButton>
                    <SelectButton variant="outlined" onClick={handleSubmit} color="primary" autoFocus>
                        추가하기
                    </SelectButton>
                </DialogActions>
            </div>
        </Modal>

    );
}

export default AddMenuModal;