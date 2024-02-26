import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Inquiry from '../Inquiry/Inquiry';
import Report from '../Report/Report';
import Menu from '../Menu/Menu';

function Manage() {
    const [selectedComponent, setSelectedComponent] = useState('menu');

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'menu':
                return <Menu />;
            case 'report':
                return <Report />;
            case 'inquiry':
                return <Inquiry />;
            default:
                return <Menu />;
        }
    };

    return (
        <div>
            <NavBar
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
            />
            {/* 선택된 컴포넌트 렌더링 */}
            {renderSelectedComponent()}
        </div>
    );
}

export default Manage;

