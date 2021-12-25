import { useState, useEffect } from 'react';
import EditTemplate from './editTemplate';
import TimeDisplay from './timeDisplay';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [editable, setEditable] = useState(false);
  useEffect(async () => {
    const res = await fetch('/api/admin/get_templates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await res.json();
    console.log(data);
    setTemplates(data);
  }, []);
  return (
    <div className="w-full flex flex-row justify-center items-center flex-wrap">
      <button
        className="w-full flex flex-row"
        onClick={(e) => {
          e.preventDefault();
          setEditable(!editable);
        }}
      >
        <img className="w-5 h-5 m-1" src={'/icons/edit.svg'} alt="edit button" />{(editable)?"Редактировать":"Выбрать"} расписание
      </button>
      {!editable && (
        <div className="w-full flex flex-row justify-center items-center flex-wrap">
          <select
            className="bg-[#0C1118]"
            id="templates"
            onChange={(e) => {
              e.preventDefault();
              setName(templates[e.target.value].name);
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
      )}
      {editable && <EditTemplate choice={templates} />}
    </div>
  );
}

export default Templates;
