import TimeDisplay from './timeDisplay';
import EditTimePriceForm from './editTimePriceForm';
import { useState } from 'react';
export const DeleteEventModal = ({
  onDelete,
  eventText,
  eventSchedule,
  onClose,
  onSave,
}) => {
  const [editStatus, setEditStatus] = useState(false);
  const [appointments, setAppointments] = useState(eventSchedule);
  console.log(eventSchedule);
  const onEdit = () => {
    setEditStatus(!editStatus);
    if (eventSchedule !== appointments) {
      onSave(appointments);
    }
  };
  const pull_data = (appt) => {
    console.log(appt);
    let apptArray = appointments;
    apptArray[appt.i] = appt.appt;
    setAppointments([...apptArray]);
    // Use spread operator to set up state otherwise children DO NOT RENDER
  };

  const delete_one = (num) => {
    console.log(num.n);
    let apptArray = appointments;
    apptArray.splice(num.n, 1);
    setAppointments([...apptArray]);
    console.log(appointments);
  };
  return (
    <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center z-[600] items-center">
      <div className="w-[85%]  max-w-[700px]  bg-black rounded-md flex flex-col justify-between  items-center p-4">
        <h2>Расписание</h2>

        <p id="eventText">{eventText}</p>
        <div className="flex flex-row justify-center items-center flex-wrap">
          {appointments &&
            appointments.map((item, index) => {
              return (
                <div key={'btnAppt' + index}>
                  {editStatus ? (
                    <EditTimePriceForm
                      key={`apptt_${index}`}
                      info={{ item, i: index }}
                      onDel={delete_one}
                      onEnter={pull_data}
                    />
                  ) : (
                    <TimeDisplay
                      key={item.id}
                      price={item.price}
                      time={`${item.reservationHour}:${
                        item.reservationMin < 10 ? '0' : ''
                      }${item.reservationMin}`}
                      timeStatus={'green'}
                    />
                  )}
                </div>
              );
            })}
          {editStatus ? (
            <button
              className="rounded border-[#74b9ff] text-[#74b9ff] w-10 h-10 border-2 mx-1 my-auto p-2"
              onClick={(e) => {
                e.preventDefault();
                setAppointments([
                  ...appointments,
                  {
                    reservationHour: 0,
                    reservationMin: 0,
                    price: 0,
                    status: 'green',
                  },
                ]);
              }}
            >
              <img src={'/icons/plus.svg'} alt="add button" />
            </button>
          ) : (
            ''
          )}
        </div>
        <button onClick={onEdit} id="editButton">
          {editStatus ? 'Сохранить' : 'Редактировать'}
        </button>
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
