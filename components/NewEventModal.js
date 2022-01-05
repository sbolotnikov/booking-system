import { useState, useEffect } from 'react';
import TimeDisplay from './timeDisplay';
export const NewEventModal = ({choice, eventDay, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [color, setColor] = useState("");
    const [appointments, setAppointments] = useState([]);  
      useEffect(() => {
        setTitle(choice[0].name);
        setColor(choice[0].color);
        console.log(choice[0].color)
        setAppointments(
          choice[0].appointments.sort(
            (a, b) => a.reservationHour - b.reservationHour
          )
        );
        console.log(choice[0].appointments.sort(
            (a, b) => a.reservationHour - b.reservationHour
          ))
      }, []);
    return(
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center z-[600] items-center">
        <div className="w-[85%]  max-w-[700px]  bg-black rounded-md flex flex-col justify-between  items-center p-4">
          <h2>Новое расписание: {new Date(eventDay+'T23:00:00.000Z').toLocaleDateString('ru-ru', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })}</h2>
  
          {/* <input 
            className={error ? 'error' : ''}
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            id="eventTitleInput" 
            placeholder="Event Title" 
          /> */}
  <div className="w-full flex flex-row justify-center items-center flex-wrap">
          <select
            className="bg-[#0C1118]"
            id="templates1"
            style={{background:color}}
            onChange={(e) => {
              e.preventDefault();
              setTitle(choice[e.target.value].name);
              setColor(choice[e.target.value].color);
              console.log(choice[e.target.value].color)
              setAppointments(
                choice[e.target.value].appointments.sort(
                  (a, b) => a.reservationHour - b.reservationHour
                )
              );
              console.log(choice[e.target.value].appointments.sort(
                  (a, b) => a.reservationHour - b.reservationHour
                ))
            }}
          >
            {choice &&
              choice.map((item, index) => {
                return (
                  <option key={'templ' + index} value={index} style={{background:item.color}}>
                    {item.name}
                  </option>
                );
              })}
          </select>

          <div className="flex flex-row justify-center items-center flex-wrap">
            {appointments &&
              appointments.sort((a, b) => a.reservationHour - b.reservationHour).map((item, index) => {
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
        </div>
          <button 
            onClick={() => {
              
              if (title) {
                setError(false);
                console.log(appointments)
                onSave(title, appointments, color);
              } else {
                setError(true);
              }
            }} 
            id="saveButton">Сохранить</button>
  
  
          <button 
            onClick={onClose}
            id="cancelButton">Отмена</button>
        </div>
  
        <div id="modalBackDrop"></div>
      </div>
    );
  };