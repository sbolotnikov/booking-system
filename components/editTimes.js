import { useRef, useState } from 'react';
function EditTimes(props) {
  const locationRef = useRef();
  const gameRef = useRef();
  const reservationTimeRef = useRef();
  const priceRef = useRef();
  const [locations, setLocations] = useState(getArray(0));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  function getArray(n){
    let locArray=props.games[n].locs;
    let locs=[];
    for (let i=0; i<locArray.length; i++){
      locs.push({name:props.locations[locArray[i]].name, value:locArray[i]})
    }
    return locs;    
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const res = await fetch('/api/reservation/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: locationRef.current.value,
          game: gameRef.current.value,
          reservationTime: new Date(reservationTimeRef.current.value),
          price: priceRef.current.value,
        }),
      });
      //Await for data for any desirable next steps
      const data = await res.json();
      console.log(data);
      
    } catch {
      setError('Failed to create new time reservation');
    }

    setLoading(false);
  }
  const changeLocations=(e)=>{
    e.preventDefault();
    setLocations(getArray(e.target.value));
  }
  return (
    <form
      className="flex flex-col items-center p-3  bottom-0"
      onSubmit={handleSubmit}
    >
      {error && (
        <label className="text-center text-red-600 italic">{error}</label>
      )}
      <label>Игра </label>

      <select 
        className="flex-1 outline-none border-none rounded-sm bg-[#0C1118]  p-0.5 mx-1"
        id="game"
        ref={gameRef}
        required 
        onChange={changeLocations}>
      {props.games.map((item, index) => {
        return (
            <option value={index} key={`game__${index}`}>{item.name}</option>
        )
        })}     
      </select>
      <label>Локации </label>
     <select 
        className="flex-1 outline-none border-none rounded-sm bg-[#0C1118]  p-0.5 mx-1"
        id="location"
        ref={locationRef}
        required>
      {locations.map((item, index) => {
        return (
            <option value={item.value} key={`locations__${index}`}>{item.name}</option>
        )
        })}     
      </select> 
      <label>Время </label>
      <input
        className="flex-1 outline-none border-none rounded-sm bg-[#0C1118]  p-0.5 mx-1"
        id="reservationTime"
        type="datetime-local"
        ref={reservationTimeRef}
        required
      />
      <label>Цена </label>
      <input
        className="flex-1 outline-none border-none rounded-sm bg-[#0C1118]  p-0.5 mx-1"
        id="price"
        type="number"
        placeholder="1.0"
        step="0.01"
        ref={priceRef}
        required
      />

      <button
        className="w-full button border-t border-gray-100 border-solid"
        disabled={loading}
        type="submit"
      >
        Добавить время
      </button>
    </form>
  );
}

export default EditTimes;
