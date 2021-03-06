import Card from './card';
import { useState } from 'react';
import AccordionFAQ from './accordionFAQ';
import Booking from './booking';
import Slider from './slider';
import LocationGallery from './locationGallery';


function AboutComponent() {
  const listArrayLeft = [
    {
      imgLink: '/icons/eight.svg',
      name: 'Двухуровневый лабиринт 300 кв м',
      desc: 'Густая темнота, смесь лабиринтов и страха на огромных площадях',
    },
    {
      imgLink: '/icons/key.svg',
      name: 'Квесты с оригинальными механизмами',
      desc: 'Захватывающие и необычные квесты для искателей новых впечатлений',
    },
    {
      imgLink: '/icons/projector.svg',
      name: 'Интерактивная комната',
      desc: 'Вся стена – как огромный живой планшет',
    },    

  ];
  const listArrayRight = [
    {
      imgLink: '/icons/banquette.svg',
      name: 'Банкетные комнаты',
      desc: 'Доступны кулер с водой,стаканчики, чай, сахар, микроволновка',
    },
    {
      imgLink: '/icons/cake.svg',
      name: 'Дни рождения под ключ',
      desc: 'Оформление интерьера, программа, игры, меню',
    },
    {
      imgLink: '/icons/shkaff.svg',
      name: 'Дополнительные услуги',
      desc: 'Анимация, шоу-программы, мастер-классы',
    },
    {
      imgLink: '/icons/water_cooler.svg',
      name: 'Удобства',
      desc: 'В комплексе свой гардероб и уборная',
    },

  ];
  const listArrayRunes = [
    {
      imgLink: '/icons/rune_1.svg',
      name: 'Буря эмоций и впечатлений',
      desc: 'Игра длится 60 минут',
    },
    {
      imgLink: '/icons/rune_2.svg',
      name: 'Для больших и маленьких компаний',
      desc: 'Могут играть от 2 до 35 человек',
    },
    {
      imgLink: '/icons/rune_3.svg',
      name: 'Без нудных заданий и головоломок',
      desc: 'Игра, укрепляющая команды',
    },
  ];
  const listArraySteps = [
    {
      imgLink: '/icons/rune1.svg',
      name: '',
      desc: 'Первыми в игру попадают горожане, у них есть время, чтобы освоиться и найти место, чтобы спрятаться. Горожане не могут разговаривать, но могут общаться постукиваниями и другими механическими звуками',
    },
    {
      imgLink: '/icons/rune2.svg',
      name: '',
      desc: 'Через некоторое время в игру заходят призраки. Призраки также не могут разговаривать, но способны издавать звуки, о которых могут договориться до начала игры',
    },
    {
      imgLink: '/icons/rune3.svg',
      name: '',
      desc: 'Когда призрак поймал горожанина, призрак должен назвать его по имени. Если призрак отгадал имя, горожанин считается «убитым», иначе горожанин может убежать и спрятаться заново',
    },
  ];
  const listArrayVictory = [
    {
      imgLink: '/icons/rune1_1.svg',
      name: '',
      desc: 'Призраки побеждают, если они смогли поймать всех горожан. Горожане побеждают, если в течение раунда (30 минут - раунд, всего в игре - 2 раунда) остался непойманным хотя бы один горожанин',
    },
    {
      imgLink: '/icons/rune2_1.svg',
      name: '',
      desc: 'Горожане могут воскрешать «убитых» участников с помощью «Руны Воскрешения», спрятанной в игре. Для этого уцелевший горожанин должен отвести «убитого» участника к руне',
    },
    {
      imgLink: '/icons/rune3_1.svg',
      name: '',
      desc: 'Призраки могут помешать воскрешению «убитых» горожан, найдя руну первыми и устроив засаду',
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
        'Улица Молодогвардейцев, 7, Челябинск <em><a href="/contacts/0">(см. карту)</a></em>',
    },
    {
      question: 'Сколько это стоит?',
      answer:
        'От 500 рублей за игрока. Стоимость зависит от дня недели, времени игры и экшен-пакета. Чтобы узнать стоимость, нажмите <em><a href="/certificate/#price">здесь</a></em>, после выберите экшен-пакет и время игры.',
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
        Крупнейший центр квестов и пряток на Южном Урале
      </h1>
      <div className="flex flex-col tablet:flex-row w-full my-3">
        <div className="w-full m-auto bg-popup/80">
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
                  desc: ['phone:text-left', 'tablet:text-right','text-gray-400'],
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
        <div className="w-full m-auto bg-popup/80">
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
                  desc: ['text-left', 'text-gray-400'],
                }}
              />
            );
          })}
        </div>
      </div>
      <LocationGallery location={0} />
      <div className="m-7">
        <Booking />
      </div>
      {/* <AccordionFAQ options={options} /> */}
      <Slider />
    </div>
  );
}

export default AboutComponent;
