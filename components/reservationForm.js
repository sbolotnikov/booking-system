import AlertMenu from './alertMenu';
import AppContext from '../appContext';
import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
function ReservationForm({ prevDate, reservation, onClose }) {
  const { data: session, loadings } = useSession();
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  // const [selectedId, setSelectedId] = useState('');
  const value = useContext(AppContext);
  var games = value.games.map((item) => item.name);
  const onReturn = async (decision1, inputValue) => {
    setRevealAlert(false);
    if (decision1 == 'Да') {
      const res = await fetch('/api/admin/confirm_reservation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedId: reservation._id,
          changeRecord: {
            note: 'Подтверждение от клиента:ДА',
            adminID: session.user.name,
            dateChange: new Date(Date.now()),
          },
        }),
      });
      window.location.reload(false);
    }
    if (decision1 == 'Подтвердить') {
      const res = await fetch('/api/admin/delete_reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedId: reservation._id,
          location: reservation.location,
          game: reservation.game,
        }),
      });
      window.location.reload(false);
    }
    if (decision1 == 'Добавить') {
      console.log(inputValue);
      const res = await fetch('/api/admin/add_note_to_reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedId: reservation._id,
          addNote: {
            note: inputValue,
            adminID: session.user.name,
            dateChange: new Date(Date.now()),
          },
        }),
      });

      window.location.reload(false);
    }
  };
  const addConfirmation = (e) => {
    setAlertStyle({
      variantHead: 'info',
      heading: 'Сообщение',
      text: `Подтвердить резервацию сегодняшним числом?`,
      color1: 'success',
      button1: 'Да',
      color2: 'secondary',
      button2: 'Нет',
    });
    setRevealAlert(true);
  };
  const handleDelete = (e) => {
    setAlertStyle({
      variantHead: 'danger',
      heading: 'Предупреждение',
      text: `Вы точно хотите удалить резервацию?`,
      color1: 'danger',
      button1: 'Подтвердить',
      color2: 'secondary',
      button2: 'Отмена',
    });
    setRevealAlert(true);
  };
  const handleAddNote = (e) => {
    setAlertStyle({
      variantHead: 'info',
      heading: 'Сообщение',
      text: `Введите дополнительную информацию`,
      inputField: 'true',
      inputValue: '',
      color1: 'success',
      button1: 'Добавить',
      color2: 'secondary',
      button2: 'Отмена',
    });
    setRevealAlert(true);
  };
  const el = document.querySelector('#mainPage');
  const [button1Color, setbutton1Color] = useState('');
  const [button2Color, setbutton2Color] = useState('');
  function StopScroll() {
    // prevent scrolling
    var x = 0;
    var y = el.scrollTop;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }
  function AllowScroll() {
    // when done release scroll
    window.onscroll = function () {};
  }
  useEffect(() => {
    StopScroll();

    // get_admin
  }, []);
  let styleName =
    reservation.reservationConfirmDate == null
      ? 'm-1 text-3xl text-extrabold text-red-500'
      : 'm-1';
  return (
    <div>
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      <div
        className="w-[100vw] h-[100vh] absolute flex justify-center items-center bg-slate-500/70 left-0 top-0 z-[1000] backdrop-blur-md"
        style={{ top: el.scrollTop }}
      >
        <div className="m-auto  max-w-[600px] bg-gray-700 border-2 border-solid border-gray-400 rounded-md w-[97%] p-2 flex flex-col content-evenly">
          <button
            className="relative w-full"
            onClick={() => {
              onClose(true);
            }}
          >
            <div className="absolute  -top-5 -right-5  p-2  bg-black rounded-full  flex justify-center  items-center">
              <img className="h-2" src={'/icons/close.svg'} alt="menu close" />
            </div>
          </button>

          {reservation.date !== prevDate && (
            <h3 className="m-1 text-3xl text-extrabold text-red-500 w-full flex justify-between items-center">
              {new Date(
                `${reservation.date.split('T')[0]}T${
                  reservation.reservationHour
                }:${reservation.reservationMin < 10 ? '0' : ''}${
                  reservation.reservationMin
                }:00`
              ).toLocaleDateString('ru-ru', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              <div className="ml-1 text-xl text-extrabold text-blue-500">
                Время:
                {`${reservation.reservationHour}:${
                  reservation.reservationMin < 10 ? '0' : ''
                }${reservation.reservationMin}`}
              </div>
            </h3>
          )}
          <div className="w-full flex flex-row justify-between items-center">
            <div className="mr-1 overflow-hidden">
              Игра:{games[reservation.game]}
            </div>
            <button
              className=" p-2 h-4 bg-red-600 rounded-full  flex justify-center  items-center"
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
          <div className="w-full flex flex-row justify-between flex-wrap items-center">
            <span className={styleName}>Имя:{reservation.name}</span>
            <span className={styleName}>Тел.:{reservation.phone}</span>
            <span className="m-1">Емейл: {reservation.email}</span>
            <span className="m-1">Админ: {reservation.adminName}</span>
          </div>
          <h4 className="w-full flex flex-row justify-start  items-start">
            Доп.сообщение:
            <textarea
              className="m-2 w-full rounded-md border border-gray-500 bg-main-bg"
              readOnly
              defaultValue={reservation.message}
            />
          </h4>
          <div className="w-full flex flex-row justify-between items-center">
            <h4>Для служебного использования:</h4>
            <button
              className=" p-2 h-4 bg-blue-500 rounded-full flex justify-center  items-center"
              onClick={handleAddNote}
            >
              Добавить
            </button>
          </div>
          <div className="w-full h-[10vh] overflow-y-scroll rounded-md border border-gray-500">
            {reservation.specialNote.map((item, index) => (
              <div className="w-full" key={`note${index}`}>
                <div
                  className="w-full flex justify-between items-start"
                  key={`block${index}`}
                >
                  <div className="text-red-400" key={`notedate${index}`}>
                    {new Date(item.dateChange).toLocaleDateString('ru-ru', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {new Date(item.dateChange).toLocaleTimeString('ru-ru', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="text-blue-400" key={`noteadmin${index}`}>
                    {item.adminID}
                  </div>
                </div>
                <textarea
                  className=" m-auto w-[97%] rounded-md border border-gray-500 bg-main-bg"
                  readOnly
                  defaultValue={item.note}
                  key={`noteNote${index}`}
                />
              </div>
            ))}
          </div>
          <h4 className="w-full flex flex-row justify-start flex-wrap items-center">
            <span className="m-1">Емейл: {reservation.email}</span>
            <span className="m-1">Игроков: {reservation.participants}чел.</span>
            <span className="m-1">Код резервации: {reservation._id}</span>
            {reservation.reservationConfirmDate == null ? (
              <button
                className="bg-red-700 p-1  rounded-md"
                onClick={addConfirmation}
              >
                Подтвердите резервацию
              </button>
            ) : (
              <span>
                Подтверждено{' '}
                {new Date(
                  reservation.reservationConfirmDate
                ).toLocaleDateString('ru-ru', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            )}
          </h4>
          <h4 className="w-full flex flex-row justify-start flex-wrap items-center">
            Изменения в резервации
          </h4>
          <div className="w-full h-[20vh] overflow-y-scroll rounded-md border border-gray-500">
            {reservation.changesToRequest.map((item, index) => (
              <div className="w-full flex-row" key={`reserve${index}`}>
                <div
                  className="w-full flex justify-between items-start"
                  key={`block2${index}`}
                >
                  <div className="text-red-400" key={`reservedate${index}`}>
                    {new Date(item.dateChange).toLocaleDateString('ru-ru', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {new Date(item.dateChange).toLocaleTimeString('ru-ru', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="text-blue-400" key={`noteadmin${index}`}>
                    {item.adminID}
                  </div>
                </div>
                <textarea
                  className=" m-auto w-[97%] rounded-md border border-gray-500 bg-main-bg"
                  readOnly
                  defaultValue={item.note}
                  key={`reserveNote${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
