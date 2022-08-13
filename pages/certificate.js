import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useContext} from 'react';
import AppContext from '../appContext';
function certificate() {
  const viewer = useRef(null);
  const value = useContext(AppContext);
  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/lib',
          initialDoc: '/docs/pricelist2106.pdf',
        },
        viewer.current
      ).then((instance) => {
        const { docViewer } = instance;
        // you can now call WebViewer APIs here...
      });
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start  py-2  ">
      <main className="grid max-w-[1368px] w-full phone:grid-cols-2">
      <div className="flex flex-col ml-10  w-[85%] items-start justify-start ">
      <h2 className="pt-8  font-bold w-full text-center text-3xl">
            ПОДАРОЧНЫЙ СЕРТИФИКАТ<br/>ОТ 2500 ₽<br/>
          <Link href={`tel:${value.locations[0].telephone}`}><button className="btnBlue">Позвонить</button></Link>
          </h2>
          <div className="relative h-[50vh] w-full m-3">
            <Image
              src={`/images/certificates.jpg`}
              alt={`certificates`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h4 className=" mb-4 w-full font-semibold text-left text-xl">
            Всегда в наличии подарочные сертификаты:
            <ol className="text-left font-normal">
              <li type="1">
                Квест на компанию до 4х человек, номинал 2500/3000
              </li>
              <li type="1">
                Прятки во тьме на компанию до 10 человек, номинал 5500/6500
              </li>
              <li type="1">
                Прятки "Среди нас" на компанию до 10 человек, номинал 5500/6500
              </li>
            </ol>
            Возможны другие номиналы сертификата по индивидуальному запросу.
          </h4>
          <hr className="w-1/2 rounded border-2 bg-white m-auto border-solid border-white mb-3" />
          <p className="my-4 ">
            <dl className="font-semibold">Оплата сертификатов</dl>
             <dt>Наличными, безналичный расчет</dt>
            <dl className="font-semibold">Доставка</dl>
            <dt>Доставим подарочный сертификат в любую точку Челябинска! Стоимость доставки рассчитывается при заказе.</dt>
          </p>
          <hr className="w-1/2 rounded border-2 bg-white m-auto border-solid border-white mb-3" />
        </div>
        <div className="w-full">
        <h2 className="pt-8  font-bold w-full text-center text-3xl">
        ПРАЙС ЛИСТ<br/><br/>
      
          <a
            id="price"
            href={'/docs/pricelist2106.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <button className="btnBlue">Скачать</button>
          </a>
          </h2>
          <div className="max-w-full m-3 overflow-auto">
            <div
              className="webviewer"
              ref={viewer}
              style={{ height: '60vh' }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default certificate;
