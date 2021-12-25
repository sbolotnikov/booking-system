import { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { Day } from './Day';
import { NewEventModal } from './NewEventModal';
import { DeleteEventModal } from './DeleteEventModal';
import { useDate } from './hooks/useDate';

function Schedule(props) {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [templates, setTemplates] = useState([]);
  const [events, setEvents] = useState(
    // localStorage.getItem('events') ? 
    //   JSON.parse(localStorage.getItem('events')) : 
      []
  );
  useEffect(() => {
    setTemplates(props.choice);
  }, [props.choice]);

  const eventForDate = date => events.find(e => e.date === date);

  useEffect(() => {
    // localStorage.setItem('events', JSON.stringify(events));
    console.log(events)
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  return(
    <>
      <div id="container" className="w-full max-w-[1000px]">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays" className="w-full flex text-[#247BA0]">
          <div className="w-[14.2857%] m-0 text-center truncate">Понедельник</div>
          <div className="w-[14.2857%] m-0 text-center truncate">Вторник</div>
          <div className="w-[14.2857%] m-0 text-center truncate">Среда</div>
          <div className="w-[14.2857%] m-0 text-center truncate">Четверг</div>
          <div className="w-[14.2857%] m-0 text-center truncate">Пятница</div>
          <div className="w-[14.2857%] m-0 text-center truncate">Суббота</div>
          <div className="w-[14.2857%] m-0 text-center truncate">Воскресенье</div>
        </div>

        <div id="calendar"className="w-full m-auto flex flex-wrap">
          {days.map((d, index) => (
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

      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          choice={templates}
          onClose={() => setClicked(null)}
          onSave={(title, id, color) => {
            setEvents([ ...events, {id, color, title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          eventSchedule={templates[templates.map(function (e) { return e._id;}).indexOf(eventForDate(clicked).id)].appointments}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
  );
}

export default Schedule
