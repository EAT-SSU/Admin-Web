import React, { useState, useEffect } from "react";
import { Button, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Board from "./Board";
import AddMealModal from "./AddMealModal";

function WeekRestaurant({
  menuType,
  isLoading,
  boardData,
  addCategoryAction,
  addMenuAction,
  addMealAction,
  deleteMenuAction,
  deleteMealAction,
  modifyFixMenuAction,
}) {
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

  const AddMenuButton = styled(Button)({
    color: "inherit",
    fontSize: "0.9rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    padding: "0.1rem 0.4rem",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  });

  const LoadingSkeleton = styled(Skeleton)({
    width: "25rem",
    height: "20rem",
  });

  if (isLoading) {
    return (
      <div className="restaurantBoardContainer">
        <LoadingSkeleton variant="rounded" />
      </div>
    );
  }

  return (
    <div className="restaurantBoardContainer">
      <div className="addButtonConatiner">
        <AddMenuButton onClick={() => setIsModalOpen(true)}>
          식단 추가하기
          <ArrowForwardIosRoundedIcon
            sx={{
              paddingBottom: "0.15rem",
              fontSize: "1rem",
            }}
          />
        </AddMenuButton>
      </div>
      <div className="boardContainer" id="scrollBar">
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

export default WeekRestaurant;
