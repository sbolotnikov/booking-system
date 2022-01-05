import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ReservationForm from '../../components/reservationForm';
import AppContext from '../../appContext';

function adm_location(props) {
  const [location, setLocation] = useState(props.id);
  const [reservations, setReservations] = useState([]);
  const [style1, setStyle1] = useState({ display: 'none' });
  const value = useContext(AppContext);
  var locationsArray = value.locations.map((item) => item.name);

  useEffect(async () => {
    // GET request
    const res = await fetch('/api/admin/get_reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
      }),
    });

    let data = await res.json();
    setReservations(data);
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1000px] flex flex-row justify-center items-center flex-wrap">
        <h3 className="w-full xs:text-md sm:text-xl phone:text-2xl tablet:text-3xl text-center">
          Резервации для локации:
          <div
            className="relative cursor-pointer"
            onMouseEnter={(e) => {
              setStyle1({ display: 'block' });
            }}
            onMouseLeave={(e) => {
              setStyle1({ display: 'none' });
            }}          
          >
            {locationsArray[location]}
            <div
              style={style1}
              className="absolute top-8 right-0 z-[1000] w-full flex flex-row justify-center items-center flex-wrap "
            >
              <div className="w-auto rounded-md border bg-[#0C1118]  p-0.5 m-1">
                {locationsArray.map((item, index) => {
                  return (
                    
                      <h3 key={`locations__${index}`} >
                      <Link key={`link__${index}`}
                      href={`/adm_location/[${index}]`} as={`/adm_location/${index}`}
                      
                    ><a>{item}</a>
                    </Link></h3> 
                    
                  );
                })}
              </div>
            </div>
          </div>
        </h3>

        <div>
          {reservations &&
            reservations.map((item, index) => {
              return (
                <ReservationForm
                  key={'reserveN' + index}
                  prevDate={index > 0 ? reservations[index - 1].date : ''}
                  reservation={item}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default adm_location;
export function getServerSideProps(context) {
  return { props: { id: context.query.id } };
}
