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
      <div className="w-full  max-w-[1170px] flex flex-col justify-start  items-start m-auto" >
      <h1 className="w-full text-6xl text-center mt-6  xs:hidden sm:hidden phone:block"  style={{ fontFamily: 'Lumberjack'}}>Таинственный переулок</h1>
        <div className=" flex xs:flex-col sm:flex-col phone:flex-row justify-center items-center mx-auto">      
          <div className="xs:w-52 xs:h-[20rem] w-64 h-[27rem] xs:mx-0 mx-auto">
          <div className="relative xs:w-52 w-64 ">
            <div className="absolute xs:top-[3.8rem] xs:left-[6rem] top-[3.9rem] left-[8rem]">
              <div className="flame"></div>
            </div>
            <img
              className="w-64 absolute top-0 left-0 "
              style={{ filter: 'drop-shadow(10px 5px 4px #6a640d)' }} //#4444dd #FFEC00 #7D8800 shadow change
              src={'/icons/svg/light.svg'}
              alt="hero"
            />
              {/* className="animate_pendulum absolute w-60 max-w-[300px]  -bottom-10 right-12 origin-top-center rotate-12" */}

            <img
              className="animate_pendulum absolute w-60 xs:w-48  max-w-[300px]  xs:top-[15rem] xs:left-[2.2rem] top-[18.32rem] left-[2.85rem] origin-top-center rotate-12"
              style={{ filter: 'drop-shadow(10px 5px 4px #6a640d)' }} //#4444dd  shadow change
              src={'/icons/svg/sign.svg'}
              alt="hero"
            />
          </div>
          </div>
          <div className=" inner-wrap_front flex  flex-col justify-center  items-center">
            
            <h3 className="font-bold text-2xl mt-12">
              центр квестов и пряток{' '}
              <Link href="/contacts/0">
                <div className="text-[#FFEC00] font-extrabold cursor-pointer">в Челябинске</div>
              </Link>
            </h3>
            <button
              className="xs:py-[20px] btnBlue"
              onClick={(e) => {
                router.replace('/book');
              }}
            >
              Забронировать{' '}
            </button>
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
