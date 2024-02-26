import React, { useState, useEffect } from 'react';
import Restaurant from '../Restaurant';
import { sendAuthorizedHttpRequest } from 'api/api';

const restaurantToEnum = {
    "푸드 코트": "FOOD_COURT",
    "스낵 코너": "SNACK_CORNER",
};

function FixMenu() {
    const [menuBoardDatas, setMenuBoardDatas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFixMenusData();
    }, []);

    const fetchFixMenusData = async () => {
        try {
            console.log("fetchFixMenusData");
            setIsLoading(true);
            const response =
                await sendAuthorizedHttpRequest('get', `/menu/fix-menus`);
            setMenuBoardDatas(response.result.menuBoards);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching menu:', error);
            setIsLoading(true);
        }
    };
    const addMenu = async (restaurantName,category, menuName, menuPrice) => {
        try {
            console.log("addMenu");
            console.log(restaurantName,category, menuName, menuPrice);
            // await sendAuthorizedHttpRequest('post', `/meals?date=${formatedDate}&timePart=${timePart.toUpperCase()}&restaurant=${convertRestaurantToEnum(restaurantName)}`, {
            //     menuNames:menuNames,
            // });
            // await fetchMealsData();
        } catch (error) {
            console.error('Error adding menu:', error);
        }
    };

    const modifyFixMenu = async (menuId, menuName, menuPrice) => {
        try {
            console.log("modifyFixMenu");
            console.log(menuId, menuName, menuPrice);
            await sendAuthorizedHttpRequest('patch', `/menu/fix-menus/${menuId}`, {
                name:menuName,
                price:menuPrice,
            });
            await fetchFixMenusData();
        } catch (error) {
            console.error('Error adding menu:', error);
        }
    };

    const addCategory = async (restaurantName, categoryName) => {
        // 카테고리 추가
    }

    const deleteMene = async (menuId) => {
        try {
            console.log("deleteMene");
            console.log(menuId);

            // await sendAuthorizedHttpRequest('delete', `/meals/${mealId}`);
            // await fetchMealsData();
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    }
    return (
        <div className='menuBoardsContainer'>
            {isLoading ? (
                [
                    <Restaurant isLoading={isLoading} />,
                    <Restaurant isLoading={isLoading} />,
                    <Restaurant isLoading={isLoading} />,
                ]
            ) : (
                menuBoardDatas.map((menuBoardData) => (
                    <Restaurant menuType={'fix-menu'} isLoading={isLoading} boardData={menuBoardData} addCategoryAction={addCategory} deleteMenuAction={deleteMene} addMenuAction={addMenu} modifyFixMenuAction={modifyFixMenu} />
                ))
            )}
        </div>
    );
}
export default FixMenu;