import { useState, useEffect, useContext } from 'react';
import BookingCard from './BookingCard'
import AppContext from '../appContext';
function Booking() {
    const value = useContext(AppContext);
  const games = value.games;
    return (
        <div className="flex flex-row w-full overflow-x-scroll">
        {games.map((item, j) => {
            return (
          <BookingCard key={`package${j}`} id={`package${j}`} item={item}/>  
            )})
        }
        </div>
    )
}

export default Booking
