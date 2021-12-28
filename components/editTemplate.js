import EditTimePriceForm from './editTimePriceForm';
import { useState, useEffect } from 'react';
function EditTemplate(props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState("#74b9ff");
  const [templates, setTemplates] = useState([]);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    setTemplates(props.choice);
  }, [props.choice]);

  console.log(props);
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
  const handleUpdateTemplate = async (e) => {
    e.preventDefault();
   console.log(appointments);
    const res = await fetch('/api/admin/add_update_template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,color, appointments }),
    });
    const data = await res.json();
    window.location.reload(false);
  };
  return (
    <div className="w-full flex flex-row justify-center items-center flex-wrap">
      <select
        className="bg-[#0C1118]"
        id="templates"
        onChange={(e) => {
          e.preventDefault();
          setName(templates[e.target.value].name);
          setColor(templates[e.target.value].color);
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
      <input
        className="w-full rounded m-1 text-center bg-[#0C1118]"
        type="text"
        placeholder="Название "
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
        value={name}
      />
      <div className="w-full rounded m-1 flex justify-center items-center bg-[#0C1118]">
      <input
        className="w-[25%] max-w-[100px] rounded m-1 "
        type="color"
        value={"#74b9ff"}
        onChange={(e) => {
          e.preventDefault();
          console.log(e.target.value);
          setColor(e.target.value);
        }}
        value={color}
      />
      <h3>Выбрерите цвет</h3>
      </div>
      <button
        className="rounded border-[#74b9ff] text-[#74b9ff] border-2 m-1 p-2"
        onClick={handleUpdateTemplate}
      >
        Сохранить
      </button>
      <button
        className="rounded border-[#74b9ff] text-[#74b9ff] border-2 m-1 p-2"
        onClick={(e) => {
          e.preventDefault();
          setAppointments([
            ...[{ reservationHour: 0, reservationMin: 0, price: 0, status:"green" }],
          ]);
          setName('');
        }}
      >
        Новое
      </button>
      <button
        className="rounded border-[#74b9ff] text-[#74b9ff] border-2 m-1 p-2"
        onClick={async (e) => {
          e.preventDefault();
          let idDel = templates[templates.map(function (e) { return e.name;}).indexOf(name)]._id;
          console.log(idDel);
          // const mongoose = require('mongoose');
          // { "_id": mongoose.Types.ObjectId(templates[templates.map(function(e) { return e.name; }).indexOf(name)]._id) }
          const res = await fetch('/api/admin/del_template', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({ "id":idDel }), 
          });
          
          let data = await res.json();
          window.location.reload(false);
          console.log(data);
        }}
      >
        Удалить
      </button>
      <div className="flex w-full flex-row justify-center items-center flex-wrap">
        {appointments &&
          appointments.map((item, index) => {
            return (
              <EditTimePriceForm
                key={`apptt_${index}`}
                info={{ item, i: index }}
                onDel={delete_one}
                onEnter={pull_data}
              />
            );
          })}
        <button
          className="rounded border-[#74b9ff] text-[#74b9ff] w-10 h-10 border-2 mx-1 my-auto p-2"
          onClick={(e) => {
            e.preventDefault();
            setAppointments([
              ...appointments,
              { reservationHour: 0, reservationMin: 0, price: 0, status:"green" },
            ]);
          }}
        >
          <img src={'/icons/plus.svg'} alt="add button" />
        </button>
      </div>
    </div>
  );
}

export default EditTemplate;