import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import EditTemplate from '../../../components/editTemplate';
import Schedule from '../../../components/Schedule';
import AppContext from '../../../appContext';

function Game({location, game}) {
    const router = useRouter()
//   const { location, game } = router.query;
  const [templates, setTemplates] = useState([]);
  const [editable, setEditable] = useState(false);
  const [events, setEvents] = useState([]);
  
  const value = useContext(AppContext);
  var games = value.games.map((item) => item.name);
  var locs = value.games.map((item) => item.locs);
  var locationsArray = locs.map((item) =>
    item.map((loc) => [value.locations[loc].name, loc])
  );
  console.log(location, game)
//   const [location, setLocation] = useState(locationsArray[0][0][1]);
//   const [game, setGame] = useState(0)
  const [locations, setLocations] = useState(locationsArray[0]);
  const [style1, setStyle1] = useState({ display: 'none' });
  const [style2, setStyle2] = useState({ display: 'none' });

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
                  console.log(data)
                  setEvents(data);
 }

  const changeLocations = (e) => {
    e.preventDefault();
    // router.reload(`/admins/${location}/${e.target.value}`)
    game=e.target.value;
    Router.reload(`/admins/${location}/${e.target.value}`)
    // setLocations(locationsArray[e.target.value]);
    // setLocation(locationsArray[e.target.value][0][1])
    // setGame(e.target.value);
    // document.getElementById("location").value=0
    // setCurrentEventsUp(locationsArray[e.target.value][0][1], e.target.value);
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
    <div className="w-full flex flex-col justify-center items-center">
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
          <div className="w-full flex flex-row">
            Игра:
            <h3
            className="relative cursor-pointer outline-none border-none rounded-sm bg-[#0C1118] m-1 leading-4"
            onMouseEnter={(e) => {
              setStyle1({ display: 'flex' });
            }}

          >
            {games[game]}
            <div className="absolute top-5 -left-14 h-[100vh] w-[300px] flex flex-col justify-start z-[1000] items-center" style={style1} >

                <div className="w-[95%] max-w-[1170px]  rounded-md border bg-[#0C1118] overflow-hidden m-1"  onMouseLeave={(e) => {
              setStyle1({ display: 'none' }); 
            }}>
                  {games.map((item, index) => {
                    return (
                      <h3 key={`games__${index}`} className="leading-4 py-1 text-center hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300">
                        <a key={`link__${index}`} href={`/admin/${location}/${index}`} >
                          {item}
                        </a>
                      </h3>
                    );
                  })}
                </div> 
            </div>
            </h3>
          </div>
          <div className="w-full flex flex-row">
            Локации:
            <h3
            className="relative cursor-pointer outline-none border-none rounded-sm bg-[#0C1118] m-1 leading-4"
            onMouseEnter={(e) => {
              setStyle2({ display: 'flex' });
            }}

          >
            {locations[location][0]}
            <div className="absolute top-5 -left-14 h-[100vh] w-[300px] flex flex-col justify-start z-[1000] items-center" style={style2} >

                <div className="w-[95%] max-w-[1170px]  rounded-md border bg-[#0C1118]  overflow-hidden m-1"  onMouseLeave={(e) => {
              setStyle2({ display: 'none' }); 
            }}>
                  {locations &&
                locations.map((item, index) => {
                    return (
                      <h3 key={`locations__${index}`}   className="leading-4 py-1 text-center hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300">
                        <a key={`link2__${index}`} href={`/admin/${index}/${game}`}>
                          {item[0]}
                        </a>
                      </h3>
                    );
                  })}
                </div> 
            </div>
            </h3>
          </div>
        </form>
      <Schedule templates={templates} eventsSet={events} game={game} location={location}/>

    </div>
  );
}

export default Game;
export function getServerSideProps(context) {
    return { props: { location: context.query.location,game: context.query.game } };
  }