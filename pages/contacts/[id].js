import GetLocation from '../../components/getLocation';
import { useState, useContext } from 'react';
import AppContext from '../../appContext';
import { YMaps, Map, GeoObject } from 'react-yandex-maps';

function contacts(props) {
  const [location, setLocation] = useState(props.id);
  const value = useContext(AppContext);
  let locations = value.locations;
  return (
    <div>
      <h1 className="text-center p-6 font-extrabold">Где находится?</h1>
      <h2 className=" font-extrabold m-4 text-center text-5xl" style={{ fontFamily: 'Lumberjack'}}>
        {locations[location].name}
      </h2>
      <div className="containerContacts">
        <div className="flex flex-col justify-center items-center">
          <div className="m-auto mt-2">
            <YMaps>
              <Map
                state={{
                  center: [
                    locations[location].coordinates.x,
                    locations[location].coordinates.y,
                  ],
                  zoom: locations[location].coordinates.zoom,
                }}
                style={{
                  overflow: 'hidden',
                  borderRadius: '0.5rem',
                  width: '325px',
                  height: '300px',
                }}
              >
                <GeoObject
                  // The geometry description.
                  geometry={{
                    type: 'Point',
                    coordinates: [
                      locations[location].coordinates.x,
                      locations[location].coordinates.y,
                    ],
                  }}
                  // Properties.
                  properties={{
                    // The placemark content.
                    iconContent: locations[location].name,
                    hintContent: '',
                  }}
                  // Options.
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: '/icons/logoBlack.svg',
                    iconImageSize: [60, 84],
                    iconImageOffset: [-26, -44],
                    // The placemark's icon will stretch to fit its contents.
                    // preset: 'islands#blackStretchyIcon',
                    // The placemark can be moved.
                    draggable: false,
                  }}
                />
                <GeoObject
                  // The geometry description.
                  geometry={{
                    type: 'Point',
                    coordinates: [
                      locations[location].coordinates1.x,
                      locations[location].coordinates1.y,
                    ],
                  }}
                  // Properties.
                  properties={{
                    // The placemark content.
                    iconContent: locations[location].coordinates1.text,
                    hintContent: '',
                  }}
                  // Options.
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: '/icons/svg/arrow.svg',
                    iconImageSize: [60, 84],
                    // The placemark can be moved.
                    draggable: false,
                  }}
                />
              </Map>
            </YMaps>
          </div>

          <h2 className="hideOnSmall text-left mt-8 pt-8 border-t-2 border-gray-700">
            Организатор в Челябинске:
            <br />
            <br />
            ИП Бондаренко Николай Владимирович
            <br />
            ИНН: 744842796410
          </h2>
        </div>
        <div className="borderleft">
        <div className="rounded bg-popup/60 p-3 m-2">
          <p
            className="m-4"
            dangerouslySetInnerHTML={{ __html: locations[location].address }}
          ></p>
          <p>
            <span className="text-white text-lg font-black flex flex-row">
              <img
                className="object-fill w-5 mr-2"
                src={'/icons/call.svg'}
                alt="menu call"
              />
              {locations[location].telephone}
            </span>
          </p>
          <p>
            <span className="text-white text-xl font-black mr-2">@</span>
            {locations[location].email}
          </p>
          <p
            className="m-4"
            dangerouslySetInnerHTML={{
              __html: locations[location].address_desc,
            }}
          ></p>
          </div>
        </div>
      </div>
      <div className="rounded w-full font-SourceSansPro bg-popup/60 max-w-[1170px] my-3 mx-auto p-1">
        <span>&#9888;</span> Локации работают только по предварительной записи,
        если вы хотите посетить нас просто, чтобы осмотреться, пожалуйста,
        позвоните предварительно по телефону +7 (951) 258-30-00. Будем рады вас
        видеть!
      </div>
    </div>
  );
}

export default contacts;
export function getServerSideProps(context) {
  return { props: { id: context.query.id } };
}
