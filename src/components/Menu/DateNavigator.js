// DateNavigator.js
import React, { useState } from "react";
import CalendarModal from "./Modal/CalendarModal";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import "./Menu.css";

function DateNavigator({ selectedDate, setSelectedDate, hidden }) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  // 이전 날짜로 이동
  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(prevDate);
  };

  // 다음 날짜로 이동
  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  // 날짜를 yyyy.MM.dd 형식으로 변환
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={`dateNavigatorContainer ${hidden ? "hidden" : ""}`}>
      <ArrowBackIosNewRoundedIcon
        onClick={handlePrevDate}
        className="navigatorArrow"
      />
      <span className="dateText" onClick={() => setCalendarVisible(true)}>
        {formatDate(selectedDate)}
      </span>
      <ArrowForwardIosRoundedIcon
        onClick={handleNextDate}
        className="navigatorArrow"
      />

      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        selectedDate={selectedDate}
        onDateChange={(date) => {
          setSelectedDate(date);
          setCalendarVisible(false); // 모달을 닫고 날짜를 업데이트
        }}
      />
    </div>
  );
}

export default DateNavigator;
