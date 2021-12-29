function ReservationForm({reservation}) {
    console.log(reservation.reservationConfirmDate==null)
    return (
        <div className="f-full flex flex-row flex-wrap">
        <span className="m-1">Дата:{reservation.date.split('T')[0]}</span>
        <span className="m-1">Время:{`${reservation.reservationHour}:${reservation.reservationMin < 10 ? '0' : ''}${reservation.reservationMin}`}</span>
        <span className="m-1">Имя:{reservation.name}</span>
        <span className="m-1">Тел.:{reservation.phone}</span>
        <span className="m-1">Емейл{reservation.email}</span>
        <span className="m-1">Игроков:{reservation.participants}</span> 
        <span className="m-1">Доп.сообщение:{reservation.message}</span>
        <span className="m-1">Код резервации{reservation._id}</span>
        {(reservation.reservationConfirmDate==null) ?<button id={reservation._id} className="bg-red-700 rounded-md">Подтвердите резервацию</button>:<span>Подтверждено {reservation.reservationConfirmDate}</span>}
        <button id={reservation._id} className="bg-red-700 rounded-md">Удалить резервацию</button>
        </div>
    )
}

export default ReservationForm
