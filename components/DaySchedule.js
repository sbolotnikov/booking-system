import Link from 'next/link';
import { useState, useEffect } from 'react';

function DaySchedule({
  startTime,
  endTime,
  gameNumber,
  reservations,
  schedules,
  gameLength,
  widthSpan,
  onReservationClick,
  onAppointmentClick,
}) {
  const [screenWidth, setScreenWidth] = useState(0);
  var slots = [];
  let appt = [];

  if (!!schedules && Object.keys(schedules).indexOf('appointments') > -1)
    appt = schedules.appointments;

  for (let i = startTime; i <= endTime; i++) {
    slots.push(i);
  }
  function getPrice(id) {
    let obj =
      appt[
        appt
          .map(function (e) {
            return e._id;
          })
          .indexOf(id)
      ];
    if (!!obj) return `${obj.price}₽ ${obj.perPerson ? 'с чел.' : ''}`;
    return '';
  }
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    console.log(window.innerWidth)
  }, [window.innerWidth]);
  return (
    <div
      id="calendar"
      className={
        screenWidth > 767
          ? 'w-[98%] m-auto flex flex-wrap relative'
          : 'w-48 m-auto flex flex-wrap relative'
      }
    >
      {slots &&
        slots.map((d, index) => (
          <div
            key={`timeslot ${index}`}
            style={{
              width: '100%',
              height: `${widthSpan}px`,
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
        <div
          key={`appt_${index}`}
          data-value={`${index}`}
          className="absolute rounded-md leading-4 w-[95%] p-1"
          style={{
            height: `${(gameLength / 60) * widthSpan}px`,
            top: `${
              (item.reservationHour - startTime + item.reservationMin / 60) *
              widthSpan
            }px`,
            left: '4px',
            backgroundColor: item.status,
          }}
          onClick={(e) => {
            let sendObj = appt[e.target.dataset.value];
            sendObj['game'] = gameNumber;
            onAppointmentClick(sendObj);
          }}
        >
          {`${item.reservationHour}:${item.reservationMin} ₽${item.price} ${
            item.perPerson ? 'с чел.' : ''
          }`}
        </div>
      ))}
      {reservations.map((item, index) => (
        <div
          key={`reserve${index}`}
          className="absolute rounded-md leading-4 w-[95%] flex-wrap p-1"
          style={{
            height: `${(gameLength / 60) * widthSpan}px`,
            top: `${
              (item.reservationHour - startTime + item.reservationMin / 60) *
              widthSpan
            }px`,
            left: '4px',
            backgroundColor: `${
              !!item.reservationConfirmDate ? 'blue' : 'red'
            } `,
          }}
        >
          <div
            key={`reserveBox${index}`}
            className="flex flex-row justify-between items-center"
          >
            <div
              key={`reserve1${index}`}
              data-value={`${index}`}
              onClick={(e) => {
                onReservationClick(reservations[e.target.dataset.value]);
              }}
              dangerouslySetInnerHTML={{
                __html: `${item.reservationHour}:${
                  item.reservationMin
                }  ${getPrice(item.schedule_id)}<br>${item.name} `,
              }}
            />
            <Link href={`tel:${item.phone}`} key={`reserve2${index}`}>
              <img
                className="h-5"
                key={`call2${index}`}
                src="/icons/call.svg"
                alt="call"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DaySchedule;
