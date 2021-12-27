import TimeDisplay from './timeDisplay';

function DayDisplay(props) {
  return (
    <div className="flex flex-row justify-center items-center flex-wrap">
      {props.times &&
        props.times.map((item, index) => {
          return (
            <button
              key={'btn' + index}
              onClick={(e) => {
                let item = props.times.find(
                  (x) => x._id === e.currentTarget.id
                );
                console.log(item);
                // if (participants > 0 && item.timeStatus == 'green')
                //   setRevealForm(true);
                // setReservedTime(item);
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
