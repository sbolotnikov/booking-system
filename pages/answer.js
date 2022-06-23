import React from 'react'
import AccordionFAQ from '../components/accordionFAQ';

function answer() {
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
            'От 500 рублей за игрока. Стоимость зависит от дня недели, времени игры и экшен-пакета. Чтобы узнать стоимость, нажмите здесь, после выберите экшен-пакет и время игры.',
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
   <div className="flex justify-center items-center flex-col">
             <h1 className="pt-8 font-bold mb-3 mx-auto text-5xl text-center">
        {'Часто задаваемые вопросы'}
      </h1>
      <AccordionFAQ options={options} />
   </div>   
   
  )
}

export default answer