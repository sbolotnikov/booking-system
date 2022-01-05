import { useEffect } from 'react';
function Card(props) {
    useEffect(() => {
        // for(let i=0; i<props.classesCSS.length; i++){
        let propertiesArr=Object.getOwnPropertyNames(props.classesCSS);
        for (let i=0;i<propertiesArr.length;i++){
            for (let j=0;j<props.classesCSS[propertiesArr[i]].length;j++){
                document
                .getElementById(props.id+propertiesArr[i])
                .classList.add(props.classesCSS[propertiesArr[i]][j]);  
            }   
        }

      }, []);
    return (
        <div id={`${props.id}card`} className="flex">
            <img id={`${props.id}image`} src={props.item.imgLink} alt=""  />
            <div id={`${props.id}text`}>
              <h3 id={`${props.id}name`}>
               {props.item.name}
              </h3>
              <p id={`${props.id}desc`}>
                {props.item.desc}
              </p>
            </div>
          </div>
    )
}

export default Card
