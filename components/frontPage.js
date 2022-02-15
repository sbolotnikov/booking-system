import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AboutComponent from './about';

export default function FrontPage() {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const router = useRouter();
  // useEffect(() => {
  //   const onScroll = e => {
  //     setScrollTop(e.target.documentElement.scrollTop);
  //     setScrolling(e.target.documentElement.scrollTop > scrollTop);
  //     console.log("scrolling")
  //   };
  //   window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [scrollTop]);
  //   useEffect(() => {

  //     window.addEventListener('scroll', onScroll);
  //     return () => window.removeEventListener('scroll', onScroll);
  //   }, [scrollTop]);
  //   function onScroll() {
  //     let currentPosition = 0; // or use document.documentElement.scrollTop;
  //     console.log("wheel", WheelEvent.wheelDelta)
  //     if (currentPosition >0) {
  //       // downscroll code
  //       setScrolling(true);
  //     } else {
  //       // upscroll code
  //       setScrolling(false);
  //     }

  //   }

  //     useEffect(() => {
  //       const onScroll = () => {if (window.pageYOffset>0) setScrollDown(true)}
  //       // clean up code
  //       window.removeEventListener('scroll', onScroll);
  //       window.addEventListener('scroll', onScroll, { passive: true });
  //       return () => window.removeEventListener('scroll', onScroll);
  //   }, []);
  return (
    <>
      <div className="w-full h-[90vh]  max-w-[1170px] flex flex-col justify-start  items-start m-auto overflow-auto">
        <div className=" flex xs:flex-col sm:flex-col phone:flex-row justify-center items-center sm:m-fit phone:m-auto">
          <div className="xs:w-60  sm:w-60 w-72 h-[30rem] ">
            <div className="relative xs:w-60 w-72 ">
              <div className="absolute xs:top-[2.8rem] xs:left-[5.6rem] sm:top-[2.8rem] sm:left-[5rem] phone:top-[6.1rem] phone:left-[6.3rem]">
                <div className="flame"></div>
              </div>
              <img
                className="xs:w-60 sm:w-60 w-72 absolute top-0 left-0 "
                style={{ filter: 'drop-shadow(3px 5px 4px #FFEC00)' }} //#6a640d #4444dd #FFEC00 #7D8800 shadow change 936B2C
                src={'/icons/svg/light.svg'}
                alt="hero"
              />
              {/* className="animate_pendulum absolute w-60 max-w-[300px]  -bottom-10 right-12 origin-top-center rotate-12" */}

              <img
                className="animate_pendulum absolute w-72 xs:w-60 sm:w-60  max-w-[300px]  top-[19.2rem] left-[1.5rem] origin-top-center rotate-12"
                style={{ filter: 'drop-shadow(3px 5px 4px #FFEC00)' }} //#4444dd  shadow change
                src={'/icons/svg/sign.svg'}
                alt="hero"
              />
            </div>
          </div>
          <div className=" inner-wrap_front flex  flex-col justify-center  items-center xs:w-screen sm:w-screen phone:w-full xs:mt-2 phone:ml-8">
            <h1
              className="w-full phone:text-5xl text-center mt-6  xs:hidden sm:block sm:text-5xl phone:block"
              style={{ fontFamily: 'Lumberjack' }}
            >
              Таинственный <br /> переулок
            </h1>
            <button
              id="topButton"
              className=" navbar__item xs:p-[1rem] sm:p-4 "
              onClick={(e) => {
                router.replace('/book');
              }}
            >
              Забронировать
            </button>
            <h3 className="font-bold text-2xl mt-12 xs:mt-24 sm:text-3xl">
              центр квестов и пряток{' '}
              <Link href="/contacts/0">
                <div className="text-[#FFEC00] font-extrabold cursor-pointer">
                  в Челябинске
                </div>
              </Link>
            </h3>
          </div>
        </div>
        {scrolling && <AboutComponent />}
      </div>
      {/* <div className="w-[50vw] ">
        <img
          className="w-full h-[65vh]"
          style={{ filter: 'drop-shadow(10px 5px 4px #4444dd)' }}
          src={'/icons/tree_fence_combo.svg'}
          alt="hero"
        />

        <img className="w-[75vw] h-[65vh]" style={{filter: 'drop-shadow(10px 5px 4px #4444dd)'}} src={"/icons/houses_cloud.svg"}  alt="hero"  />
      </div> */}
    </>
  );
}
