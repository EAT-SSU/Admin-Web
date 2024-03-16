import React, { useState, useEffect } from "react";
import { sendAuthorizedHttpRequest } from "api/api";
import "../Menu.css";
import Restaurant from "../Restaurant";
import WeekRestaurant from "../WeekRestaurant";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const restaurantToEnum = {
  "도담 식당": "DODAM",
  "기숙사 식당": "DORMITORY",
  "학생 식당": "HAKSIK",
};

// restaurantName을 enumName으로 변환하는 함수
function convertRestaurantToEnum(restaurantName) {
  return restaurantToEnum[restaurantName];
}

function WeeklyMeal({ date, timePart }) {
  const [menuBoardDatas, setMenuBoardDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatedDate = formatDate(date);

  useEffect(() => {
    fetchMealsData();
  }, [date, timePart]);

  const fetchMealsData = async () => {
    try {
      setIsLoading(true);
      const response = await sendAuthorizedHttpRequest(
        "get",
        `/meals?date=${formatedDate}&timePart=${timePart.toUpperCase()}`
      );
      console.log(response);
      setMenuBoardDatas(response.result.menuBoards);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setIsLoading(true);
    }
  };

  const addMeal = async (restaurantName, menuNames) => {
    try {
      await sendAuthorizedHttpRequest(
        "post",
        `/meals?date=${formatedDate}&timePart=${timePart.toUpperCase()}&restaurant=${convertRestaurantToEnum(
          restaurantName
        )}`,
        {
          menuNames: menuNames,
        }
      );
      await fetchMealsData();
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const deleteMeal = async (mealId) => {
    try {
      await sendAuthorizedHttpRequest("delete", `/meals/${mealId}`);
      await fetchMealsData();
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  return (
    <div className="menuBoardsContainer">
      {isLoading
        ? [
            <WeekRestaurant isLoading={isLoading} />,
            <WeekRestaurant isLoading={isLoading} />,
            <WeekRestaurant isLoading={isLoading} />,
          ]
        : menuBoardDatas.map((menuBoardData) => (
            <WeekRestaurant
              menuType={"meal"}
              isLoading={isLoading}
              boardData={menuBoardData}
              addMealAction={addMeal}
              deleteMealAction={deleteMeal}
            />
          ))}
    </div>
  );
}

export default WeeklyMeal;
