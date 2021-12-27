import GetPlayersAmount from './getPlayersAmount';
import { useState, useEffect } from 'react';
import GetLocation from './getLocation';
import TimeDisplay from './timeDisplay';
import SendReservationForm from './sendReservationForm';
import DayDisplay from './dayDisplay';
function RequestForm(props) {
  const [participants, setParticipants] = useState(0);
  const [location, setLocation] = useState(-1);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [revealForm, setRevealForm] = useState(false);
  const [reservedTime, setReservedTime] = useState({});
  const [times, setTimes] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    if (location > -1) {
      console.log(times, 'location N', location, 'game-', props.gameIndex);
    }
  }, [location]);

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
  // new Date(item.date).setHours(1)].toLocaleDateString('ru-ru', {weekday: 'long',day: 'numeric', month: 'long',})}
  return (
    <div className="w-full">
      {revealForm && (
        <SendReservationForm
          players={participants}
          time={reservedTime}
          onChange={(e) => {
            setRevealForm(false);
          }}
        />
      )}
      <GetLocation
        loc={location}
        list={props.locations}
        onChange={async (loc) => {
          setLocation(loc);
          try {
            setError('');
            setLoading(true);
            const res = await fetch('/api/reservation/getschedule', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                location: loc,
                game: props.gameIndex,
              }),
            });
            // const res = await fetch('/api/reservation/getrange', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     location: loc,
            //     game: props.gameIndex,
            //     dateStart: '2021-12-22',
            //     dateEnd: '2021-12-23',
            //   }),
            // });
            const data = await res.json();
            console.log(data);
            setTimes(data);
          } catch {
            setError('Failed to get times');
          }
          setLoading(false);
        }}
      />
      <h4
        className="flex flex-row justify-center items-center"
        onClick={() => setVisible(true)}
      >
        <span>{participants + ' x '}</span>
        <svg
          className="h-5 w-5 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 68.592 67.306"
        >
          <path
            fill="white"
            d="M69.35,38.555C68.569,17.9,56.939,2.151,32.837,1.992a44.471,44.471,0,0,0-9.046,1.059C13.513,5.58,7.923,10.181,4.067,18.145,1.9,22.612,1.325,27.048.912,32.519.722,35.05.83,37.989.83,37.989a19.237,19.237,0,0,0,.69,5.405A10.215,10.215,0,0,0,2.674,46.4c2.152,3.326,2.152,3.033,4.557,4.981,3.692,2.992,7.379,4.042,5.568,9.654-.659,2.042-.587,5.1,2.508,5.613,2.7.445,3.992-1.79,5.036-4.022,1.375-2.939,1.231-7.414,6.559-6.447,4.884.886,3.164,4.459,3.192,7.359.023,2.512.685,5.284,3.172,5.693,3.394.558,4.321-2.633,5.174-5.27.974-3.007-.783-7.317,4.779-7.94,5.627-.63,6.039,3.639,7.778,6.963,1.074,2.055,2.409,4.531,5.206,3.663,2.692-.835,2.933-3.475,2.236-5.83-1.117-3.775-1.5-6.724,3.427-8.12C69.007,50.678,69.588,44.857,69.35,38.555Zm-49.1,6.767c-3.437-.355-7.435-1.558-6.906-6.171.594-5.184,5.009-5.156,8.936-5.046,2.843.08,5.266.808,6.4,3.129a5.31,5.31,0,0,1-.816,5.709C26.041,45.105,23.218,45.629,20.253,45.322ZM49.9,44.292c-3.228.015-6.822-.4-6.986-4.321-.189-4.546,3.474-5.507,7.277-5.4,2.587.072,4.688.86,5.867,2.834a4.186,4.186,0,0,1-.019,4.329C54.744,43.793,52.464,44.28,49.9,44.292Z"
          />
        </svg>
      </h4>
      {visible && (
        <GetPlayersAmount
          num={participants}
          onChange={(num) => {
            setParticipants(num);
            setVisible(false);
          }}
        />
      )}
      {times &&
        times.map((item, index) => {
          return (
            <div key={'wrapp_day' + index}>
              {' '}
              {timeshift(item.date)}
              <DayDisplay key={'day' + index} times={item.appointments} />
            </div>
          );
        })}
    </div>
  );
}

export default RequestForm;
