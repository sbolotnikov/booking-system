import Link from 'next/link';
import { useEffect,useState } from 'react';
function BookingCard(props) {
  
  const [visible, setVisible] = useState(0);
  function handleVisible(e) {
      let n = parseInt(e.currentTarget.id);

      if (visible>0){ 
          document.getElementById("img."+props.id).classList.remove("rotate-180");
      }
      if (n!==visible){
      document.getElementById("img."+props.id).classList.add("rotate-180");
      } 
      console.log(visible)
      visible===0?setVisible(1):setVisible(0);
    }
  useEffect(() => {
    console.log(props);

    document.getElementById(
      props.id + 'header'
    ).style.backgroundImage = `url(${props.item.bgImage})`;
  }, []);
  return (
    <div
      className=" bg-no-repeat bg-contain bg-left-top max-w-[350px] min-w-[300px] rounded-md bg-[#0C1118]  m-2"
      id={props.id + 'header'}
    >
      <div className="inner-wrap flex flex-col justify-center items-center">
        <img className="w-10 mb-2 " src={props.item.img} alt="" />
        <h2>{props.item.name}</h2>
        <h3>{props.item.short}</h3>
        <div className="m-3 relative" id={1+'.'+props.id+'.links'} onClick={e => handleVisible(e)} >
              <div  className="w-full flex">            
                <h3 className="cursor-pointer text-left ml-4">КОМУ ПОДОЙДЕТ?</h3>
                <img className="w-5 h-5" src={"/icons/caret.svg"}  alt="open" id={"img."+props.id} />
              </div>
             
              {(visible>0) &&<p  className="absolute left-0 top-6 rounded-sm bg-purple-800 cursor-pointer" 
                    dangerouslySetInnerHTML={{ __html: props.item.toWhom}}/>
              }
            </div>
        <div>
          <span>от </span>
          <span className="ml-1 text-white font-extrabold text-4xl">{props.item.price}</span>
          <span> ₽</span>
          <br />
          <span>за участника</span>
        </div>
        <Link href={'/game/' + props.item.id}>
          <button className="border-2 border-blue-400 text-blue-400 rounded-full p-1 mt-1 ml-1">
            Выбрать
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
