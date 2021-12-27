import { useState, useEffect, useContext } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { Day } from './Day';
import { NewEventModal } from './NewEventModal';
import { DeleteEventModal } from './DeleteEventModal';
import { useDate } from './hooks/useDate';
import AppContext from '../appContext';

function Schedule(props) {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [location, setLocation] = useState();
  const [locations, setLocations] = useState();
  const [game, setGame] = useState();
  const [templates, setTemplates] = useState([]);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setTemplates(props.choice);
  }, [props.choice]);
  const value = useContext(AppContext);
  var games = value.games.map((item) => item.name);
  var locs = value.games.map((item) => item.locs);
  var locationsArray = locs.map((item) =>
    item.map((loc) => [value.locations[loc].name, loc])
  );

  const changeLocations = (e) => {
    e.preventDefault();
    setLocations(locationsArray[e.target.value]);
    setGame(e.target.value);
  };
  const eventForDate = (date) => events.find((e) => e.date.split('T')[0]  === date);
  const { days, dateDisplay } = useDate(events, nav);

  return (
    <>
      <div id="container" className="w-full max-w-[1000px]">
        {/* location & game */}
        <form className="grid grid-col-2 m-auto sm:grid-flow-row phone:grid-flow-col laptop:grid-flow-col gap-4">
          <h3 className="w-full">
            Игра
            <select
              className=" outline-none border-none rounded-sm bg-[#0C1118]  p-0.5 mx-1"
              id="game"
              onChange={changeLocations}
            >
              {games.map((item, index) => {
                return (
                  <option value={index} key={`game__${index}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </h3>
          <h3 className="w-full">
            Локации
            <select
              className=" outline-none border-none rounded-sm bg-[#0C1118]  p-0.5 mx-1"
              id="location"
              onChange={async (e) => {
                e.preventDefault();
                setLocation(e.target.value);
                console.log(
                  'call for events game:',
                  game,
                  'loc',
                  e.target.value
                );

                // GET request
                const res = await fetch('/api/admin/get_schedules', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({location:parseInt(e.target.value), game:parseInt(game)}),
                });

                let data = await res.json();
                console.log(data);
                setEvents(data);
              }}
            >
              {locations &&
                locations.map((item, index) => {
                  return (
                    <option value={item[1]} key={`locations__${index}`}>
                      {item[0]}
                    </option>
                  );
                })}
            </select>
          </h3>
        </form>
        {location && games && (
          <div>
            <CalendarHeader
              dateDisplay={dateDisplay}
              onNext={() => setNav(nav + 1)}
              onBack={() => setNav(nav - 1)}
            />
            <div id="weekdays" className="w-full flex text-[#247BA0]">
              <div className="w-[14.2857%] m-0 text-center truncate">
                Понедельник
              </div>
              <div className="w-[14.2857%] m-0 text-center truncate">
                Вторник
              </div>
              <div className="w-[14.2857%] m-0 text-center truncate">Среда</div>
              <div className="w-[14.2857%] m-0 text-center truncate">
                Четверг
              </div>
              <div className="w-[14.2857%] m-0 text-center truncate">
                Пятница
              </div>
              <div className="w-[14.2857%] m-0 text-center truncate">
                Суббота
              </div>
              <div className="w-[14.2857%] m-0 text-center truncate">
                Воскресенье
              </div>
            </div>

            <div id="calendar" className="w-full m-auto flex flex-wrap">
              {days.map((d, index) => (
                <Day
                  key={index}
                  day={d}
                  onClick={() => {
                    if (d.value !== 'padding') {
                      setClicked(d.date);
                      console.log(d.date)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          choice={templates}
          onClose={() => setClicked(null)}
          onSave={async (title, id, color) => {
            //  update ADD request

            const res = await fetch('/api/admin/add_update_schedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                template_id: id,
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
                template_id:id,
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
        <DeleteEventModal
          eventText={eventForDate(clicked).title}
          eventSchedule={
            templates[templates.map(function (e) {return e._id}).indexOf(eventForDate(clicked).template_id)].appointments
          }
          onClose={() => setClicked(null)}
          onDelete={async() => {
            setEvents(events.filter((e) => e.date.split('T')[0]  !== clicked));

            // delete request
            const res = await fetch('/api/admin/del_schedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({ date:clicked }), 
          });
          
          let data = await res.json();
            setClicked(null);
          }}
        />
      )}
    </>
  );
}

export default Schedule;
