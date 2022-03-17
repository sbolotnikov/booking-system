import { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
import ReservationForm from '../../components/reservationForm';
import AppContext from '../../appContext';
import DaySchedule from '../../components/DaySchedule';

function adm_location(props) {
  const [location, setLocation] = useState(props.id);
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState();
  const [visible, setVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [gamesArray, setGamesArray] = useState([]);
  const [style1, setStyle1] = useState({ display: 'none' });
  const value = useContext(AppContext);
  const getDateString = (dt) => {
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    return `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${
      day < 10 ? '0' : ''
    }${day}`;
  };
  const [dateSet, setDateSet] = useState(getDateString(new Date()));
  var locationsArray = value.locations.map((item) => item.name);
  useEffect(async () => {
    // GET request
    const res = await fetch('/api/admin/get_reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
      }),
    });

    let data = await res.json();
    setReservations(data);
  }, []);
  useEffect(() => {
    let loc1 = parseInt(location);
    setGamesArray(value.games.filter((game) => game.locs.indexOf(loc1) > -1));
  }, [location]);
  return (
    <div className="w-full flex justify-center items-center">
       <div>
          {!!reservation && visible &&

                <ReservationForm
                  prevDate={ ''}
                  reservation={reservation}
                  onClose={e=>{setVisible(!e)}}
                />
          }
        </div>
      <div className="w-full max-w-[1000px] flex flex-row justify-center items-center flex-wrap">
        <h3 className="w-full xs:text-md sm:text-xl phone:text-2xl tablet:text-3xl text-center">
          Резервации для локации:
          <div
            className="relative cursor-pointer"
            onMouseEnter={(e) => {
              setStyle1({ display: 'block' });
            }}
            onMouseLeave={(e) => {
              setStyle1({ display: 'none' });
            }}
          >
            {locationsArray[location]}
            <div
              style={style1}
              className="absolute top-8 right-0 z-[1000] w-full flex flex-row justify-center items-center flex-wrap "
            >
              <div className="w-auto rounded-md border bg-[#0C1118]  p-0.5 m-1">
                {locationsArray.map((item, index) => {
                  return (
                    <h3 key={`locations__${index}`}>
                      <a
                        key={`link__${index}`}
                        // href={`/adm_location/[${index}]`} as={`/adm_location/${index}`}
                        href={`/adm_location/${index}`}
                      >
                        {item}
                      </a>
                    </h3>
                  );
                })}
              </div>
            </div>
          </div>
        </h3>
        <input
          type="date"
          className="text-black"
          defaultValue={getDateString(new Date())}
          onChange={async (e) => {
            setDateSet(e.target.value);
            const res1 = await fetch('/api/admin/get_day_schedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                location, date:e.target.value
              }),
            });

            let data1 = await res1.json();
            setSchedules(data1);
          }}
        />
        <div className="flex flex-row overflow-x-scroll">
          {gamesArray.map((item, i) => {
            return (
              <div key={'div0' + i} className="m-1">
                <h4 key={'header' + i} className="h-20">
                  {item.name}
                </h4>
                <DaySchedule
                  startTime={value.startTime}
                  endTime={value.endTime}
                  reservations={reservations.filter(
                    (item) =>
                      item.game == i && item.date.split('T')[0] == dateSet
                  )}
                  schedules={schedules.filter(
                    (item) =>
                      item.game == i
                  )[0]}
                  onReservationClick={e=>{setReservation(e); setVisible(true)}}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default adm_location;
export function getServerSideProps(context) {
  return { props: { id: context.query.id } };
}
