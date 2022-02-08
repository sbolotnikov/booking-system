import { useState, useEffect, useContext } from 'react';
import AppContext from '../appContext';
function GetPlayersAmount(props) {
  const maxParticipants = props.maxP;
  const value = useContext(AppContext);
  let rules = value.rules;
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const [gameLength, setGameLength] = useState(0);
  const [instructions, setInstructions] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [roomAvailability, setRoomAvailability] = useState(false);
  let arrSkull = Array.from(Array(maxParticipants).keys());
  useEffect(() => {
    handleChoice(props.num);
  }, []);
  const handleChoice = (numberClicked) => {
    for (let i = 0; i < maxParticipants; i++) {
      document.getElementById(`skull-img-${i}`).style.filter= 'invert(0.75)';
    }
    for (let i = 0; i < numberClicked; i++) {
      document.getElementById(`skull-img-${i}`).style.filter= '';
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
    document.getElementById('btn-max').classList.remove('bg-[#7D8800]');
  };
  const handleMaxParticipants = (e) => {
    e.preventDefault();
    handleChoice(maxParticipants);
    setNumberOfParticipants(maxParticipants + 1);
    document.getElementById('btn-max').classList.add('bg-[#7D8800]');
  };
  const handleClick = (e) => {
    e.preventDefault();
    handleChoice(e.target.getAttribute('value'));
  };
  const timeInHHandMM = (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
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
    <div className="w-full flex flex-col rounded-lg items-center justify-center max-w-md text-white bg-popup/80 p-5">
      <h3 className="m-5 ">Укажите примерное количество игроков</h3>
      <h4 className="m-5 ">От {props.minP} до {props.maxP} игроков</h4>
      <div className="w-full h-auto flex justify-center  flex-wrap max-w-md">
        {arrSkull.map((item, index) => {
          return (
            <img
              src={props.svgLink}
              className="w-8 cursor-pointer"
              key={`skull-img-${index}`}
                id={`skull-img-${index}`}
                value={index + 1}
                onClick={handleClick}/>
            
          );
        })}
      </div>
      <button
        className="w-full m-3  text-sm border rounded border-gray-700"
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
            {numberOfParticipants > maxParticipants && (
              <path
                d="M55.6894 193.812C50.3013 189.339 47.5161 183.388 47.3752 177.397C47.2362 171.408 49.7435 165.364 54.9157 160.706C60.0841 156.051 66.9673 153.642 73.8955 153.522C80.8274 153.398 87.8157 155.559 93.2077 160.035L139.759 198.758L232.44 96.9817L235.761 99.1719L232.437 96.972C232.701 96.6749 233.002 96.4216 233.336 96.2154C238.85 92.0867 245.771 90.2229 252.536 90.5411V90.5346L252.866 90.5606C259.67 90.9503 266.317 93.5642 271.224 98.2984C276.216 103.112 278.479 109.226 278.102 115.203H278.109L278.079 115.488C277.636 121.265 274.716 126.91 269.423 131.126L158.196 248.168L158.204 248.174C157.995 248.403 157.761 248.6 157.505 248.772C152.297 252.725 145.72 254.664 139.181 254.566C132.587 254.467 126.006 252.3 120.887 248.046L55.6894 193.812Z"
                fill="white"
              />
            )}
          </svg>
          Больше {maxParticipants} игроков?
        </h4>
      </button>

      {numberOfParticipants > maxParticipants ? (
        <h4 className="mt-5">
          Больше <strong className="text-lg">{maxParticipants}</strong> игрок
          {endingfix(maxParticipants, false)} в команде
        </h4>
      ) : (
        <h4 className="mt-5">
          <strong className="text-lg">{numberOfParticipants}</strong> игрок
          {endingfix(numberOfParticipants, false)} в команде
        </h4>
      )}
      {/* <h4 className="mb-2">
        Время игры: ~{timeInHHandMM(gameLength)} (+{instructions} мин.
        инструктаж)
      </h4> */}
      {/* <div className="flex flex-row items-center space-around ">
        {roomAvailability && (
          <span className="bg-indigo-900 p-2 rounded m-1">КОМНАТА ОТДЫХА</span>
        )}
        {rounds > 0 && (
          <span className="bg-indigo-900 p-2 rounded m-1">
            {rounds} ДОП. РАУНД{endingfix(rounds, true)}
          </span>
        )}
      </div> */}
      <button
        className="btnBlue"
        id="btn-max"
        onClick={(e)=>{e.preventDefault(); props.onChange(numberOfParticipants)}}
      >Выбрать</button>
    </div>
  );
}

export default GetPlayersAmount;
