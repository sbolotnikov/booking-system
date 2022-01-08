let dataObject = {
    mainEmail:'serge.bolotnikov@gmail.com',
    games : [
        {
          name: 'ТЕМНОТА',
          id: 'basic',
          bgImage: '/images/basic.jpg',
          img:'/icons/temnota.svg',
          short:'Полноценная игра с ловушками и бодрящими спецэффектами. Оптимальное сочетание страха и веселья.',
          toWhom:'Подходит как для взрослых, так и для детей.',
          price:540,
          description:
            'Полноценная версия игры со множеством ловушек и бодрящих спецэффектов. Подходит как для тех, кто играет в первый раз, так и для опытных игроков (как для взрослых, так и для детей).<br> Вас ждет многоуровневая игровая локация - более 180 м2, неожиданные тайники, скрытые лазы, шуршащие покрытия, зыбучие переходы, звуковые иллюзии и десятки мест для пряток!',
          prices:
            'Стоимость за одного игрока:<br><b>540 руб.</b> - в будние дни<br><b>650 руб.</b> - в выходные, праздники и ночью<br>Независимо от количества игроков минимальная общая стоимость игры: 2000 руб. - в будние дни / 2600 руб. - в выходные, праздники и ночью.',
          booking:
            'Игра длится 60 минут (+10 минут на инструктаж). Если игроков больше 10, то время игры может быть увеличено за счет дополнительных раундов.',
          locs: [0,1,2],
        },
        {
          name: 'МГЛА',
          id: 'advanced',
          bgImage: '/images/advanced.jpg',
          img:'/icons/mgla.svg',
          short:'Игра, в которой можно встретить самого хранителя темноты. Больше впечатлений, но играть сложнее.',
          toWhom:'Только для самых смелых!',
          price:650,
          description:
            'Вас ждет многоуровневая игровая локация - более 180 м2, неожиданные тайники, скрытые лазы, шуршащие покрытия, зыбучие переходы, звуковые иллюзии и десятки мест для пряток!<br>Говорят, здесь можно встретить морфов и Хранителя Темноты. Только для самых смелых!',
          prices:
            'Стоимость за одного игрока:<br><b>650 руб.</b> - в будние дни.<br><b>800 руб.</b> - в выходные, праздники и ночью.<br>Независимо от количества игроков минимальная общая стоимость игры: 2600 руб. - в будние дни / 3200 руб. - в выходные, праздники и ночью.',
          booking:
            'Игра длится 60 минут (+10 минут на инструктаж). Если игроков больше 10, то время игры может быть увеличено за счет дополнительных раундов.',
          locs: [1,2],
        },
      ],
      locations: [
        {
          name: 'Прятки на Ленина 24',
          description: 'Старый скрипучий дом с множеством комнат.',
          symbol: '/icons/lenina.svg',
          address: "г. Челябинск,<br> пр-т Ленина, д. 24",
          address_short: "пр-т Ленина, д. 24",
          telephone: "+7 (351) 220-75-49",
          email: "chel@strashnotemno.ru",
          address_desc:"Игра находится в центре города на улице Ленина 24, недалеко от ТЦ Горки и парка Терешковой.<br><br> На двери - табличка «Прятки в темноте».",
          coordinates:{x:55.161487,y:61.436528,zoom:16.73}
        },
        {
          name: 'Прятки на Тепличной 21',
          description: 'Древний город-лабиринт, уходящий глубоко под землю.',
          symbol: '/icons/teplichnaya.svg',
          address: "г. Челябинск,<br> ул. Тепличная 21",
          address_short: "ул. Тепличная 21",
          telephone: "+7 (351) 220-75-49",
          email: "chel@strashnotemno.ru",
          address_desc:"Игра расположена в начале северо-запада, в районе обувной фабрики, на улице Тепличной 21, в 50 м от проспекта Победы. Ближайшая остановка трамвая «ул. Тепличная».<br><br>На двери - табличка «Прятки в темноте».",
          coordinates:{x:55.184659,y:61.367294,zoom:16.73}
        },
        {
            name: 'Таинственный переулок',
            description: 'это объединение двух бывших франчайзи "выХод" и QuestQuest.',
            symbol: '/icons/teplichnaya.svg',
            address: "г. Челябинск,<br> улица Молодогвардейцев, 7",
            address_short:"улица Молодогвардейцев, 7, Челябинск",
            telephone: "+7 (951) 258-30-00",
            email: "chel@strashnotemno.ru",
            address_desc:"Home sweet home.<br><br>На двери - табличка «Прятки в темноте».",
            coordinates:{x:55.2038,y:61.3264,zoom:15.73}
        },
      ], 
      rules :[
        {
          maxParticipance: 10,
          gameLength: 60,
          instructions: 10,
          additionalRounds: 0,
          roomForRestAvailability: false,
        },
        {
          maxParticipance: 15,
          gameLength: 90,
          instructions: 10,
          additionalRounds: 1,
          roomForRestAvailability: false,
        },
        {
          maxParticipance: 20,
          gameLength: 120,
          instructions: 20,
          additionalRounds: 2,
          roomForRestAvailability: true,
        },
        {
          maxParticipance: 25,
          gameLength: 150,
          instructions: 20,
          additionalRounds: 3,
          roomForRestAvailability: true,
        },
        {
          maxParticipance: 30,
          gameLength: 160,
          instructions: 20,
          additionalRounds: 4,
          roomForRestAvailability: true,
        },
        {
          maxParticipance: 35,
          gameLength: 160,
          instructions: 20,
          additionalRounds: 5,
          roomForRestAvailability: true,
        },
      ],
  };
  
  export default dataObject;