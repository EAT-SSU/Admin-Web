import React, { useState } from "react";
import Meal from "./Meal/Meal";
import FixMenu from "./FixMenu/FixMenu";
import MenuTypeRadio from "./MenuTypeRadio";

import "./Menu.css";
import WeeklyNavigator from "./WeekNavigaotr";
import Restaurant from "./Restaurant";
import RestaurantPartSelector from "./RestaurantPartSelector";
import WeeklyMeal from "./Meal/WeeklyMeal";

function WeeklyMenu() {
  const [selectedMenuType, setSelectedMenuType] = useState("meal");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimePart, setSelectedTimePart] = useState("lunch");

  const renderSelectedComponent = () => {
    switch (selectedMenuType) {
      case "meal":
        return <Meal date={selectedDate} timePart={selectedTimePart} />;
      case "fix-menu":
        return <FixMenu />;
      default:
        return <Meal />;
    }
  };

  return (
    <div className="rootWrapper">
      <WeeklyNavigator
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        hidden={selectedMenuType === "fix-menu"}
      />

      <RestaurantPartSelector
        selectedTimePart={selectedTimePart}
        setSelectedTimePart={setSelectedTimePart}
        hidden={selectedMenuType === "fix-menu"}
      >
        <WeeklyMeal date={selectedDate} timePart={selectedTimePart} />
      </RestaurantPartSelector>
    </div>
  );
}
export default WeeklyMenu;
