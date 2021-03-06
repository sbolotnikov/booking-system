import { useState, useEffect, useContext } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { Day } from './Day';
import { NewEventModal } from './NewEventModal';
import { EditEventModal } from './EditEventModal';
import { useDate } from './hooks/useDate';
import AlertMenu from './alertMenu';
import CopyPasteModal from './CopyPasteModal';
import AppContext from '../appContext';

function Schedule({ templates, eventsSet, game, location }) {
  const value = useContext(AppContext);
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [visCopyPaste, setVisCopyPaste] = useState(false);
  const [events, setEvents] = useState(eventsSet);
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const { days, dateDisplay } = useDate(events, nav);
  const weekdayName = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье',
  ];
  const monthSet = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
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
            onCopyPaste={() => setVisCopyPaste(true)}
          />
          <div id="weekdays" className="w-full flex text-[#FFEC00] bg-popup/80">
            {weekdayName.map((item, i) => {
              return (
                <div
                  key={`dayOfWeek${i}`}
                  className="w-[14.2857%] m-0 text-center truncate"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              );
            })}
          </div>

          <div id="calendar" className="w-full m-auto flex flex-wrap">
            {days &&
              days.map((d, index) => (
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
      {visCopyPaste && (
        <CopyPasteModal
          onClose={() => setVisCopyPaste(false)}
          onSave={async (dateSet, dateEnd, dateStart, dateFinish, delRange) => {
            //  update ADD request
            console.log(value.nav);
            let scheduleArr = [];
            if (!delRange) {
              const res = await fetch('/api/admin/get_schedules', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  location: location,
                  game: game,
                }),
              });
              const data = await res.json();
              let dataArray = data
                .filter(
                  (item) =>
                    item.date >= dateSet &&
                    item.date <= dateEnd + 'T00:00:00.000+00:00'
                )
                .sort((a, b) => {
                  if (a.date.toString() > b.date.toString()) return 1;
                  if (a.date.toString() < b.date.toString()) return -1;
                });
              
              let dateCurrent = dateStart;
              let date1 = new Date(dateCurrent);
              let count = 0;
              let record1 = {};
              console.log(dataArray);
              while (dateFinish >= dateCurrent) {
                record1 = {
                  date: date1.toISOString(),
                  location: dataArray[count % dataArray.length].location,
                  game: dataArray[count % dataArray.length].game,
                  appointments:
                    dataArray[count % dataArray.length].appointments,
                  color: dataArray[count % dataArray.length].color,
                  title: dataArray[count % dataArray.length].title,
                };
                scheduleArr.push(record1);
                console.log(record1);
                date1.setDate(date1.getDate() + 1);
                dateCurrent = date1.toISOString().split('T')[0];
                date1 = new Date(dateCurrent);
                count++;
              }
            }
            const res0 = await fetch('/api/supervise/del_schedule_range', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                location,
                game,
                dateStart,
                dateFinish,
              }),
            });
            const data0 = await res0.json();
            console.log(data0);
            if (!delRange) {
              const res1 = await fetch('/api/supervise/add_schedule_many', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleArr),
              });
              const data1 = await res1.json();
              console.log(data1);
            }
            window.location.reload(false);
          }}
        />
      )}
      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          choice={templates}
          eventDay={`${
            weekdayName[days.findIndex((e) => e.date === clicked) % 7]
          }, ${parseInt(clicked.split('-')[2])} ${
            monthSet[parseInt(clicked.split('-')[1]) - 1]
          }`}
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
          eventDay={`${
            weekdayName[days.findIndex((e) => e.date === clicked) % 7]
          }, ${parseInt(clicked.split('-')[2])} ${
            monthSet[parseInt(clicked.split('-')[1]) - 1]
          }`}
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
            let eventsArr = events;
            eventsArr[
              events
                .map((item) => item.date)
                .indexOf(clicked + 'T00:00:00.000Z')
            ].appointments = appointments;
            setEvents(eventsArr);
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
