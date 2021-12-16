import { useEffect } from 'react';
function GetLocation(props) {
  const locationsList = props.list;
  useEffect(() => {
    if (props.loc > -1) {
      document
        .getElementById('loc-' + props.loc)
        .classList.add('border-l-4');
      document
        .getElementById('loc-' + props.loc)
        .classList.add('border-l-blue-400');
      document.getElementById('loc-' + props.loc).classList.add('rounded');
    }
  }, []);
  const handleLocation = (e) => {
    e.preventDefault();
    let num = e.target.getAttribute('value');
    let choice = 'loc-' + num;
    if (num != props.loc) {
      document.getElementById(choice).classList.add('border-l-4');
      document.getElementById(choice).classList.add('border-l-blue-400');
      document.getElementById(choice).classList.add('rounded');
      if (props.loc > -1) {
        document
          .getElementById('loc-' + props.loc)
          .classList.remove('border-l-4');
        document
          .getElementById('loc-' + props.loc)
          .classList.remove('border-l-blue-400');
        document.getElementById('loc-' + props.loc).classList.remove('rounded');
      }
      props.onChange(num);
    }
  };
  return (
    <div id="locationContainer" className="flex w-full flex-wrap">
      {locationsList.map((item, index) => {
        return (
          <button
            key={`top-loc-${index}`}
            id={`loc-${index}`}
            className="m-1 min-w-[20rem] "
            value={index}
            onClick={handleLocation}
          >
            <div
              key={`inner-loc-${index}`}
              className="grid grid-cols-5 rounded-r w-full h-full border-2 border-gray-700 max-w-xs bg-popup p-5"
              value={index}
            >
              <div
                key={`text-loc-${index}`}
                className="col-span-4 text-left"
                value={index}
              >
                <h4
                  key={`heading-loc-${index}`}
                  className="font-extrabold mb-3"
                  value={index}
                >
                  {item.name}
                </h4>
                <p
                  key={`descr-loc-${index}`}
                  className="font-light"
                  value={index}
                >
                  {item.description}
                </p>
              </div>
              <img
                key={`img-loc-${index}`}
                src={item.symbol}
                alt=""
                className="col-span-1 w-8 m-auto"
                value={index}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default GetLocation;
