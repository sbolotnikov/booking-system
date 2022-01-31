import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AboutComponent from '../components/about';

export default function Home() {
  const { data: session, status } = useSession();
  const [scrollDown, setScrollDown] = useState(false);
  const router = useRouter();
  
  const onScroll = (e) => {
    console.log("scroll")
    setScrollDown(true);
  };

  // useEffect(() => {
  //   window.addEventListener("onscroll", (e) => setScrollDown(true));
  // }, []);
//   useEffect(() => {
//     const onScroll = () => {if (window.pageYOffset>0) setScrollDown(true)}
//     // clean up code
//     window.removeEventListener('scroll', onScroll);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
// }, []);
  return (
    <>
      <Head></Head>
      <div className="w-full flex flex-col justify-center  items-center" onScroll={(e)=>{
        e.preventDefault();
        console.log("scrolling")
        setScrollDown(true)}}>
        <div className="w-full grid xs:grid-cols-1 sm:grid-cols-1 phone:grid-cols-2 max-w-[1170px]">
          <div className="relative w-80 ">
<div className="absolute  top-[5rem] right-[4.5rem]">            
           <div className="flame"></div>
</div>
            <img
              className="w-64 "
              style={{ filter: 'drop-shadow(10px 5px 4px #4444dd)' }}
              src={'/icons/svg/light.svg'}
              alt="hero"
            />
            <img
              className="animate_pendulum absolute w-60 max-w-[300px]  -bottom-10 right-12 origin-top-center rotate-12"
              style={{ filter: 'drop-shadow(10px 5px 4px #4444dd)' }}
              src={'/icons/svg/sign.svg'}
              alt="hero"
            />

          </div>
          <div className="w-full inner-wrap flex flex-col justify-center  items-center">
            <h2 className="text-4xl">Таинственный переулок,</h2>
            <h3 className="font-bold text-2xl mt-5">
              центр квестов и пряток в{' '}
              <Link href="/contacts/0">
                <div
                  style={{ textDecorationStyle: 'dotted' }}
                  className="underline"
                >
                  Челябинске.
                </div>
              </Link>
            </h3>
            <p className="font-bold mb-2">
              квесты в реальности и прятки во тьме
            </p>
            <button
              className="btnBlue"
              onClick={(e) => {
                router.replace('/book');
              }}
            >
              Забронировать{' '}
            </button>
          </div>
        </div>
        {scrollDown && <AboutComponent />}
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
