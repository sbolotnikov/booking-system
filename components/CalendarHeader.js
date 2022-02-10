import React from 'react';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return(
    <div className="ml-2">
      <div className="ml-2 text-[#FFEC00] font-extrabold uppercase">{dateDisplay}</div>
      <div>
        <button className="navbar__item shadow-lg pointer border-0 outline-none rounded" onClick={onBack} style={{padding:'10px 10px', margin: '5px 10px'}} id="backButton">Назад</button>
        <button className="navbar__item shadow-lg pointer border-0 outline-none rounded" onClick={onNext} style={{padding:'10px 10px', margin: '5px 10px'}} id="nextButton">Вперед</button>
      </div>
    </div>
  );
};