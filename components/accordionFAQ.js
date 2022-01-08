import { useState } from "react"
function AccordionFAQ(props) {

    const [visible, setVisible] = useState(-1);
    function handleVisible(e) {
        let n = parseInt(e.currentTarget.id);

        if (visible>-1){ 
            document.getElementById("img."+visible).classList.remove("rotate-180");
            document.getElementById("question"+visible).classList.remove("text-red-400","font-black");
        }
        if (n!==visible){
        document.getElementById("img."+n).classList.add("rotate-180");
        document.getElementById("question"+n).classList.add("text-red-400","font-black");
        } 
        n!==visible?setVisible(n):setVisible(-1);
      }
    return (
        <div className='relative m-8'>

        {props.options.map((item, j) => {
          return (
            <div className="m-3" key={"option" + j} id={j+'.links'} onClick={e => handleVisible(e)} >
              <div key={"question" + j} className="w-full flex">
                  <img className="w-5 h-5" src={"/icons/caret.svg"}  alt="open" id={"img."+j} key={"btnflip" + j}  />
                
                <h3 id={"question"+j} className="cursor-pointer text-left ml-4">{item.question}</h3>
                
              </div>
             
              {(j===visible) &&<p key={"answer" + j} style={{ cursor: "pointer" }}
                    dangerouslySetInnerHTML={{ __html:item.answer}}/>
              }
            </div>
          )
        }
        )}
      </div>
    )
}

export default AccordionFAQ
