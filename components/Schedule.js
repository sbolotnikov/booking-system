import { useState, useEffect} from 'react';
import { CalendarHeader } from './CalendarHeader';
import { Day } from './Day';
import { NewEventModal } from './NewEventModal';
import { EditEventModal } from './EditEventModal';
import { useDate } from './hooks/useDate';
import AlertMenu from './alertMenu';

function Schedule({templates, eventsSet, game, location}) {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(eventsSet);
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const { days, dateDisplay } = useDate(events, nav);
  const weekdayName=['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
  const monthSet=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  useEffect(() => {
    setEvents(eventsSet);
  }, [eventsSet]);
  const eventForDate = (date) =>
    events.find((e) => e.date.split('T')[0] === date);
  
  const onReturn = async (choice) => {
    if (choice == 'Подтвердить') {
      setEvents(events.filter((e) => e.date.split('T')[0] !== clicked));

      // delete request
      const res = await fetch('/api/admin/del_schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: clicked }),
      });

      let data = await res.json();
      setClicked(null);
    }
    setRevealAlert(false);
  };
   return (
    <>
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      <div className="w-full max-w-[1000px]">
{/* 
        {location && game && ( */}
          <div>
            <CalendarHeader
              dateDisplay={dateDisplay}
              onNext={() => setNav(nav + 1)}
              onBack={() => setNav(nav - 1)}
            />
            <div id="weekdays" className="w-full flex text-[#FFEC00] bg-popup/80">
            {weekdayName.map((item,i)=>{
              return(
                <div key={`dayOfWeek${i}`} className="w-[14.2857%] m-0 text-center truncate">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
              )
            })}

            </div>

            <div id="calendar" className="w-full m-auto flex flex-wrap">
              {days && days.map((d, index) => (
                <Day
                  key={index}
                  day={d}
                  onClick={() => {
                    if (d.value !== 'padding') {
                      setClicked(d.date);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        {/* )} */}
      </div>
      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          choice={templates}
          eventDay={`${weekdayName[days.findIndex((e)=>e.date===clicked) % 7]}, ${parseInt(clicked.split("-")[2])} ${monthSet[parseInt(clicked.split("-")[1])-1]}`}
          onClose={() => setClicked(null)}
          onSave={async (title, appointments, color) => {
            //  update ADD request
            const res = await fetch('/api/admin/add_schedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                appointments,
                color,
                title,
                date: clicked,
                location: location,
                game: game,
              }),
            });
            const data = await res.json();
            // window.location.reload(false);
            setEvents([
              ...events,
              {
                appointments,
                color,
                title,
                date: clicked,
                location: location,
                game: game,
              },
            ]);

            setClicked(null);
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <EditEventModal
          eventDay={`${weekdayName[days.findIndex((e)=>e.date===clicked) % 7]}, ${parseInt(clicked.split("-")[2])} ${monthSet[parseInt(clicked.split("-")[1])-1]}`}
          eventText={eventForDate(clicked).title}
          eventSchedule={eventForDate(clicked).appointments}
          onClose={() => setClicked(null)}
          onSave={async (appointments) => {
            const res = await fetch('/api/admin/update_schedule', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                appointments,
                date: clicked,
                location: location,
                game: game,
              }),
            });
            let eventsArr=events;
            eventsArr[events.map(item=>item.date).indexOf(clicked+'T00:00:00.000Z')].appointments=appointments;
            setEvents(eventsArr)
          }}
          onDelete={async () => {
            setAlertStyle({
              variantHead: 'danger',
              heading: 'Педупреждение!!!',
              text: 'Вы действительно хотите удалить расписание на день?',
              color1: 'danger',
              button1: 'Подтвердить',
              color2: 'success',
              button2: 'Отменить',
            });
            setRevealAlert(true);
          }}
        />
      )}
    </>
  );
}

export default Schedule;
