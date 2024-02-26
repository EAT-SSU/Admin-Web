import React, { useState } from 'react';
import { Button, Modal, TextField, DialogActions, Dialog, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';


function ModifyMenuModal({ open, menuInfo, handleConfirm, handleCancel }) {
    const [menuName, setMenuName] = useState(menuInfo.name);
    const [menuPrice, setMenuPrice] = useState(menuInfo.price);

    const handleSubmit = () => {
        handleConfirm({ name: menuName, price: menuPrice });
        handleCancel();
    };

    const SelectButton = styled(Button)({
        fontSize: '0.9rem',
        fontWeight: '600',
        alignItems: 'center',
        padding: '0.1rem 3rem',
        margin: '0 0.5rem',
    });

    return (
        <Modal open={open} onClose={handleCancel}>
            <div className='modalContainer'>
                <div className='modalTitle'>메뉴 수정</div>
                <div className='addMenuContainer'>
                    <TextField
                        label="메뉴 이름"
                        placeholder='메뉴명을 입력해주세요'
                        variant="outlined"
                        margin="normal"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />
                    <TextField
                        label="가격"
                        placeholder='가격을 입력해주세요'
                        variant="outlined"
                        margin="normal"
                        value={menuPrice}
                        onChange={(e) => setMenuPrice(e.target.value)}
                    />
                </div>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <SelectButton variant="outlined" onClick={handleCancel} color="inherit">
                        취소하기
                    </SelectButton>
                    <SelectButton variant="outlined" onClick={handleSubmit} color="primary">
                        추가하기
                    </SelectButton>
                </DialogActions>
            </div>
        </Modal>

    );
}

export default ModifyMenuModal;