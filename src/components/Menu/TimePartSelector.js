import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const items = [
    { label: '아침', value: 'morning' },
    { label: '점심', value: 'lunch' },
    { label: '저녁', value: 'dinner' },
]

function TimePartSelector({ selectedTimePart, setSelectedTimePart, hidden }) {

    const handleMealTypeChange = (timePart) => {
        setSelectedTimePart(timePart);
    };

    const MenuButton = styled(Button)({
        margin: '0 4rem',
        padding: '0.4rem 1rem',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    });

    return (
        <div className={`timePartSelectorContainer ${hidden ? 'hidden' : ''}`}>
            {items.map(item => (
                <MenuButton
                    variant="text"
                    key={item.value}
                    color={selectedTimePart == item.value ? 'primary' : 'inherit'}
                    onClick={() => handleMealTypeChange(item.value)}
                >
                    {item.label}
                </MenuButton>
            ))}

        </div>

    );
}

export default TimePartSelector;