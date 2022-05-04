import { useEffect, useState, useContext } from 'react';
import RequestForm from '../../components/requestForm';
import AppContext from '../../appContext';
function Game(gameId) {
  const value = useContext(AppContext);
  const [style1, setStyle1] = useState({ display: 'none' });
  const [displayTime, setDisplayTime]= useState("00:00");
  var gamesArray = value.games.map((item) => [item.name, item.id]);
  const gameX = value.games.find((x) => x.id === gameId.id);
  const gameIndex = value.games.findIndex((x) => x.id === gameId.id);
  let locationsX = [];
  for (let i = 0; i < gameX.locs.length; i++)
    locationsX.push(value.locations[gameX.locs[i]]);
    function timerDraw() {
      // starting the , counting down seconds, and handling run-out-of-time exit 
       
      let seconds = value.timeBeforeRefresh[2];
      let minutes = value.timeBeforeRefresh[1];
      let hours = value.timeBeforeRefresh[0];
      let secondsLeft = hours * 3600 + minutes * 60 + seconds;
      if ((seconds !== 0) || (minutes !== 0) || (hours !== 0)) {
          let timerInterval = setInterval(function () {
              secondsLeft--;
              if (seconds === 0) {
                  seconds = 59;
              }
              else seconds--;
              if (seconds === 59) {
                  if (minutes === 0) {
                      minutes = 59;
                      hours--;
                  } else minutes--;
              }
              setDisplayTime(stringTime(hours, minutes, seconds));
              if ((secondsLeft === 0)) {
                  clearInterval(timerInterval);
                  window.location.reload(false);
              }

          }, 1000);
      }
  };
  function stringTime(h, m, s) {
      // turning time to string to display
      if (h>0) return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
      else if (m>0) return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
      else return `${s < 10 ? '0' + s : s}`
     
  }
  useEffect(() => {
    document.getElementById(
      'gameHero'
    ).style.backgroundImage = `url(${gameX.bgImage})`;
    timerDraw();
  }, []);
  return (
    <div>
        
      <div className='m-auto fixed top-12 right-5  bg-red-700 border-2 border-solid border-gray-400 rounded-md  flex flex-col content-evenly'>
      Перезагрузка через {displayTime} 
      </div>

      <div
        id="gameHero"
        className="bg-main-bg bg-top  bg-contain bg-no-repeat bg-fixed "
      >
        <div className="inner-wrap flex flex-col">
          <h2>БРОНИРОВАНИЕ ИГРЫ</h2>
          <h3
            className="relative cursor-pointer w-[85%] m-auto leading-4"
            onMouseEnter={(e) => {
              setStyle1({ display: 'flex', });
            }}

          >
            {gameX.name}
            <div className="absolute top-12 right-0 w-full flex flex-col justify-start z-[1000] items-center " style={style1} >

                <div className="w-[95%] max-w-[1170px]  rounded-md border bg-[#0C1118]   overflow-hidden m-1"  onMouseLeave={(e) => {
              setStyle1({ display: 'none' }); 
            }}>
                  {gamesArray.map((item, index) => {
                    return (
                      <h3 key={`games__${index}`} className="leading-4 py-5 hover:text-white hover:bg-purple-300 active:text-white active:bg-purple-400   focus:outline-none focus:ring focus:ring-purple-300">
                        <a key={`link__${index}`} href={`/game/${item[1]}`} >
                          {item[0]}
                        </a>
                      </h3>
                    );
                  })}
                </div> 
            </div>
            </h3>
        </div>
      </div>
      <div className="containerDescription">
        <div className="">
          <h3 className="font-bold mt-5 mb-2">Описание</h3>
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: gameX.description }}
          ></p>
        </div>
        <div className="">
          <h3 className="font-bold mt-5 mb-2">Стоимость</h3>
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: gameX.prices }}
          ></p>
        </div>
        <div className="">
          <h3 className="font-bold mt-5 mb-2"> Бронирование</h3>
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: gameX.booking }}
          ></p>
        </div>
        <div className="hideOnSmall">
          <h3 className="font-bold mt-5 mb-2"> Хотите сделать подарок?</h3>
          <button className="btnBlue">
            Подарите сертификат
          </button>
        </div>
      </div>
      <div className="containerForm">
        <RequestForm
          locations={locationsX}
          gameIndex={gameIndex}
          locs={gameX.locs}
        />
      </div>
    </div>
  );
}

export default Game;
export function getServerSideProps(context) {
  return { props: { id: context.query.id } };
}
