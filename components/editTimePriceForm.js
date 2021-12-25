import { useState , useEffect} from 'react';
function EditTimePriceForm(props) {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect( () => {
    setHours(props.info.item.reservationHour);
    setMinutes(props.info.item.reservationMin);
    setPrice(props.info.item.price);
}, [props.info]); 
// Refreshing children state from parent React state
// With functional components: An easy way to refresh the children internal state when props provided by parent change is through useEffect():
  return (
    <div
      className="w-20 m-2 bg-[#0C1118] rounded-md flex flex-col justify-between  items-center"
      style={{ boxShadow: '0 0 150px rgb(100 100 255 / 80%)' }}
    >
      <button
        className="relative w-full"
        onClick={(e) => {
            e.preventDefault();

          props.onDel({n:props.info.i})
        }}
      >
        <div className="absolute  -top-3 -right-3  p-2  bg-[#0C1118] rounded-full  flex justify-center  items-center">
          <img className="h-2" src={'/icons/close.svg'} alt="menu close" />
        </div>
      </button>
      <h3 className="w-full my-1 flex justify-between  items-center ">
        <input
          className=" rounded w-[40%] text-right bg-[#0C1118]"
          type="Number"
          min="0"
          max="23"
          step="1"
          length="2"
          required
          placeholder="час"
          onChange={(e) => {
            e.preventDefault();
            let h = parseInt(e.target.value > 23 ? 23 : e.target.value);
            let appt = {
              appt: { reservationHour: h, reservationMin: minutes, price: price},
              i: props.info.i,
            };
            props.onEnter(appt);
            setHours(h);
          }}
          value={hours}
        />
        <span>:</span>
        <input
          className=" rounded w-[40%] text-left bg-[#0C1118]"
          type="Number"
          placeholder="минуты"
          step="1"
          length="2"
          required
          onChange={(e) => {
            e.preventDefault();
            let m = parseInt(e.target.value > 59 ? 59: e.target.value);
            let appt = {
              appt: { reservationHour: hours, reservationMin: m, price: price },
              i: props.info.i,
            };
            props.onEnter(appt);
            setMinutes(m);
          }}
          value={minutes}
        />
      </h3>
      <input
        className="w-full rounded text-center bg-[#0C1118]"
        type="Number"
        placeholder="цена"
        min="0"
        step="0.01"
        required
        onChange={(e) => {
          e.preventDefault();
          let appt = {
            appt: {
              reservationHour: hours,
              reservationMin: minutes,
              price: parseFloat(e.target.value),
            },
            i: props.info.i,
          };
          props.onEnter(appt);
          setPrice(parseInt(e.target.value));
        }}
        value={price}
      />
    </div>
  );
}

export default EditTimePriceForm;
