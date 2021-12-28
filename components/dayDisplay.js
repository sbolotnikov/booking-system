import TimeDisplay from './timeDisplay';

function DayDisplay(props) {
  return (
    <div className="flex flex-row justify-center items-center flex-wrap">
      {props.times &&
        props.times.map((item, index) => {
          return (
            <button
              key={'btn' + index}
              id={index+"_timeIndex"}
              onClick={(e) => {
                let choice =props.times[parseInt(e.currentTarget.id)]
                props.onChoice(choice, props.dayIndex);
              }}
            >
              <TimeDisplay
                key={'time' + index}
                
                price={item.price}
                time={`${item.reservationHour}:${
                  item.reservationMin < 10 ? '0' : ''
                }${item.reservationMin}`}
                timeStatus={item.status}
              />
            </button>
          );
        })}
    </div>
  );
}

export default DayDisplay;
