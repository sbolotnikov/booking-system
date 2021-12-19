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
            className="m-1 "
            value={index}
            onClick={handleLocation}
          >
            <div
              key={`inner-loc-${index}`}
              className="grid xs:grid-cols-1  sm:grid-cols-4 phone:grid-cols-4  rounded-r  h-full border-2 border-gray-700 max-w-xs bg-popup p-2"
              value={index}
            >
              <div
                key={`text-loc-${index}`}
                className="xs:col-span-1 sm:col-span-3 phone:col-span-3 text-left whitespace-normal"
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
                className="col-span-1 h-9 m-auto"
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
