import React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import "./Menu.css";

function WeeklyNavigator({ selectedDate, setSelectedDate, hidden }) {
  // 이전 주차로 이동
  const handlePrevWeek = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(prevDate);
  };

  // 다음 주차로 이동
  const handleNextWeek = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(nextDate);
  };

  // 날짜를 yyyy.MM.dd 형식으로 변환
  const formatWeek = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={`dateNavigatorContainer ${hidden ? "hidden" : ""}`}>
      <ArrowBackIosNewRoundedIcon
        onClick={handlePrevWeek}
        className="navigatorArrow"
      />
      <span className="dateText">{formatWeek(selectedDate)}</span>
      <ArrowForwardIosRoundedIcon
        onClick={handleNextWeek}
        className="navigatorArrow"
      />
    </div>
  );
}

export default WeeklyNavigator;
