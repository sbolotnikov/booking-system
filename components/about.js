import Card from './card';
import { useState } from 'react';
import AccordionFAQ from './accordionFAQ';
import Booking from './booking';
import Slider from './Slider';

function AboutComponent() {
  const listArrayLeft = [
    {
      imgLink: '/icons/lamp.svg',
      name: 'Вездесущая темнота',
      desc: 'Густая темнота, собранная из подвалов заброшенных скрипучих домов.',
    },
    {
      imgLink: '/icons/shkaff.svg',
      name: 'Десятки мест',
      desc: 'Чтобы надежно спрятаться от всех, кто попробует вас найти.',
    },
    {
      imgLink: '/icons/basket.svg',
      name: 'Тайные комнаты',
      desc: 'Комнаты, вход в которые уже давно потерян.',
    },
  ];
  const listArrayRight = [
    {
      imgLink: '/icons/ulitka.svg',
      name: 'Множество ловушек',
      desc: 'Звуковые и световые ловушки, которые работают против вас.',
    },
    {
      imgLink: '/icons/hat.svg',
      name: 'Необычные предметы',
      desc: 'Темнота скрывает вещи, которые не так просты, как кажутся.',
    },
    {
      imgLink: '/icons/eight.svg',
      name: 'Бесконечный лабиринт',
      desc: 'Спрятавшись, не забывайте, что нужно вернуться обратно.',
    },
  ];
  const listArrayRunes = [
    {
      imgLink: '/icons/rune_1.svg',
      name: 'Буря эмоций и впечатлений',
      desc: 'Игра длится около 60 минут.',
    },
    {
      imgLink: '/icons/rune_2.svg',
      name: 'Для больших и маленьких компаний',
      desc: 'Могут играть от 2 до 35 человек.',
    },
    {
      imgLink: '/icons/rune_3.svg',
      name: 'Без нудных заданий и головоломок',
      desc: 'Игра, укрепляющая команды.',
    },
  ];
  const listArraySteps = [
    {
      imgLink: '/icons/rune1.svg',
      name: '',
      desc: 'Первыми в игру попадают горожане, у них есть время, чтобы освоиться и найти место, чтобы спрятаться. Горожане не могут разговаривать, но могут общаться постукиваниями и другими механическими звуками.',
    },
    {
      imgLink: '/icons/rune2.svg',
      name: '',
      desc: 'Через некоторое время в игру заходят призраки. Призраки также не могут разговаривать, но способны издавать звуки, о которых могут договориться до начала игры.',
    },
    {
      imgLink: '/icons/rune3.svg',
      name: '',
      desc: 'Когда призрак поймал горожанина, призрак должен назвать его по имени. Если призрак отгадал имя, горожанин считается «убитым», иначе горожанин может убежать и спрятаться заново.',
    },
  ];
  const listArrayVictory = [
    {
      imgLink: '/icons/rune1_1.svg',
      name: '',
      desc: 'Призраки побеждают, если они смогли поймать всех горожан. Горожане побеждают, если в течение раунда (30 минут - раунд, всего в игре - 2 раунда) остался непойманным хотя бы один горожанин.',
    },
    {
      imgLink: '/icons/rune2_1.svg',
      name: '',
      desc: 'Горожане могут воскрешать «убитых» участников с помощью «Руны Воскрешения», спрятанной в игре. Для этого уцелевший горожанин должен отвести «убитого» участника к руне.',
    },
    {
      imgLink: '/icons/rune3_1.svg',
      name: '',
      desc: 'Призраки могут помешать воскрешению «убитых» горожан, найдя руну первыми и устроив засаду.',
    },
  ];
  const [switchArray, setSwitchArray] = useState(listArraySteps);
  const [visibleDetails, setVisibleDetails] = useState(false);
  var options = [
    {
      question: 'Это безопасно?',
      answer:
        'Да, игра абсолютно безопасна. В локации нет травмирующих предметов. Кроме того, перед началом игры вам выдадут специальное снаряжение.',
    },
    {
      question: 'Могут ли играть дети?',
      answer:
        'Конечно, кроме взрослых, у нас с удовольствием играют дети и отмечают дни рождения. Узнайте больше о том, как проходят «Прятки» для детей:<br> <button class="btnBlue"><a href="/kids">Подробнее 🠢</a></button>',
    },
    {
      question: 'В какой одежде приходить?',
      answer:
        'Приходите в любой удобной одежде, которая вам нравится. В игре нет пачкающих предметов.',
    },
    {
      question: 'Где находится игра?',
      answer:
        'В Челябинске несколько адресов:- пр-т Ленина, д. 24 <em><a href="/contacts/0">(см. карту)</a></em>- ул. Тепличная 21 <em><a href="/contacts/1">(см. карту)</a></em> При бронировании вы можете выбрать наиболее удобную локацию.',
    },
    {
      question: 'Сколько это стоит?',
      answer:
        'От 540 рублей за игрока. Стоимость зависит от дня недели, времени игры и экшен-пакета. Чтобы узнать стоимость, нажмите здесь, после выберите экшен-пакет и время игры.',
    },
    {
      question: 'А это страшно? :)',
      answer:
        'Все зависит только от вас . Темнота умеет подстраиваться под игроков. <b>Если приходят взрослые</b>, то она конечно не упускает возможность пощекотать игрокам нервишки! <b>Если приходят дети</b>, то лабиринт становится чуть более дружелюбным. В любом случае, скучать вам не придется, лабиринт полон сюрпризов .',
    },
    {
      question: 'С нами будут играть другие команды?',
      answer:
        'На время, которое вы забронируете, игровая локация будет в распоряжении вашей команды. Других команд в локации не будет.',
    },
    {
      question: 'Сколько игроков может быть в команде?',
      answer:
        'В вашей команде может быть от 2 до 35 человек. Размер команды практически не влияет на качество игры, но чем больше, тем веселее. ;)',
    },
    {
      question: 'Как проходит игра, какие правила?',
      answer:
        'Перед началом игры проводится инструктаж, выдается защитное снаряжение (шлемы и очки), между игроками распределяются роли и начинается игра. Правила игры подробно расскажет ведущий во время инструктажа. Также вы можете ознакомиться с ними самостоятельно чуть выше на этой странице.',
    },
  ];

  return (
    <div className="max-w-[1170px] w-full font-['SourceSansPro'] mx-auto mt-10">
      <h1 className="text-center  p-10 text-2xl font-extrabold">
        {' '}
        Более 300 м<sup>2</sup> темноты, ловушки и десятки мест, где можно
        спрятаться
      </h1>
      <div className="flex flex-col tablet:flex-row w-full">
        <div className="w-full m-auto">
          {listArrayLeft.map((item, index) => {
            return (
              <Card
                item={item}
                key={`leftSide${index}`}
                id={`leftSide${index}`}
                classesCSS={{
                  card: [],
                  text: [],
                  image: ['w-12', 'h-12', 'm-5', 'tablet:order-1'],
                  name: [
                    'font-extrabold',
                    'uppercase',
                    'phone:text-left',
                    'tablet:text-right',
                  ],
                  desc: ['phone:text-left', 'tablet:text-right'],
                }}
              />
            );
          })}
        </div>
        <img
          src="/images/hall.png"
          alt="Прятки в темноте"
          className="lazyloaded m-auto hidden  max-w-[390px] phone:order-first phone:block tablet:block tablet:order-none"
        />
        <div className="w-full m-auto">
          {listArrayRight.map((item, index) => {
            return (
              <Card
                item={item}
                key={`rightSide${index}`}
                id={`rightSide${index}`}
                classesCSS={{
                  card: [],
                  text: [],
                  image: ['w-12', 'h-12', 'm-5'],
                  name: ['font-extrabold', 'uppercase', 'text-left'],
                  desc: ['text-left'],
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-between  bg-no-repeat bg-contain bg-left-bottom min-h-[100vh] bg-[#0C1118] laptop:bg-auto laptop:bg-aboutBG">
        <div className="hidden laptop:block laptop:w-[400px]"></div>
        <div className="my-auto">
          <h1 className="text-center text-2xl pt-10 font-extrabold">
            Абсолютно новый формат <br className=" hidden laptop:block" />{' '}
            развлечений в Челябинске{' '}
          </h1>

          <h3 className="text-center p-2 text-gray-400 ">
            Передвигаясь в темноте, вам придется положиться на свою интуицию.
          </h3>
          <div className="flex tablet:flex-row flex-col w-full justify-around">
            {listArrayRunes.map((item, index) => {
              return (
                <Card
                  item={item}
                  key={`runes${index}`}
                  id={`runes${index}`}
                  classesCSS={{
                    card: [
                      'items-start',
                      'justify-start',
                      'tablet:flex-col',
                      'tablet:justify-center',
                      'm-2',
                    ],
                    text: ['text-left', 'tablet:text-center'],
                    image: [
                      'w-12',
                      'h-12',
                      'tablet:w-20',
                      'tablet:h-20',
                      'tablet:mx-auto',
                      'm-5',
                    ],
                    name: ['font-extrabold', 'uppercase'],
                    desc: [],
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col tablet:flex-row w-full">
        <div className="w-full m-auto">
          <h1 className="text-center text-2xl pt-10 font-extrabold">
            Экшен-игра в реальности
          </h1>
          <h3 className="text-center p-2 text-gray-400 ">
            Участники игры делятся на две команды:{' '}
            <span className="font-extrabold">Призраки</span> и{' '}
            <span className="font-extrabold">Горожане</span>. В течение 60 минут
            горожане должны надежно спрятаться, а призраки должны поймать всех
            горожан.
          </h3>
          {!visibleDetails && (
            <button
              className="btnBlue"
              onClick={(e) => {
                setVisibleDetails(true);
              }}
            >
              Подробнее{' '}
            </button>
          )}
          {visibleDetails && (
            <div>
              <div className="flex flex-col phone:flex-row">
                <button
                  id="gameBtn"
                  className="m-3 border-2 border-blue-400 rounded phone:mr-0 phone:rounded-l-md p-2 text-gray-400 bg-gray-900 focus:text-white focus:bg-gray-800  "
                  onClick={(e) => {
                    setSwitchArray(listArraySteps);
                    document
                      .getElementById('gameBtn')
                      .classList.add('border-2', 'border-blue-400');
                    document
                      .getElementById('victoryBtn')
                      .classList.remove('border-2', 'border-blue-400');
                  }}
                >
                  Ход игры
                </button>
                <button
                  id="victoryBtn"
                  className="m-3 rounded phone:ml-0 phone:rounded-r-md p-2 text-gray-400 bg-gray-900  focus:text-white  focus:bg-gray-800  "
                  onClick={(e) => {
                    setSwitchArray(listArrayVictory);
                    document
                      .getElementById('victoryBtn')
                      .classList.add('border-2', 'border-blue-400');
                    document
                      .getElementById('gameBtn')
                      .classList.remove('border-2', 'border-blue-400');
                  }}
                >
                  Условия победы
                </button>
              </div>
              {switchArray.map((item, index) => {
                return (
                  <Card
                    item={item}
                    key={`game${index}`}
                    id={`game${index}`}
                    classesCSS={{
                      card: [],
                      text: [],
                      image: ['w-12', 'h-12', 'm-5'],

                      desc: ['text-left'],
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
        <img
          src="/images/rules.png"
          alt="Прятки в темноте"
          className="lazyloaded m-auto hidden  w-[50%] phone:order-first phone:block tablet:block tablet:order-none"
        />
      </div>
      <div className="m-7">
        <Booking />
      </div>
        <Slider />
      <AccordionFAQ options={options} />
    </div>
  );
}

export default AboutComponent;
