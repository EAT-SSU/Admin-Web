import { React, useState } from "react";
import { Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import TimePartSelector from "./TimePartSelector";
import WeeklyMeal from "./Meal/WeeklyMeal";

const items = [
  { label: "기숙사식당", value: "dorm" },
  { label: "도담식당", value: "dodam" },
  { label: "학생식당", value: "student" },
];

function RestaurantPartSelector({
  selectedTimePart,
  setSelectedTimePart,
  hidden,
  children,
}) {
  const handleMealTypeChange = (timePart) => {
    setSelectedTimePart(timePart);
  };
  const [selectedMenuType, setSelectedMenuType] = useState("meal");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const MenuButton = styled(Button)({
    margin: "0 4rem",
    padding: "0.4rem 1rem",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  });

  return (
    <>
      <div className={`timePartSelectorContainer ${hidden ? "hidden" : ""}`}>
        {items.map((item) => (
          <MenuButton
            variant="text"
            key={item.value}
            color={selectedTimePart == item.value ? "primary" : "inherit"}
            onClick={() => {
              handleMealTypeChange(item.value);
            }}
          >
            {item.label}
          </MenuButton>
        ))}
      </div>
      <Divider orientation="horizontal" />
      {selectedRestaurant && (
        <>
          <TimePartSelector
            selectedTimePart={selectedTimePart}
            setSelectedTimePart={setSelectedTimePart}
            hidden={selectedMenuType === "fix-menu"}
          />
          <WeeklyMeal date={selectedDate} timePart={selectedTimePart} />
        </>
      )}
    </>
  );
}

export default RestaurantPartSelector;
