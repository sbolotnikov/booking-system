import Image from 'next/image';
import {useState, useEffect, useContext} from 'react'
import AppContext from '../appContext';
import PictureViewer from './pictureViewer';

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
    <div className="w-full h-full flex justify-center items-center">
    
    {revealPicture && (
      <PictureViewer
        linkPicture={pictureSrc}
        note={pictureNote}
        isVideo={false}
        onChange={onChange}
      />
    )}
        <div className=" flex  flex-col items-start justify-center  rounded-md md:justify-start">

          <div className="mediaScroller1 mx-auto w-[100%] max-w-xl bg-slate-500/70">
            <div className="slideTrack1">
              {pictures.images.map((item, j) => {
                return (
                  <button
                    key={`package${j}`}
                    className="slide relative h-[50vh]"

                  > <div className="relative w-[320px] h-[50vh]" onClick={(e) => {
                        let element=e.currentTarget.children[0].children[0]
                        setPictureSrc(element.getAttribute("src"))
                        let number =
                          +element.getAttribute('data-id')
                        setPictureNote(pictures.images[number].title)
                        console.log(element.getAttribute("src"))
                        setRevealPicture(true)
                      }}>
                    <Image
                      src={item.link}
                      alt=""
                      data-id={j}
                      layout="fill"
                      objectFit="contain"
                      
                    />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 dark:text-light"><p className="text-center">{item.title}</p></div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        </div>
  )
}

export default LocationGallery