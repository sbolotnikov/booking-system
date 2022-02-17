import Link from 'next/link';
import { useEffect,useState } from 'react';
function BookingCard(props) {
  
  const [visible, setVisible] = useState(0);
  const [stopping, setStopping] = useState(0);
  function handleVisible(e) {
      let n = parseInt(e.currentTarget.id);

      if (visible>0){ 
          document.getElementById("img."+props.id).classList.remove("rotate-180");
      }
      if (n!==visible){
      document.getElementById("img."+props.id).classList.add("rotate-180");
      } 
      visible===0?setVisible(1):setVisible(0);
    }
  useEffect(() => {

    document.getElementById(
      props.id + 'header'
    ).style.backgroundImage = `url(${props.item.bgImage})`;
  }, []);
  return (
    <div
      className="slide bg-no-repeat bg-contain bg-left-top  rounded-md bg-[#0C1118]  m-2"
      id={props.id + 'header'} onClick={e =>{stopping===0?setStopping(1):setStopping(0); props.onVisible(stopping);}}
    >
      <div className="inner-wrap flex flex-col justify-center items-center">
        <img className="w-10 mb-2 " src={props.item.img} alt="" />
        <h2 className="flex justify-center items-center">{props.item.name}</h2>
        <h3 className="flex justify-center items-center h-64">{props.item.short}</h3>
        <div className="m-3 relative" id={1+'.'+props.id+'.links'} onClick={e => handleVisible(e)} >
              <div  className="w-full flex">            
                <div className="cursor-pointer text-left ml-4">КОМУ ПОДОЙДЕТ?</div>
                <img className="w-5 h-5" src={"/icons/caret.svg"}  alt="open" id={"img."+props.id} />
              </div>
             
              {(visible>0) &&<p  className="absolute left-0 top-6 rounded-sm bg-popup cursor-pointer z-20" 
                    dangerouslySetInnerHTML={{ __html: props.item.toWhom}}/>
              }
            </div>
        <div>
          <span>от </span>
          <span className="ml-1 text-white font-extrabold text-4xl">{props.item.price}</span>
          <span> ₽</span>
          <br />
          {/* <span>за участника</span> */}
        </div>
        <Link href={'/game/' + props.item.id}>
          <button className="navbar__item p-4">
            Выбрать
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
