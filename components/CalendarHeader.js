import React from 'react';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {
  return(
    <div className="ml-2">
      <div className="ml-2">{dateDisplay}</div>
      <div>
        <button className="mx-2 w-17 bg-indigo-500 shadow-lg shadow-indigo-500/50 pointer border-0 outline-none p-2 rounded" onClick={onBack} id="backButton">Назад</button>
        <button className="mx-1 w-17 bg-indigo-500 shadow-lg shadow-indigo-500/50 pointer border-0 outline-none p-2 rounded" onClick={onNext} id="nextButton">Вперед</button>
      </div>
    </div>
  );
};