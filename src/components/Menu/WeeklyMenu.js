import React, { useState } from "react";
import Meal from "./Meal/Meal";
import FixMenu from "./FixMenu/FixMenu";
import DateNavigator from "./DateNavigator";
import MenuTypeRadio from "./MenuTypeRadio";
import TimePartSelector from "./TimePartSelector";
import "./Menu.css";

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
      <DateNavigator
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        hidden={selectedMenuType === "fix-menu"}
      />
      <MenuTypeRadio
        selectedMenuType={selectedMenuType}
        setselectedMenuType={setSelectedMenuType}
      />
    </div>
  );
}
export default WeeklyMenu;
