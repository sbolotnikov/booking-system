import Image from 'next/image';
import { useEffect, useRef } from 'react';
function certificate() {
  const viewer = useRef(null);

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
      <h1 className="pt-8 font-bold mb-3 text-5xl">
        {'Наши сертификаты и Прайс лист'}
      </h1>
      <main className="grid max-w-[1368px] w-full phone:grid-cols-2">
        <div className="w-full">
          <a
            href={'/docs/pricelist2106.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <button className="btnBlue">Скачать</button>
          </a>
          <div className="max-w-full m-1 overflow-auto">
            <div
              className="webviewer"
              ref={viewer}
              style={{ height: '60vh' }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col ml-10  w-[85%] items-start justify-start ">
          <div className="relative h-[50vh] w-full">
            <Image
              src={`/images/certificates.jpg`}
              alt={`certificates`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default certificate;
