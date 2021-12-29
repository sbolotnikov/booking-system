import { useState, useEffect, useContext } from 'react';
import AppContext from '../appContext';
import AlertMenu from './alertMenu';
import ReservationForm from './reservationForm';

function ReservationsAdmin() {

  const [location, setLocation] = useState();
  const [locations, setLocations] = useState();
  const [game, setGame] = useState();
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const [reservations, setReservations] = useState([]);
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
  const onReturn = async(choice) => {

    if (choice == 'Подтвердить') {

    }
    setRevealAlert(false);
  };
  return (
    <>
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
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
                const res = await fetch('/api/admin/get_reservations', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    location: parseInt(e.target.value),
                    game: parseInt(game),
                  }),
                });

                let data = await res.json();
                console.log(data);
setReservations(data)
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
          {reservations &&
        reservations.map((item, index) => {
          return (
              <ReservationForm key={"reserveN"+index} reservation={item} />
          )})}
          </div>
        )}
      </div>

    </>
  );
}

export default ReservationsAdmin;