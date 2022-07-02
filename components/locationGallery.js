import Image from 'next/image';
import {useState, useEffect, useRef, useContext} from 'react'
import AppContext from '../appContext';
import PictureViewer from './pictureViewer';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

function LocationGallery({location}) {
    const [revealPicture, setRevealPicture] = useState(false)
    const [pictureSrc, setPictureSrc] = useState('')
    const [pictureNote, setPictureNote] = useState('')
    const value = useContext(AppContext);
    let pictures=value.locations[location]
    const onChange = () => {
      setRevealPicture(false)
    }
  
    useEffect(() => {
      document.documentElement.style.setProperty(
        '--slides',
        (pictures.images.length - 1).toString()
      )
    }, [])
  return (
    <div className="w-full h-full ">
    
    {revealPicture && (
      <PictureViewer
        linkPicture={pictureSrc}
        note={pictureNote}
        isVideo={false}
        onChange={onChange}
      />
    )}
    <h1 className="text-center w-full  p-10 text-2xl font-extrabold">
        Наш Интерьер
      </h1>
    <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {pictures.images &&
            pictures.images.map((item, i) => {
            return (
              <SwiperSlide key={'slide___'+i}>
                <div
                    key={`package${i}`}
                    className="h-[70vh] w-[80vw] m-auto relative bg-cover bg-center swiper-lazy "
                    data-title={item.title}
                    data-src={item.link}
                    onClick={(e) => {
                        let element=e.currentTarget
                        setPictureSrc(element.getAttribute("data-src"))
                        setPictureNote(element.getAttribute("data-title"))
                        console.log(element.getAttribute("data-src"))
                        setRevealPicture(true)
                      }}
                      style={{backgroundImage: `url(${item.link})`}}
                  >
                  <div className="absolute top-0 left-0 right-0 flex justify-center items-center "><p className="text-center font-size-lg font-extrabold text-[#FFEC00]" style={{textShadow: 'black 1px 1px 5px'}}>{item.title}</p></div>
                   
                  </div>
              </SwiperSlide>
            );
          })}

</Swiper>



        </div>
  )
}

export default LocationGallery