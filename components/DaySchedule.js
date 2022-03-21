import Link from 'next/link';
function DaySchedule({ startTime, endTime, reservations, schedules, onReservationClick }) {
  var slots = [];
  let appt=[];

  if ((!!schedules)&& (Object.keys(schedules).indexOf('appointments')>-1)) appt=schedules.appointments 

  // if (schedules['appointments']!==undefined) appt=schedules.appointments
  console.log(appt);
  console.log(reservations)
  for (let i = startTime; i <= endTime; i++) {
    slots.push(i);
  }
  function getPrice(id){
    let obj=appt[appt.map(function (e) { return e._id;}).indexOf(id)]
    console.log(obj)
    if(!!obj) return `${obj.price}₽ ${obj.perPerson?'с чел.':''}`
    return ''
  }
  return (
    <div id="calendar" className="w-52 m-auto flex flex-wrap relative">
 
      {slots &&
        slots.map((d, index) => (
          <div
            key={`timeslot ${index}`}
            style={{
              width: '100%',
              height: '50px',
              cursor: 'pointer',
              boxSizing: 'border-box',
              backgroundColor: 'bg-[#0C1118]',
              boxShadow: '0px 0px 3px #CBD4C2',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              overflow: 'hidden',
              justifyContent: 'left',
            }}
          >
            <span>{`${d}:00`}</span>
            {/* {day.event && <div className="text-xs" style={{backgroundColor: day.event.color}}>{day.event.title}</div>} */}
          </div>
        ))}
        {appt.map((item, index) => (
        <div key={`appt_${index}`} className="absolute bg-green-400 rounded-md leading-4 w-[95%] h-[50px] p-1" style={{top: `${(item.reservationHour-startTime+item.reservationMin/60)*50}px`,left:'4px'}}>
          {`${item.reservationHour}:${item.reservationMin} ₽${item.price} ${item.perPerson?'с чел.':''}`}
        </div>
      ))}
      {reservations.map((item, index) => (
        <div key={`reserve${index}`} className="absolute bg-blue-400 rounded-md leading-4 h-[50px] flex-wrap p-1" style={{top: `${(item.reservationHour-startTime+item.reservationMin/60)*50}px`,left:'4px'}}>
        <div key={`reserve1${index}`} data-value={`${index}`} onClick={(e)=>{onReservationClick(reservations[e.target.dataset.value])}} dangerouslySetInnerHTML={{ __html:`${item.reservationHour}:${item.reservationMin}  ${getPrice(item.schedule_id)} ${item.name}`}}/>
        <Link href={`tel:${item.phone}`} key={`reserve2${index}`}>{item.phone}</Link>
        </div>
      ))}
    </div>
  );
}

export default DaySchedule;
