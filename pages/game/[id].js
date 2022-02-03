import { useEffect, useState, useContext } from 'react';
import RequestForm from '../../components/requestForm';
import AppContext from '../../appContext';
function Game(gameId) {
  const value = useContext(AppContext);
  const [style1, setStyle1] = useState({ display: 'none' });
  var gamesArray = value.games.map((item) => [item.name, item.id]);
  const gameX = value.games.find((x) => x.id === gameId.id);
  const gameIndex = value.games.findIndex((x) => x.id === gameId.id);
  let locationsX = [];
  for (let i = 0; i < gameX.locs.length; i++)
    locationsX.push(value.locations[gameX.locs[i]]);
  useEffect(() => {
    document.getElementById(
      'gameHero'
    ).style.backgroundImage = `url(${gameX.bgImage})`;
  }, []);
  return (
    <div>
      <div
        id="gameHero"
        className="bg-main-bg bg-top  bg-contain bg-no-repeat bg-fixed "
      >
        <div className="inner-wrap">
          <h2>БРОНИРОВАНИЕ ИГРЫ</h2>
          <h3
            className="relative cursor-pointer"
            onMouseEnter={(e) => {
              setStyle1({ display: 'flex' });
            }}

          >
            {gameX.name}
            <div className="absolute top-12 -left-3 h-[100vh] w-[100vw] flex flex-col justify-start z-[1000] items-center" style={style1} >

                <div className="w-[95%] max-w-[1170px]  rounded-md border bg-[#0C1118]  p-0.5 m-1"  onMouseLeave={(e) => {
              setStyle1({ display: 'none' }); 
            }}>
                  {gamesArray.map((item, index) => {
                    return (
                      <h3 key={`games__${index}`}>
                        <a key={`link__${index}`} href={`/game/${item[1]}`}>
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
