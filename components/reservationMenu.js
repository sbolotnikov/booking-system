import { useState, useEffect } from 'react';
function ReservationMenu({ menuType, onEditRec, onCopyRec,onInsertRec, onClose }) {
  function StopScroll() {
    // prevent scrolling
    var x = 0;
    var y = el.scrollTop;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }
  function AllowScroll() {
    // when done release scroll
    window.onscroll = function () {};
  }
  useEffect(() => {
    StopScroll();

    // get_admin
  }, []);
  const el = document.querySelector('#mainPage');
  return (
    <div
      className="w-[100vw] h-[100vh] absolute flex justify-center items-center bg-slate-500/70 left-0 top-0 z-[1000] backdrop-blur-md"
      style={{ top: el.scrollTop }}
    >
      <div className="m-auto  max-w-[600px] bg-gray-700 border-2 border-solid border-gray-400 rounded-md w-[97%] p-2 flex flex-col content-evenly">
        <button
          className="relative w-full"
          onClick={() => {
            onClose(true);
          }}
        >
          <div className="absolute  -top-5 -right-5  p-2  bg-black rounded-full  flex justify-center  items-center">
            <img className="h-2" src={'/icons/close.svg'} alt="menu close" />
          </div>
        </button>

        <div className="w-full flex flex-col justify-center  items-center">
          {menuType == 1 && (
            <div
              onClick={() => {
                onEditRec(true);
              }}
            >
              Редактировать
            </div>
          )}
          {menuType == 1 && (
            <div
              onClick={() => {
                onCopyRec(true);
              }}
            >
              Копировать
            </div>
          )}
          {menuType == 2 &&
          <div onClick={() => {
                onInsertRec(false);
              }}
              >Вставить
          </div>}
          {menuType == 2 &&
          <div onClick={() => {
                onInsertRec(true);
              }}
              >Вставить с подтверждением времени
          </div>}
        </div>
      </div>
    </div>
  );
}

export default ReservationMenu;
