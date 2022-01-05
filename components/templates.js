import { useState, useEffect, useContext } from 'react';
import EditTemplate from './editTemplate';
import Schedule from './Schedule';
import AppContext from '../appContext';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [editable, setEditable] = useState(false);
  const [events, setEvents] = useState([]);
  const [game, setGame] = useState(0)
  const value = useContext(AppContext);
  var games = value.games.map((item) => item.name);
  var locs = value.games.map((item) => item.locs);
  var locationsArray = locs.map((item) =>
    item.map((loc) => [value.locations[loc].name, loc])
  );
  const [location, setLocation] = useState(locationsArray[0][0][1]);
  const [locations, setLocations] = useState(locationsArray[0]);

 const setCurrentEventsUp = async(l, g) => {
                   // GET request
                   const res = await fetch('/api/admin/get_schedules', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      location: parseInt(l),
                      game: parseInt(g),
                    }),
                  });
  
                  let data = await res.json();
                  setEvents(data);
 }

  const changeLocations = (e) => {
    e.preventDefault();
    setLocations(locationsArray[e.target.value]);
    setLocation(locationsArray[e.target.value][0][1])
    setGame(e.target.value);
    document.getElementById("location").value=0
    setCurrentEventsUp(locationsArray[e.target.value][0][1], e.target.value);
  };

  useEffect(async () => {
    const res = await fetch('/api/admin/get_templates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await res.json();
    setTemplates(data);
    setCurrentEventsUp(location, game);
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center flex-wrap">
      <button
        className="flex flex-row"
        onClick={(e) => {
          e.preventDefault();
          setEditable(!editable);
        }}
      >
       {editable && <img className="w-5 h-5 m-1" src={'/icons/check-mark.svg'} alt="edit button" />}Редактировать шаблоны расписаний
      </button>
      {editable && <EditTemplate templates={templates} />}
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
                setCurrentEventsUp(e.target.value, game);
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
      <Schedule templates={templates} eventsSet={events} game={game} location={location}/>

    </div>
  );
}

export default Templates;
