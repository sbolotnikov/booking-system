
export const Day = ({ day, onClick }) => {
  const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'bg-[#e8f4fa]' : ''}`;
  const classNameDay = `${day.isCurrentDay ? 'text-red-800 font-extrabold' : ''}`;
  return (
    <div onClick={onClick} className={className}
    style={{  width: '13%',  height: '100px',
  cursor: 'pointer',  boxSizing: 'border-box',backgroundColor:'bg-[#0C1118]',
  margin: '.6429%',boxShadow: '0px 0px 3px #CBD4C2',display: 'flex',flexDirection: 'column',
  flexWrap: 'wrap', overflow: 'hidden',justifyContent: 'left'}}
    >
      <span className={classNameDay}>{day.value === 'padding' ? '' : day.value}</span>
      {day.event && <div className="text-xs" style={{backgroundColor: day.event.color}}>{day.event.title}</div>}
    </div>
  );
};