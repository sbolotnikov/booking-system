import { useEffect } from 'react';
function Game(gameId) {
  const games = [
    {
      name: 'ТЕМНОТА',
      id: 'basic',
      bgImage: '/images/basic.jpg',
      discription:
        'Полноценная версия игры со множеством ловушек и бодрящих спецэффектов. Подходит как для тех, кто играет в первый раз, так и для опытных игроков (как для взрослых, так и для детей).<br> Вас ждет многоуровневая игровая локация - более 180 м2, неожиданные тайники, скрытые лазы, шуршащие покрытия, зыбучие переходы, звуковые иллюзии и десятки мест для пряток!',
      prices:
        'Стоимость за одного игрока:<br><b>540 руб.</b> - в будние дни<br><b>650 руб.</b> - в выходные, праздники и ночью<br>Независимо от количества игроков минимальная общая стоимость игры: 2000 руб. - в будние дни / 2600 руб. - в выходные, праздники и ночью.',
      booking:
        'Игра длится 60 минут (+10 минут на инструктаж). Если игроков больше 10, то время игры может быть увеличено за счет дополнительных раундов.',
    },
    {
      name: 'МГЛА',
      id: 'advanced',
      bgImage: '/images/advanced.jpg',
      discription:
        'Вас ждет многоуровневая игровая локация - более 180 м2, неожиданные тайники, скрытые лазы, шуршащие покрытия, зыбучие переходы, звуковые иллюзии и десятки мест для пряток!<br>Говорят, здесь можно встретить морфов и Хранителя Темноты. Только для самых смелых!',
      prices:
        'Стоимость за одного игрока:<br><b>650 руб.</b> - в будние дни.<br><b>800 руб.</b> - в выходные, праздники и ночью.<br>Независимо от количества игроков минимальная общая стоимость игры: 2600 руб. - в будние дни / 3200 руб. - в выходные, праздники и ночью.',
      booking:
        'Игра длится 60 минут (+10 минут на инструктаж). Если игроков больше 10, то время игры может быть увеличено за счет дополнительных раундов.',
    },
  ];
  const gameX = games.find((x) => x.id === gameId.id);
  useEffect(() => {
    //      gameX =  games.find((x) => x.id === gameId.id);
    //     console.log(gameX)
    document.getElementById(
      'gameHero'
    ).style.backgroundImage = `url(${gameX.bgImage})`;
  }, []);
  return (
    <div className="">
      <div
        id="gameHero"
        className="bg-[#0c1118] bg-top  bg-cover md:bg-contain bg-no-repeat bg-fixed "
      > 
   
        <div className="inner-wrap">
          <h2>БРОНИРОВАНИЕ ИГРЫ</h2>
          <h2>{gameX.name}</h2>
        </div>
      </div>
      <div className="containerDescription">
         <div className="">
        <h3 className="font-bold mt-5 mb-2">Описание</h3>
        <p className="" dangerouslySetInnerHTML={{__html: gameX.discription}}></p>
        </div>
        <div className="">
        <h3 className="font-bold mt-5 mb-2">Стоимость</h3>
        <p className=""dangerouslySetInnerHTML={{__html: gameX.prices}}></p>
        </div>
        <div className="">
        <h3 className="font-bold mt-5 mb-2"> Бронирование</h3>
        <p className=""dangerouslySetInnerHTML={{__html: gameX.booking}}></p>
        </div>
        <div className="">
        <h3 className="font-bold mt-5 mb-2"> Хотите сделать подарок?</h3>
        <button className="rounded border-[#74b9ff] text-[#74b9ff] border-2 p-2">Подарите сертификат</button>
        </div>
      </div>
    </div>
  );
}

export default Game;
export function getServerSideProps(context) {
  return { props: { id: context.query.id } };
}
