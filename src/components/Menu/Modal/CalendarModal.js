// CalendarModal.js
import React from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarModal.css";

function CalendarModal({ visible, onClose, selectedDate, onDateChange }) {
  if (!visible) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <Calendar
          onChange={(date) => {
            onDateChange(date);
            onClose();
          }}
          value={selectedDate}
          locale="en"
          showNeighboringMonth={false}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
        />
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
}

export default CalendarModal;
