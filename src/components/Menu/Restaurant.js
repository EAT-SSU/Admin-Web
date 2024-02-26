import React, { useState, useEffect } from 'react';
import { Button, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Board from './Board';
import AddMenuModal from './AddMenuModal';
import AddMealModal from './AddMealModal';

function Restaurant({ menuType, isLoading, boardData, addCategoryAction, addMenuAction, addMealAction, deleteMenuAction, deleteMealAction, modifyFixMenuAction }) {
    const [sections, setSections] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 식당/메뉴 추가 모달 열림 상태

    useEffect(() => {
        if (boardData) {
            setSections(boardData.sections);
        }
    }, [boardData]);

    const addMeal = (menuItems) => {
        const menuNames = menuItems.map((item) => item.name);
        addMealAction(boardData.restaurantName, menuNames);
    };

    const addMenu = (menuInfo) => {
        addMenuAction(boardData.restaurantName, menuInfo.category, menuInfo.name, menuInfo.price);
    }

    const AddMenuButton = styled(Button)({
        color: 'inherit',
        fontSize: '0.9rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        padding: '0.1rem 0.4rem',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    });

    const LoadingSkeleton = styled(Skeleton)({
        width: '25rem',
        height: '20rem',
    });


    if (isLoading) {
        return (
            <div className='restaurantBoardContainer'>
                <LoadingSkeleton
                    variant="rounded"
                />
            </div>
        )
    }

    if (menuType == 'meal') {
        return (
            <div className='restaurantBoardContainer'>
                <p className='restaurantName'>{boardData.restaurantName}</p>
                <div className='addButtonConatiner'>
                    <AddMenuButton onClick={() => setIsModalOpen(true)}>
                        식단 추가하기
                        <ArrowForwardIosRoundedIcon sx={{
                            paddingBottom: '0.15rem',
                            fontSize: '1rem'
                        }} />
                    </AddMenuButton>
                </div>
                <div className='boardContainer' id='scrollBar'>
                    <Board
                        menuType={menuType}
                        sections={boardData.sections}
                        deleteMeal={deleteMealAction}
                    />
                </div>
                <AddMealModal
                    open={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    handleAddMeal={addMeal}
                />
            </div>
        );
    }

    if (menuType == 'fix-menu') {
        return (
            <div className='restaurantBoardContainer'>
                <p className='restaurantName'>{boardData.restaurantName}</p>
                <div className='addButtonConatiner'>
                    <AddMenuButton onClick={() => setIsModalOpen(true)}>
                        메뉴 추가하기
                        <ArrowForwardIosRoundedIcon sx={{
                            paddingBottom: '0.15rem',
                            fontSize: '1rem'
                        }} />
                    </AddMenuButton>
                </div>
                <div className='boardContainer' id='scrollBar'>
                    <Board
                        menuType={menuType}
                        sections={boardData.sections}
                        deleteMenu={deleteMenuAction}
                        addMenu={addMenuAction}
                        modifyFixMenu={modifyFixMenuAction}
                    />
                </div>
                <AddMenuModal
                    open={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    handleAddMenu={addMenu}
                />
            </div>
        );
    }
}
export default Restaurant;
