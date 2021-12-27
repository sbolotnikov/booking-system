import { useEffect, useContext } from 'react';
import RequestForm from '../../components/requestForm';
import AppContext from '../../appContext';
function Game(gameId) {
  const value = useContext(AppContext);
  const gameX = value.games.find((x) => x.id === gameId.id);
  const gameIndex= value.games.findIndex((x) => x.id === gameId.id);
  let locationsX=[];
  for(let i=0;i<gameX.locs.length;i++) locationsX.push(value.locations[gameX.locs[i]])
  useEffect(() => {
    document.getElementById(
      'gameHero'
    ).style.backgroundImage = `url(${gameX.bgImage})`;
  }, []);
  return (
    <div>
      <div
        id="gameHero"
        className="bg-main-bg bg-top  bg-cover md:bg-contain bg-no-repeat bg-fixed "
      >
        <div className="inner-wrap">
          <h2>БРОНИРОВАНИЕ ИГРЫ</h2>
          <h3>{gameX.name}</h3>
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
          <button className="rounded border-[#74b9ff] text-[#74b9ff] border-2 p-2">
            Подарите сертификат
          </button>
        </div>
      </div>
      <div className="containerForm">
        <RequestForm locations={locationsX} gameIndex={gameIndex} locs={gameX.locs} />
      </div>
    </div>
  );
}

export default Game;
export function getServerSideProps(context) {
  return { props: { id: context.query.id } };
}
