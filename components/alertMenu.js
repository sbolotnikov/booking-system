import { useEffect, useState } from "react"
// color schemas for different occasions 
var variant = {
  'danger': {
    'color': '#721c24',
    'backgroundColor': '#f8d7da',
    'borderColor': '#f5c6cb'
    
  },
  'success': {
    'color': '#155724',
    'backgroundColor': '#d4edda',
    'borderColor': '#c3e6cb'
   },
   'secondary': {
    'color': '#383d41',
    'backgroundColor': '#e2e3e5',
    'borderColor': '#d6d8db'
  },
  'warning': {
    'color': '#856404',
    'backgroundColor': '#fff3cd',
    'borderColor': '#ffeeba'
  },
  'info': {
    'color': '#0c5460',
    'backgroundColor': '#d1ecf1',
    'borderColor': '#bee5eb',
  },
  '': {},
}
export default function AlertMenu(props) {
  // main popup alert component
  const el = document.querySelector('#mainPage');
  const [button1Color, setbutton1Color]=useState('');
  const [button2Color, setbutton2Color]=useState('');
  function StopScroll(){
    // prevent scrolling
    var x=0;
    var y=el.scrollTop;
    window.onscroll=function(){window.scrollTo(x, y);};
       
}
function AllowScroll(){
  // when done release scroll
  window.onscroll=function(){};
}
  useEffect(() => {
    // setup buttons style on load 
    setbutton1Color(Object.values(variant)[Object.keys(variant).indexOf(props.styling.color1)].color);
    setbutton2Color(Object.values(variant)[Object.keys(variant).indexOf(props.styling.color2)].color);
    StopScroll();
}, []);
  return (

    <div className="w-[100vw] h-[100vh] absolute flex justify-center items-center bg-slate-500/70 left-0 z-[1001] backdrop-blur-md" style={{ top: el.scrollTop }} >
      <div className='m-auto  max-w-[600px] bg-gray-700 border-2 border-solid border-gray-400 rounded-md w-[97%] p-2 flex flex-col content-evenly'>
        <label className='px-1 py-2 border-2 border-solid border-transparent rounded-sm w-full m-1 text-center' style={Object.values(variant)[Object.keys(variant).indexOf(props.styling.variantHead)]}>{props.styling.heading}</label>
        <h5 className="px-1 py-2 border-2 border-solid border-transparent rounded-sm w-full m-1 text-center"  dangerouslySetInnerHTML={{ __html:props.styling.text}}/>
        {props.styling.inputField && <textarea id="inputField" className="w-full mb-2 rounded-md text-gray-700" defaultValue={props.inputValue} />}
        {(props.styling.color1!=="") && <button className='px-1 py-2 border-2 border-solid border-transparent rounded-sm w-full m-1 text-center text-white' style={{backgroundColor:button1Color}} onClick={e => {AllowScroll(); props.onReturn(props.styling.button1, (props.styling.inputField ? document.querySelector("#inputField").value : null)); }}>
          {props.styling.button1}
        </button>}
        {(props.styling.color2!=="") &&<button className="px-1 py-2 border-2 border-solid border-transparent rounded-sm w-full m-1 text-center text-white" style={{backgroundColor:button2Color}} onClick={e => {AllowScroll(); props.onReturn(props.styling.button2) }}>
          {props.styling.button2}
        </button>}

      </div>

    </div>

  )
}