import React, { useState } from 'react';
import './Menu.css';
import RoundedButton from '../RoundedButton';
import DeleteConfirmModal from '../DeleteConfirmModal';
import ModifyMenuModal from './ModifyMenuModal';

function MenuItem({ menuType = {}, menuInfo = {}, modifyMenu = {}, deleteMenu = {} }) {
    const buttonClass = menuType === 'meal' ? 'hidden' : '';
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        deleteMenu(menuInfo.id);
        setIsDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const handleClickDeleteButton = () => {
        setIsDeleteModalOpen(true);
    }

    const handleConfirmModify = (modifiedInfo) => {
        modifyMenu(menuInfo.id, modifiedInfo.name, modifiedInfo.price);
        setIsModifyModalOpen(false);
    };

    const handleCancleModify = () => {
        setIsModifyModalOpen(false);
    };

    const handleClickModifyButton = () => {
        setIsModifyModalOpen(true);
    }

    return (
        <li key={menuInfo.id} className="menu-item">
            <div className="menuItemName">{menuInfo.name}</div>
            <div className="menuItemPrice">{menuInfo.price}</div>
            <div className="menuItemRating">{menuInfo.rating !== null ? menuInfo.rating : '-'}</div>
            {/* menuType이 'meal'이면 hidden 클래스를 추가합니다. */}
            <div className={`menuItemButton ${buttonClass}`}>
                <RoundedButton onClick={handleClickModifyButton}>메뉴 수정</RoundedButton>
            </div>
            {/* menuType이 'meal'이면 hidden 클래스를 추가합니다. */}
            <div className={`menuItemButton ${buttonClass}`}>
                <RoundedButton onClick={handleClickDeleteButton}>메뉴 삭제</RoundedButton>
            </div>
            {isDeleteModalOpen && (
                <DeleteConfirmModal
                    open={isDeleteModalOpen}
                    handleConfirm={handleConfirmDelete}
                    handleCancel={handleCancelDelete}
                />
            )}
            {isModifyModalOpen && (
                <ModifyMenuModal
                    open={isModifyModalOpen}
                    menuInfo={menuInfo}
                    handleConfirm={handleConfirmModify}
                    handleCancel={handleCancleModify}
                />
            )}
        </li>
    );
}
export default MenuItem;