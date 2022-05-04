import { useState, useEffect } from 'react';
function ReservationMenu({
  menuType,
  onEditRec,
  onCopyRec,
  onInsertRec,
  onBlockTime,
  onNewReservation,
  onClose,
}) {
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
      <div className="m-auto  max-w-[600px] bg-gray-700 border-2 border-solid border-gray-400 rounded-md w-[97%]  flex flex-col content-evenly">
        <button
          className="relative w-full"
          onClick={() => {
            onClose(true);
          }}
        >
          <div className="absolute  -top-5 -right-5  p-2  bg-gray-700 border-2 border-solid border-gray-400 rounded-full  flex justify-center  items-center">
            <img className="h-2" src={'/icons/close.svg'} alt="menu close" />
          </div>
        </button>

        <div className="w-full flex flex-col justify-center  items-center">
          {menuType == 1 && (
          <button
              className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onEditRec(true);
              }}
            >
              Редактировать
            </button>
          )}
          {menuType == 1 && (
            <button
              className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onCopyRec(true);
              }}
            >
              Копировать
            </button>
          )}
          {menuType == 2 && (
            <button
              className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onInsertRec(false);
              }}
            >
              Вставить
            </button>
          )}
          {menuType == 2 && (
            <button className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onInsertRec(true);
              }}
            >
              Вставить с подтверждением времени
            </button>
          )}
          {((menuType == 2)||(menuType == 3)) && (
            <button className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onBlockTime(true);
              }}
            >
             Заблокировать время
            </button>
          )}
          {menuType == 3 && (
            <button className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onNewReservation();
              }}
            >
             Создать новую резервацию
            </button>
          )}
          {menuType == 4 && (
            <button className="cursor-pointer w-full hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => {
                onBlockTime(false);
              }}
            >
             Снять блок
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationMenu;
