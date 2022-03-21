import { useState, useEffect } from 'react';

function CopyPasteModal({choice, onSave, onClose }) {
    const getDateString = (dt) => {
        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        return `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${
          day < 10 ? '0' : ''
        }${day+1}`;
      };
    const topElement = document.querySelector('#mainPage');
    const [dateSet, setDateSet] = useState(getDateString(new Date()));
    const [dateEnd, setDateEnd] = useState(getDateString(new Date(Date.now() + ( 3600 * 1000 * 24*7))));
    const [dateStart, setDateStart] = useState(getDateString(new Date()));
    const [dateFinish, setDateFinish] = useState(getDateString(new Date(Date.now() + ( 3600 * 1000 * 24*30))));
    const [delRange, setDelRange] = useState(false);
      useEffect(() => {
        
      }, []);
    return(
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center z-[600] items-center" style={{ top: topElement.scrollTop }}>
        <div className="w-[85%]  max-w-[700px]  bg-black rounded-md flex flex-col justify-between  items-center p-4">
        {!delRange?<h4>Копировать</h4>:<></>}
        {!delRange?<label className="m-1"> От <input
          type="date"
          className="text-black rounded"
          defaultValue={getDateString(new Date())}
          onChange={(e) => {
            if(getDateString(new Date(e.target.value))>dateEnd)
            {
                e.target.value=dateEnd;
                setDateSet(dateEnd);
             
            } 
            else setDateSet(e.target.value); 
           
          }}
        />
        </label>:<></>}
        {!delRange?<label> До <input
          type="date"
          className="text-black rounded"
          defaultValue={getDateString(new Date(Date.now() + ( 3600 * 1000 * 24*7)))}
          onChange={(e) => {
            if(getDateString(new Date(e.target.value))<dateSet)
            {
                e.target.value=dateSet;
                setDateEnd(dateSet);
             
            } 
            else setDateEnd(e.target.value); 
          }}
        />
        </label>:<></>}

        {!delRange?<h4>Вставить</h4>:<div></div>}
        <label className="m-1 "> От <input
          type="date"
          className="text-black rounded"
          defaultValue={getDateString(new Date())}
          onChange={async (e) => {
            if(getDateString(new Date(e.target.value))>dateFinish)
            {
                e.target.value=dateFinish;
                setDateStart(dateFinish);
             
            } 
            else setDateStart(e.target.value); 
           
          }}
        />
        </label>
        <label> До <input
          type="date"
          className="text-black rounded"
          defaultValue={getDateString(new Date(Date.now() + ( 3600 * 1000 * 24*30)))}
          onChange={async (e) => {
            if(getDateString(new Date(e.target.value))<dateStart)
            {
                e.target.value=dateStart;
                setDateFinish(dateStart);
             
            } 
            else setDateFinish(e.target.value); 
           
          }}
        />
        </label>
        <label>
        <input type="checkbox" checked={delRange} onChange={() =>setDelRange(!delRange)}
         />Удалить</label>

        {/* updateMany upsert */}
        <button 
            onClick={()=>{
                let date1=new Date(dateEnd)
                date1.setDate((date1.getDate()) + 1);
                date1 = date1.toISOString().split('T')[0];
                onSave(dateSet, date1, dateStart, dateFinish, delRange)}}
            id="cancelButton">{delRange?"Удалить":"Вставить"} расписание </button>
         <button 
            onClick={onClose}
            id="cancelButton">Отмена</button>
        </div>
        </div>
  )
}

export default CopyPasteModal