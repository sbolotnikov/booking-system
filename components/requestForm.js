import GetPlayersAmount from './getPlayersAmount';
import { useState, useEffect, useContext } from 'react';
import GetLocation from './getLocation';
import SendReservationForm from './sendReservationForm';
import DayDisplay from './dayDisplay';
import AlertMenu from './alertMenu';
import AppContext from '../appContext';
function RequestForm(props) {
  const value = useContext(AppContext);
  const minPlayers = value.games[props.gameIndex].minParticipants;
  const maxPlayers = value.games[props.gameIndex].maxParticipants;
  const svgLink = value.games[props.gameIndex].img;
  const [participants, setParticipants] = useState(0);
  const [location, setLocation] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const [revealForm, setRevealForm] = useState(false);
  const [reservedTime, setReservedTime] = useState({});
  const [lastVisibleDate, setLastVisibleDate] = useState({});
  const [times, setTimes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAppointmentsTimes(0);
  }, []);

  // function to add 1 hour for date to be a actual day
  const timeshift = (n) => {
    let dateStr = n.split('T')[0];
    let dateArr = dateStr.split('-');
    let event = new Date(
      parseInt(dateArr[0]),
      parseInt(dateArr[1]) - 1,
      parseInt(dateArr[2]),
      1
    );
    // Date() gives local time
    return event.toLocaleDateString('ru-ru', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };
  const onReturn = (decision1) => {
    //
    if (decision1 == 'Согласиться') setVisible(false);
    if (decision1 == 'Подтвердить') setVisible(true);
    setRevealAlert(false);
  };
  const getDateString = (dt) => {
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    return `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${
      day < 10 ? '0' : ''
    }${day}`;
  };
  const getAppointmentsTimes = async (loc) => {
    setLocation(loc);
    let dt = new Date();
    let dt1 = getDateString(dt);
    let currentHour = dt.getHours();
    dt.setDate(dt.getDate() + 9);
    let dt2 = getDateString(dt);
    setLastVisibleDate(dt2);
    setTimes([]);
    try {
      setError('');
      setLoading(true);

      const res = await fetch('/api/reservation/getschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: props.locs[loc],
          game: props.gameIndex,
          dt1,
          dt2,
        }),
      });
      const data = await res.json();
      let apptTodayArray = data[0].appointments;
      dt = new Date();
      dt1 = getDateString(dt);
      if (data[0].date.split('T')[0] == dt1)
        for (let i = 0; i < apptTodayArray.length; i++)
          if (apptTodayArray[i].reservationHour <= currentHour)
            apptTodayArray[i].status = 'blue';
      setTimes(data);
    } catch {
      setError('Failed to get times');
    }
    setLoading(false);
  };
  return (
    <div className="w-full ">
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      {revealForm && (
        <SendReservationForm
          players={participants}
          time={reservedTime}
          onChange={(e) => {
            setRevealForm(false);
            window.location.reload(false);
          }}
        />
      )}
      <GetLocation
        loc={location}
        list={props.locations}
        onChange={getAppointmentsTimes}
      />
      <h4
        className="flex flex-row justify-center items-center"
        onClick={() => setVisible(true)}
      >
        <span>Количество игроков:{participants + ' x '}</span>
        <img
              src={svgLink}
              className="w-8 cursor-pointer"/>

      </h4>
      {visible && (
        <GetPlayersAmount
          num={participants}
          minP={minPlayers}
          maxP={maxPlayers}
          svgLink={svgLink}
          onChange={(num) => {
            console.log(window.pageYOffset)
            if (num > minPlayers) {
              setParticipants(num);
              setVisible(false);
            } else {
              setParticipants(minPlayers);
              setAlertStyle({
                variantHead: 'info',
                heading: 'Ввод количества игроков меньше допустимого',
                text: `Установим минимальное количеество игроков: ${minPlayers}?`,
                color1: 'success',
                button1: 'Согласиться',
                color2: 'secondary',
                button2: 'Вернуться  к выбору',
              });
              setRevealAlert(true);
            }
          }}
        />
      )}
      {times &&
        times.map((item, index) => {
          return (
            <div key={'wrapp_day' + index}>
              {' '}
              {timeshift(item.date)}
              <DayDisplay
                key={'day' + index}
                times={item.appointments}
                dayIndex={index}
                onChoice={async (choice, dayIndex) => {
                  console.log(window.pageYOffset)
                  if (participants > 0 && choice.status == 'green') {
                    console.log(choice, participants);
                    setRevealForm(true);
                    setReservedTime({
                      _id: choice._id,
                      date: times[dayIndex].date.split('T')[0],
                      hour: choice.reservationHour,
                      minutes: choice.reservationMin,
                      price: choice.price,
                      game: props.gameIndex,
                      location: props.locs[location],
                    });
                  } else if (participants === 0) {
                    setAlertStyle({
                      variantHead: 'info',
                      heading: 'Сообщение',
                      text: `Пожалуйста! Введите количество игроков.`,
                      color1: 'success',
                      button1: 'Подтвердить',
                      color2: '',
                      button2: '',
                    });
                    setRevealAlert(true);
                  }
                  else if (choice.status !== 'green') {
                    setAlertStyle({
                      variantHead: 'info',
                      heading: 'Сообщение',
                      text: `Вывранное время уже зарезервировано.`,
                      color1: 'success',
                      button1: 'Согласиться',
                      color2: '',
                      button2: '',
                    });
                    setRevealAlert(true);
                  }
                }}
              />
            </div>
          );
        })}
      <button
        className="w-full bg-green-700"
        onClick={async () => {
          let dt = new Date(lastVisibleDate);
          dt.setDate(dt.getDate() + 2);
          let dt1 = getDateString(dt);
          dt.setDate(dt.getDate() + 9);
          let dt2 = getDateString(dt);
          setLastVisibleDate(dt2);
          try {
            setError('');
            setLoading(true);

            const res2 = await fetch('/api/reservation/getschedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                location: props.locs[parseInt(location)],
                game: props.gameIndex,
                dt1,
                dt2,
              }),
            });
            const data1 = await res2.json();
            setTimes(times.concat(data1));
          } catch {
            setError('Failed to get times');
          }
          setLoading(false);
        }}
      >
        Добавить еще 10 дней
      </button>
    </div>
  );
}

export default RequestForm;
