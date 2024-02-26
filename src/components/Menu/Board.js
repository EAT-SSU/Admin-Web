import React, { useState } from 'react';
import { List, ListItem, ListSubheader, ListItemText, Button } from '@mui/material';
import MenuItem from './MenuItem';
import './Menu.css';
import RoundedButton from '../RoundedButton';
import DeleteConfirmModal from '../DeleteConfirmModal';
import AddMenuModal from './AddMenuModal';

function Board({ menuType = {}, deleteMeal = {}, addMenu = {}, deleteMenu = {}, sections = {}, modifyFixMenu = {} }) {
    const [showModal, setShowModal] = useState(false);
    const [showAddMenuModal, setShowAddMenuModal] = useState(false);

    const [IdToDelete, setIdToDelete] = useState(null); // 삭제할 식단 Id
    const [selectedCategory, setSelectedCategory] = useState('');

    const clickDeleteHandler = (IdToDelete) => {
        setIdToDelete(IdToDelete);
        setShowModal(true);
    }

    const handleConfirmDelete = () => {
        deleteMeal(IdToDelete);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const clickAddMenuHandler = (category) => {
        setSelectedCategory(category);
        setShowAddMenuModal(true);
    }

    const addMenuHadler = (menuInfo) => {
        addMenu(selectedCategory, menuInfo);
    }

    const clickModifyCategoryHandler = (category) => {
        console.log('clickModifyCategoryHandler', category);
    }

    if (menuType === 'meal') {
        return (
            <div style={{ height: '100%' }}>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: '25rem',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: '100%',
                        '& ul': { padding: 0 },
                        '&::-webkit-scrollbar': {
                            width: '0.3rem',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        }
                    }}
                    subheader={<li />}
                >
                    {sections.map((meal) => (
                        <li key={`section-${meal.mealId}`}>
                            <ul>
                                <ListSubheader sx={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='listStickyHeader' >식단 {meal.mealId}</div>
                                    {/* 버튼 추가 */}
                                    <RoundedButton variant="contained" color="primary" onClick={() => clickDeleteHandler(meal.mealId)}>
                                        식단 삭제
                                    </RoundedButton>
                                </ListSubheader>
                                {meal.menuLines.map((menuLine) => (
                                    <MenuItem menuType={menuType} menuInfo={menuLine} ></MenuItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
                {showModal && (
                    <DeleteConfirmModal
                        open={showModal}
                        handleConfirm={handleConfirmDelete}
                        handleCancel={handleCancelDelete}
                    />
                )}
            </div>
        )
    } else if (menuType === 'fix-menu') {
        return (
            <div style={{ height: '100%' }}>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: '25rem',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: '100%',
                        '& ul': { padding: 0 },
                        '&::-webkit-scrollbar': {
                            width: '0.3rem',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        }
                    }}
                    subheader={<li />}
                >
                    {sections.map((section) => (
                        <li key={`section-${section.category}`}>
                            <ul>
                                <ListSubheader sx={{ display: 'flex', alignItems: 'center' }}>
                                    <div className='listStickyHeader' >{section.category}</div>
                                    <RoundedButton variant="contained" color="primary" onClick={() => clickModifyCategoryHandler(section.category)}>
                                        카테고리 이름 변경
                                    </RoundedButton>
                                </ListSubheader>
                                {section.menuLines.map((menuLine) => (
                                    <MenuItem menuType={menuType} menuInfo={menuLine} deleteMenu={deleteMenu} modifyMenu={modifyFixMenu}></MenuItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
                {showAddMenuModal && (
                    <AddMenuModal
                        open={showAddMenuModal}
                        handleClose={() => setShowAddMenuModal(false)}
                        handleAddMenu={addMenuHadler}
                    />
                )}
            </div>
        )
    }
}

export default Board;