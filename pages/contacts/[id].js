import GetLocation from '../../components/getLocation';
import { useState, useContext } from 'react';
import AppContext from '../../appContext';

function contacts(props) {
  const [location, setLocation] = useState(props.id);
  const value = useContext(AppContext);
  let locations = value.locations;
  return (
    <div>
      <h1 className="text-center p-10 text-extrabold">Где находится?</h1>
      <div className="containerContacts">
        <div>
          <GetLocation
            loc={location}
            list={locations}
            onChange={(loc) => {
              setLocation(loc);
            }}
          />
          <h2 className="hideOnSmall text-left mt-8 pt-8 border-t-2 border-gray-700">
          Организатор в Челябинске:<br/><br/>ИП Плешанова Ксения Павловна<br/>ОГРНИП: 316745600214898<br/>ИНН: 745309853230
          </h2>
        </div>
        <div className="borderleft pl-6 ">
          <h2 className="text-extrabold">{locations[location].name}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: locations[location].address }}
          ></p>
          <p><span className="text-red-600 text-lg font-black">&#128222;</span>{locations[location].telephone}</p>
          <p><span className="text-red-600 text-xl font-black mr-2">@</span>{locations[location].email}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: locations[location].address_desc,
            }}
          ></p>
        </div>
      </div>
      <div className="rounded w-full font-SourceSansPro bg-popup max-w-[1170px] my-3 mx-auto p-1">
      <span>&#9888;</span> Локации работают только по предварительной записи, если вы хотите посетить нас просто, чтобы осмотреться, пожалуйста, позвоните предварительно по телефону +7 (351) 220-75-49. Будем рады вас видеть!
      </div>
      <p className="text-center rounded w-full aspect-[1/1] bg-popup max-w-[1170px] my-3 mx-auto p-1">
          yandex maps
      </p>
    </div>
  );
}

export default contacts;
export function getServerSideProps(context) {
    return { props: { id: context.query.id } };
  }