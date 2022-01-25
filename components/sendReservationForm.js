import { useState, useEffect, useContext } from 'react';
import AppContext from '../appContext';
import AlertMenu from './alertMenu';
import Loading from './Loading';
import { useSession } from "next-auth/react";

function SendReservationForm(props) {
  const {data:session, loadings} = useSession();
  useEffect(() => {
    if (session) {
    if (session.user.name &&(session.user.name.length>0)){
      document.getElementById("userName").value=session.user.name
    }
    if (session.user.email &&(session.user.email.length>0)){
      document.getElementById("userEmail").value=session.user.email
    }
    if (session.user.phone &&(session.user.phone.length>0)){
      document.getElementById("userPhone").value=session.user.phone
    }
  }
}, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const value = useContext(AppContext);
  const mainEmail = value.mainEmail;
  const monthDay = monthDayText(props.time.date.split('T')[0]);
  const topElement = document.querySelector('#mainPage');
  function monthDayText(a) {
    const months = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];
    let m = parseInt(a.slice(-5, -3));
    let d = a.slice(-2);
    return `${d} ${months[m - 1]}`;
  }
  const onReturn = (decision1) => {
    //
    setName('');
    setEmail('');
    setMessage('');
    setPhone('');
    props.onChange(true);
    setRevealAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (parseInt(phone) < 1000000000 || parseInt(phone) > 9999999999) {
      setError('Номер телефона неверен');
      setLoading(false);
      return;
    }
    let html_message = `
    <h2 style="width: 100%;text-align:center">
    <strong>Время проведения: ${monthDay} -${' '}
     ${`${props.time.hour}:${props.time.minutes < 10 ? '0' : ''}${
       props.time.minutes
     }`}</strong>
   </h2>
   <h3 style="width: 100%;text-align:center">
   Адрес:${' '}<span> ${value.locations[props.time.location].address}</span>
 </h3>
 <h3 style="width:100%;text-align:left"><strong>Игра:</strong> ${
   value.games[props.time.game].name
 }.</h3>
 <h3 style="width:100%"><strong>Количество игроков:</strong>${
   props.players + 'ч.'
 }</h3>
 <h3 style="width:100%"><strong>Стоимость игры — ${
   props.time.price
 } руб.</strong> за участника. Если игроков меньше ***-ти, то стоимость игры для всей команды составляет **** руб.</h3>
 <h3 style="width:100%"><strong>Специальные пожелания:</strong>${message}</h3>
 `;
    let reg_message = `Время проведения: ${monthDay} -${' '} ${`${
      props.time.hour
    }:${props.time.minutes < 10 ? '0' : ''}${props.time.minutes}`}\n
Адрес:${value.locations[props.time.location].address},\n
Вы выбрали игру ${value.games[props.time.game].name}.\n
Количество игроков:${props.players + 'ч.'}\n
Стоимость игры — ${
      props.time.price
    } руб. за участника. Если игроков меньше ***-ти, то \n
 стоимость игры для всей команды составляет **** руб.\n\n
Специальные пожелания:\n ${message}
 `;
    let data_mail = {
      name,
      email,
      phone,
      html_message,
      reg_message,
      mainEmail,
    };
    let data = {
      name,
      email,
      phone,
      message,
      participants: props.players,
      game: props.time.game,
      location: props.time.location,
      date: props.time.date,
      reservationHour: props.time.hour,
      reservationMin: props.time.minutes,
      schedule_id: props.time._id,
    };
    // Create new reservation Request
    const res = await fetch('/api/reservation/grab', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const confirm_code = await res.json();
    // Updating busy status on Schedule
    const res1 = await fetch('/api/reservation/make_busy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: props.time.date,
        schedule_id: props.time._id,
        game: props.time.game,
        location: props.time.location,
      }),
    });

    data_mail.html_message =
      `
      <h2 style="width: 100%;text-align:left; color:red">
      <strong>Код подтверждения: ${confirm_code.code} </strong>
     </h2>` + data_mail.html_message;
    data_mail.reg_message =
      `
      Код подтверждения: ${confirm_code.code}\n` + data_mail.reg_message;
    // sending 2 emails client and admin
    fetch('/api/request_time', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_mail),
    }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setAlertStyle({
          variantHead: 'info',
          heading: 'Сообщение',
          text: data_mail.html_message,
          color1: 'success',
          button1: 'Согласиться',
          color2: '',
          button2: '',
        });
        setRevealAlert(true);
      }
    });
  };
  return (
    <div
      className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center z-[600] items-center"
      style={{ top: topElement.scrollTop }}
    >
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      {loading && <Loading />}
      <form
        className="w-[85%]  max-w-[700px]  bg-black rounded-md flex flex-col justify-between  items-center p-4"
        style={{ boxShadow: '0 0 150px rgb(100 100 255 / 80%)' }}
        onSubmit={handleSubmit}
      >
        <button
          className="relative w-full"
          onClick={() => {
            props.onChange(true);
          }}
        >
          <div className="absolute  -top-7 -right-7  p-2  bg-black rounded-full  flex justify-center  items-center">
            <img className="h-2" src={'/icons/close.svg'} alt="menu close" />
          </div>
        </button>
        <div className="w-full">
          <h2 className="w-full text-center font-extrabold">
            <span className="xs:hidden">Время проведения:</span> {monthDay} -{' '}
            {`${props.time.hour}:${props.time.minutes < 10 ? '0' : ''}${
              props.time.minutes
            }`}
          </h2>
          <h3 className=" text-gray-400">
            Адрес:{' '}
            <span
              className="xs:text-xs"
              dangerouslySetInnerHTML={{
                __html: value.locations[props.time.location].address_short,
              }}
            />
          </h3>
          <h3 className="w-full text-gray-400">
            {' '}
            <span className="xs:hidden">Вы выбрали игру</span>{' '}
            {value.games[props.time.game].name}.{' '}
            <span className="xs:hidden">Количество игроков:</span>
            {props.players}
            {'ч.'}
          </h3>
          <h3 className="w-full text-gray-400 text-xs">
            Стоимость игры —{' '}
            <span className="text-white font-extrabold">
              {props.time.price} руб.
            </span>{' '}
            за участника. Если игроков меньше ***-ти, то стоимость игры для всей
            команды составляет **** руб.
          </h3>
        </div>
        <h3 className="w-full text-gray-400">
          <span className="xs:hidden">Пожалуйста, укажите ваши</span> контактные
          данные:
        </h3>
        <input
          id="userName"
          className="w-full rounded mb-1 bg-[#0C1118]"
          type="text"
          placeholder="Ваше имя"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          
          value={name}
          minLength="3"
        />
        <div className="text-red-700 font-extrabold xs:text-xs">{error}</div>
        <input
          id="userPhone"
          className="w-full rounded mb-1 bg-[#0C1118]"
          type="tel"
          placeholder="Телефон"
          required
          minLength={13}
          maxLength={13}
          onChange={(e) => {
            setError('');
            setPhone(e.target.value.slice(3));
          }}
          value={'+7 ' + phone}
        />
        <input
          id="userEmail"
          className="w-full rounded mb-1 bg-[#0C1118]"
          type="email"
          placeholder="E-mail"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <textarea
          className="w-full rounded mb-1 bg-[#0C1118]"
          placeholder="Комментарий или пожелания, если есть"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          minLength="5"
          rows={4}
        />
        <button
          type="submit"
          className="w-full rounded bg-indigo-900 p-2 flex justify-center items-center content-around"
        >
          <span> Забронировать</span>
          <img
            className="ml-1 w-5 h-5"
            src={'/icons/booking.svg'}
            alt="booking"
          />
        </button>
      </form>
    </div>
  );
        
}

export default SendReservationForm;
