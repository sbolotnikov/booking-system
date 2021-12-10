import { useState } from 'react';
function GetPlayersAmount(props) {
  const maxParticipance = 35;
  const rules = [
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
  ];
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const [gameLength, setGameLength] = useState(0);
  const [instructions, setInstructions] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [roomAvailability, setRoomAvailability] = useState(false);
  let arrSkull = Array.from(Array(maxParticipance).keys());

  const handleChoice = (numberClicked) => {
    for (let i = 0; i < maxParticipance; i++) {
      document.getElementById(`skull-img-${i}`).setAttribute('fill', 'black');
    }
    for (let i = 0; i < numberClicked; i++) {
      document.getElementById(`skull-img-${i}`).setAttribute('fill', 'white');
    }
    setNumberOfParticipants(numberClicked);
    let i = 0;
    while (rules[i].maxParticipance < numberClicked) {
      i++;
    }
    setGameLength(rules[i].gameLength);
    setInstructions(rules[i].instructions);
    setRounds(rules[i].additionalRounds);
    setRoomAvailability(rules[i].roomForRestAvailability);
    document.getElementById('btn-max').classList.remove('bg-indigo-900');
  };
  const handleMaxParticipants = (e) => {
    e.preventDefault();
    handleChoice(maxParticipance);
    setNumberOfParticipants(maxParticipance + 1);
    document.getElementById('btn-max').classList.add('bg-indigo-900');
  };
  const handleClick = (e) => {
    e.preventDefault();
    handleChoice(e.target.getAttribute('value'));
  };
  const timeInHHandMM = (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    console.log(
      hours > 0 ? `${hours}час${endingfix(hours, false)}` : '',
      minutes > 0 ? `${minutes} минут` : ''
    );
    let timeX = hours > 0 ? `${hours}час${endingfix(hours, false)}` : '';
    let timeY = minutes > 0 ? `${minutes} минут` : '';
    return timeX + ' ' + timeY;
  };
  const endingfix = (number0, capitalize) => {
    let number = number0 % 10;
    if (number0 > 10 && number0 < 15) return capitalize ? 'ОВ' : 'ов';
    if (capitalize)
      return number > 1 && number <= 4
        ? 'А'
        : number > 4 || number === 0
        ? 'ОВ'
        : '';
    else
      return number > 1 && number <= 4
        ? 'а'
        : number > 4 || number === 0
        ? 'ов'
        : '';
  };
  return (
    <div className="w-full h-1/2 flex flex-col items-center justify-center max-w-md text-white">
      <h3 className="m-5 ">Укажите примерное количество игроков</h3>
      <div className="w-full h-auto flex justify-center  flex-wrap max-w-md">
        {arrSkull.map((item, index) => {
          return (
            <svg
              className="w-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 68.592 67.306"
            >
              <path
                key={`skull-img-${index}`}
                id={`skull-img-${index}`}
                value={index + 1}
                onClick={handleClick}
                d="M69.35,38.555C68.569,17.9,56.939,2.151,32.837,1.992a44.471,44.471,0,0,0-9.046,1.059C13.513,5.58,7.923,10.181,4.067,18.145,1.9,22.612,1.325,27.048.912,32.519.722,35.05.83,37.989.83,37.989a19.237,19.237,0,0,0,.69,5.405A10.215,10.215,0,0,0,2.674,46.4c2.152,3.326,2.152,3.033,4.557,4.981,3.692,2.992,7.379,4.042,5.568,9.654-.659,2.042-.587,5.1,2.508,5.613,2.7.445,3.992-1.79,5.036-4.022,1.375-2.939,1.231-7.414,6.559-6.447,4.884.886,3.164,4.459,3.192,7.359.023,2.512.685,5.284,3.172,5.693,3.394.558,4.321-2.633,5.174-5.27.974-3.007-.783-7.317,4.779-7.94,5.627-.63,6.039,3.639,7.778,6.963,1.074,2.055,2.409,4.531,5.206,3.663,2.692-.835,2.933-3.475,2.236-5.83-1.117-3.775-1.5-6.724,3.427-8.12C69.007,50.678,69.588,44.857,69.35,38.555Zm-49.1,6.767c-3.437-.355-7.435-1.558-6.906-6.171.594-5.184,5.009-5.156,8.936-5.046,2.843.08,5.266.808,6.4,3.129a5.31,5.31,0,0,1-.816,5.709C26.041,45.105,23.218,45.629,20.253,45.322ZM49.9,44.292c-3.228.015-6.822-.4-6.986-4.321-.189-4.546,3.474-5.507,7.277-5.4,2.587.072,4.688.86,5.867,2.834a4.186,4.186,0,0,1-.019,4.329C54.744,43.793,52.464,44.28,49.9,44.292Z"
              />
            </svg>
          );
        })}
      </div>
      <button
        className="w-full m-auto  text-sm border rounded border-gray-700"
        id="btn-max"
        onClick={handleMaxParticipants}
      >
        <h4 className=" flex flex-row justify-center items-center ">
          <svg
            className="h-5 w-auto m-3"
            width="318"
            height="338"
            viewBox="0 0 318 338"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M159 328C241.29 328 308 256.813 308 169C308 81.1867 241.29 10 159 10C76.7096 10 10 81.1867 10 169C10 256.813 76.7096 328 159 328Z"
              stroke="white"
              strokeWidth="20"
            />
            {numberOfParticipants > maxParticipance && (
              <path
                d="M55.6894 193.812C50.3013 189.339 47.5161 183.388 47.3752 177.397C47.2362 171.408 49.7435 165.364 54.9157 160.706C60.0841 156.051 66.9673 153.642 73.8955 153.522C80.8274 153.398 87.8157 155.559 93.2077 160.035L139.759 198.758L232.44 96.9817L235.761 99.1719L232.437 96.972C232.701 96.6749 233.002 96.4216 233.336 96.2154C238.85 92.0867 245.771 90.2229 252.536 90.5411V90.5346L252.866 90.5606C259.67 90.9503 266.317 93.5642 271.224 98.2984C276.216 103.112 278.479 109.226 278.102 115.203H278.109L278.079 115.488C277.636 121.265 274.716 126.91 269.423 131.126L158.196 248.168L158.204 248.174C157.995 248.403 157.761 248.6 157.505 248.772C152.297 252.725 145.72 254.664 139.181 254.566C132.587 254.467 126.006 252.3 120.887 248.046L55.6894 193.812Z"
                fill="white"
              />
            )}
          </svg>
          Больше 35 игроков?
        </h4>
      </button>

      {numberOfParticipants > maxParticipance ? (
        <h4 className="mt-5">
          Больше <strong className="text-lg">{maxParticipance}</strong> игрок
          {endingfix(maxParticipance, false)} в команде
        </h4>
      ) : (
        <h4 className="mt-5">
          <strong className="text-lg">{numberOfParticipants}</strong> игрок
          {endingfix(numberOfParticipants, false)} в команде
        </h4>
      )}
      <h4 className="mb-2">
        Время игры: ~{timeInHHandMM(gameLength)} (+{instructions} мин.
        инструктаж)
      </h4>
      <div className="flex flex-row items-center space-around ">
        {roomAvailability && (
          <span className="bg-indigo-900 p-2 rounded m-1">КОМНАТА ОТДЫХА</span>
        )}
        {rounds > 0 && (
          <span className="bg-indigo-900 p-2 rounded m-1">
            {rounds} ДОП. РАУНД{endingfix(rounds, true)}
          </span>
        )}
      </div>
    </div>
  );
}

export default GetPlayersAmount;
