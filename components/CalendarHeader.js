import React from 'react';

export const CalendarHeader = ({ onNext, onBack, onCopyPaste, dateDisplay }) => {
  return(
    <div className="">
      <div className="ml-2 text-[#FFEC00] font-extrabold uppercase">{dateDisplay}</div>
      <div className="phone:flex phone:flex-row">
        <button className="navbar__item shadow-lg pointer border-0 outline-none rounded" onClick={onBack} style={{padding:'10px 10px', margin: '10px 10px'}} id="backButton">Назад</button>
        <button className="navbar__item shadow-lg pointer border-0 outline-none rounded" onClick={onNext} style={{padding:'10px 10px', margin: '10px 10px'}} id="nextButton">Вперед</button>
      </div>
      <button className="navbar__item shadow-lg pointer border-0 outline-none rounded" onClick={onCopyPaste} style={{padding:'10px 10px',width:'98%', margin: '10px 10px'}} id="nextButton">Копировать/Вставить/Удалить</button>
    </div>
  );
};