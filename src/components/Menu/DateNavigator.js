import React, { useState } from "react";
import Calendar from "react-calendar";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import "./Menu.css";
import "react-calendar/dist/Calendar.css";

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

  // 달력 모달 표시 상태 토글
  const handleDateClick = () => {
    setCalendarVisible(!calendarVisible);
  };

  // 새로운 날짜 선택 시 상태 업데이트
  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false); // 달력 모달 숨기기
  };

  return (
    <div className={`dateNavigatorContainer ${hidden ? "hidden" : ""}`}>
      <ArrowBackIosNewRoundedIcon
        onClick={handlePrevDate}
        className="navigatorArrow"
      />
      <span className="dateText" onClick={handleDateClick}>
        {formatDate(selectedDate)}
      </span>
      <ArrowForwardIosRoundedIcon
        onClick={handleNextDate}
        className="navigatorArrow"
      />
      {calendarVisible && (
        <div className="calendarModal">
          <Calendar onChange={handleCalendarChange} value={selectedDate} />
        </div>
      )}
    </div>
  );
}

export default DateNavigator;
