import { useState , useEffect} from 'react';
function EditTimePriceForm(props) {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [price, setPrice] = useState(0);
  const [perPerson, setPerPerson] = useState(false);
  useEffect( () => {
    setHours(props.info.item.reservationHour);
    setMinutes(props.info.item.reservationMin);
    setPrice(props.info.item.price);
    setPerPerson(props.info.item.perPerson);
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
              appt: { reservationHour: h, reservationMin: minutes, price: price, status:"green", perPerson:perPerson},
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
              appt: { reservationHour: hours, reservationMin: m, price: price,status:"green" , perPerson:perPerson},
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
              status:"green", 
              perPerson:perPerson
            },
            i: props.info.i,
          };
          props.onEnter(appt);
          setPrice(parseInt(e.target.value));
        }}
        value={price}
      />
      <button
        className=" text-xs "
        onClick={(e) => {
          e.preventDefault();
          let choice =!perPerson
          let appt = {
            appt: {
              reservationHour: hours,
              reservationMin: minutes,
              price: price,
              status:"green", 
              perPerson:choice
            },
            i: props.info.i,
          };
          props.onEnter(appt);
          setPerPerson(choice);
        }}
      >
        <h4 className=" flex flex-row justify-center items-center ">
          <svg
            className="h-3 w-auto"
            width="318"
            height="338"
            viewBox="0 0 318 338"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M159 328C241.29 328 308 256.813 308 169C308 81.1867 241.29 10 159 10C76.7096 10 10 81.1867 10 169C10 256.813 76.7096 328 159 328Z"
              stroke="white"
              strokeWidth="20"
            />
            {perPerson && (
              <path
                d="M55.6894 193.812C50.3013 189.339 47.5161 183.388 47.3752 177.397C47.2362 171.408 49.7435 165.364 54.9157 160.706C60.0841 156.051 66.9673 153.642 73.8955 153.522C80.8274 153.398 87.8157 155.559 93.2077 160.035L139.759 198.758L232.44 96.9817L235.761 99.1719L232.437 96.972C232.701 96.6749 233.002 96.4216 233.336 96.2154C238.85 92.0867 245.771 90.2229 252.536 90.5411V90.5346L252.866 90.5606C259.67 90.9503 266.317 93.5642 271.224 98.2984C276.216 103.112 278.479 109.226 278.102 115.203H278.109L278.079 115.488C277.636 121.265 274.716 126.91 269.423 131.126L158.196 248.168L158.204 248.174C157.995 248.403 157.761 248.6 157.505 248.772C152.297 252.725 145.72 254.664 139.181 254.566C132.587 254.467 126.006 252.3 120.887 248.046L55.6894 193.812Z"
                fill="white"
              />
            )}
          </svg>
          per person
        </h4>
      </button>
    </div>
  );
}

export default EditTimePriceForm;
