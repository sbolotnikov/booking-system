import { useState, useEffect } from 'react';
import EditTemplate from './editTemplate';
import Schedule from './Schedule';
import TimeDisplay from './timeDisplay';

function Templates() {
  const [templates, setTemplates] = useState([]);
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
        <img className="w-5 h-5 m-1" src={'/icons/edit.svg'} alt="edit button" />{(editable)?"Редактировать":"Установить"} расписания
      </button>
      {editable && <EditTemplate choice={templates} />}
      {!editable && <Schedule choice={templates} />}
    </div>
  );
}

export default Templates;
