import TimeDisplay from "./timeDisplay";

export const DeleteEventModal = ({ onDelete, eventText, eventSchedule, onClose }) => {
    console.log(eventSchedule)
  return (
    <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center z-[600] items-center">
      <div className="w-[85%]  max-w-[700px]  bg-black rounded-md flex flex-col justify-between  items-center p-4">
        <h2>Расписание</h2>

        <p id="eventText">{eventText}</p>
        <div className="flex flex-row justify-center items-center flex-wrap">
            {eventSchedule &&
                eventSchedule.map((item, index) => {
                return (
                  <button key={'btnAppt' + index}>
                    <TimeDisplay
                      key={item.id}
                      price={item.price}
                      time={`${item.reservationHour}:${
                        item.reservationMin < 10 ? '0' : ''
                      }${item.reservationMin}`}
                      timeStatus={'green'}
                    />
                  </button>
                );
              })}
          </div>
        <button onClick={onDelete} id="deleteButton">
          Удалить
        </button>
        <button onClick={onClose} id="closeButton">
          Закрыть
        </button>
      </div>

      <div id="modalBackDrop"></div>
    </div>
  );
};
