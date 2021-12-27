import { useState, useEffect } from 'react';
import TimeDisplay from './timeDisplay';
export const NewEventModal = ({choice, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [templates, setTemplates] = useState([]);
    // const [id, setId] = useState('');
    const [color, setColor] = useState("");
    const [appointments, setAppointments] = useState([]);  
    useEffect(() => {
        setTemplates(choice);
      }, [choice]);
    
    return(
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center z-[600] items-center">
        <div className="w-[85%]  max-w-[700px]  bg-black rounded-md flex flex-col justify-between  items-center p-4">
          <h2>Новое расписание</h2>
  
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
            id="templates"
            onChange={(e) => {
              e.preventDefault();
              setTitle(templates[e.target.value].name);
              // setId(templates[e.target.value]._id);
              setColor(templates[e.target.value].color);
              console.log(templates[e.target.value].color)
              setAppointments(
                templates[e.target.value].appointments.sort(
                  (a, b) => a.reservationHour - b.reservationHour
                )
              );
            }}
          >
            {templates &&
              templates.map((item, index) => {
                return (
                  <option key={'templ' + index} value={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>

          <div className="flex flex-row justify-center items-center flex-wrap">
            {appointments &&
              appointments.map((item, index) => {
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