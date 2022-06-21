import { useContext } from 'react';
import BookingCard from './bookingCard'
import AppContext from '../appContext';
function Booking() {
    const value = useContext(AppContext);
  var games = value.games.sort((a, b) => a.name.localeCompare(b.name));
   games=games.concat(games);
    return (
        <div className="mediaScroller">
        <div className="slideTrack">
        {games.map((item, j) => {
            return (
          <BookingCard key={`package${j}`} id={`package${j}`} item={item} onVisible={e=>{ e==0?document.querySelector(".slideTrack").classList.add('pauseAnim'):document.querySelector(".slideTrack").classList.remove('pauseAnim');}}/>  
            )})
        }

        </div>
        </div>
    )
}

export default Booking
