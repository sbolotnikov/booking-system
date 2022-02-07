import { useContext } from 'react';
import BookingCard from './bookingCard'
import AppContext from '../appContext';
function Booking() {
    const value = useContext(AppContext);
  var games = value.games;
   games=games.concat(games);
    return (
        <div className="mediaScroller">
        <div className="slideTrack">
        {games.map((item, j) => {
            return (
          <BookingCard key={`package${j}`} id={`package${j}`} item={item}/>  
            )})
        }

        </div>
        </div>
    )
}

export default Booking
