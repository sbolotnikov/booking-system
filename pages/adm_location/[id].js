import { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
import ReservationForm from '../../components/reservationForm';
import AppContext from '../../appContext';
import DaySchedule from '../../components/DaySchedule';
import ReservationMenu from '../../components/reservationMenu';
import { useSession } from 'next-auth/react';

function adm_location(props) {
  const { data: session, loadings } = useSession();
  const [location, setLocation] = useState(props.id);
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState();
  const [reserveCopied, setReserveCopied] = useState();
  const [reservePaste, setReservePaste] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [menuType, setMenuType] = useState(0);
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
        {!!reservation && visible && (
          <ReservationForm
            prevDate={''}
            reservation={reservation}
            onClose={(e) => {
              setVisible(!e);
            }}
          />
        )}
      </div>
      <div>
        {visibleMenu && (
          <ReservationMenu
            menuType={menuType}
            onEditRec={(e) => {
              setVisible(!visible);
              setVisibleMenu(!visibleMenu);
            }}
            onCopyRec={(e) => {
              setReserveCopied(reservation);
              setVisibleMenu(!visibleMenu);
            }}
            onInsertRec={async (e) => {
              console.log(dateSet, e, reserveCopied, reservePaste);
              let textLine = '';
              if (
                reserveCopied.date.split('T')[0] +
                  reserveCopied.reservationHour +
                  reserveCopied.reservationMin !==
                dateSet +
                  reservePaste.reservationHour +
                  reservePaste.reservationMin
              )
                textLine = `Смена даты/времени игры с ${
                  reserveCopied.date.split('T')[0]
                } ${reserveCopied.reservationHour}:${
                  reserveCopied.reservationMin
                } на${
                  reserveCopied.date.split('T')[0] !== dateSet
                    ? ' ' + dateSet
                    : ''
                } ${
                  reserveCopied.reservationHour +
                    reserveCopied.reservationMin !==
                  reservePaste.reservationHour + reservePaste.reservationMin
                    ? ' ' +
                      reservePaste.reservationHour +
                      ':' +
                      reservePaste.reservationMin
                    : ''
                }.`;
              textLine +=
                reserveCopied.game !== reservePaste.game
                  ? ` Заменить игру с ${
                      gamesArray[reserveCopied.game].name
                    } на ${gamesArray[reservePaste.game].name}.`
                  : '';
              textLine += `Подтверждение от клиента: ${ e ? 'ДА' : 'НЕТ'}.`;
              console.log(textLine, session.user.id);
              const res = await fetch('/api/admin/update_reservation', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  selectedId: reserveCopied._id,
                  changeRecord: {
                    note: textLine,
                    adminID: session.user.name,
                    dateChange: new Date(Date.now()),
                  },
                  reservePaste: {
                    ...reservePaste,
                    date: dateSet + 'T00:00:00.000+00:00',
                    location,
                  },
                }),
              });
              // confirm reservation if needed
              if (e==true){
              const res1 = await fetch('/api/admin/confirm_reservation', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  selectedId: reserveCopied._id,
                }),
              });

              }

              //  2- amongUs 3-5 games free appoinment in the schedule
              if (reserveCopied.game > 1 && reserveCopied.game < 6) {
                const res2 = await fetch('/api/reservation/make_busy_add', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    date: reserveCopied.date,
                    schedule_id: reserveCopied.schedule_id,
                    game: reserveCopied.game,
                    location,
                    hours: reserveCopied.reservationHour,
                    minutes: reserveCopied.reservationMin,
                    color: 'green',
                  }),
                });
                const confirm_code2 = await res2.json();
                console.log(confirm_code2);
              }
              // 2- amongUs 3-5 games make busy appoinment in the schedule
              if (reservePaste.game > 1 && reservePaste.game < 6) {
                const res3 = await fetch('/api/reservation/make_busy_add', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    date: dateSet + 'T00:00:00.000+00:00',
                    schedule_id: reservePaste._id,
                    game: reservePaste.game,
                    location,
                    hours: reservePaste.reservationHour,
                    minutes: reservePaste.reservationMin,
                    color: e?"pink":'orange',
                  }),
                });
                const confirm_code3 = await res3.json();
                console.log(confirm_code3);
              }
              window.location.reload(false);
            }}
            onClose={(e) => {
              setVisibleMenu(!e);
            }}
          />
        )}
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
                location,
                date: e.target.value,
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
                  gameNumber={i}
                  reservations={reservations.filter(
                    (item) =>
                      item.game == i && item.date.split('T')[0] == dateSet
                  )}
                  schedules={schedules.filter((item) => item.game == i)[0]}
                  onReservationClick={async (e) => {
                    console.log(e.adminID);
                    const res = await fetch('/api/admin/get_admin', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        id: e.adminID,
                      }),
                    });
                    const data = await res.json();
                    console.log(data);
                    setReservation({ ...e, adminName: data.name });
                    setMenuType(1);
                    setVisibleMenu(true);
                  }}
                  onAppointmentClick={(e) => {
                    setReservePaste(e);
                    console.log(reserveCopied)
                    if (reserveCopied !== undefined && e.status == 'green') {
                      setMenuType(2);
                      setVisibleMenu(true);
                    }
                  }}
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
