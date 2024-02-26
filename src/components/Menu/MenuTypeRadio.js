import React from 'react';
import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import './Menu.css';

function MenuTypeRadio({ selectedMenuType, setselectedMenuType }) {

    const handleMenuTypeChange = (event) => {
        setselectedMenuType(event.target.value);
    };
    
    return (
        <div className='menuTypeRadioContainer'>
            <FormControl>
                <RadioGroup
                    row
                    value={selectedMenuType}
                    onChange={handleMenuTypeChange}
                >
                    <FormControlLabel value="meal" control={<Radio />} label="변동" />
                    <FormControlLabel value="fix-menu" control={<Radio />} label="고정" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default MenuTypeRadio;