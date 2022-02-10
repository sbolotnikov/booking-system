import  {useState} from 'react';
import Axios from 'axios'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

function Cloudinary(props) {
    // handles cloudinary upload and providing the link for a parent component
    const [imageSelected, setImageSelected]=useState('');
    const pictureUpload=(event)=> {
       const formData= new FormData();
       formData.append('file', imageSelected);
       console.log(publicRuntimeConfig.cloudPreset)
       formData.append('upload_preset', publicRuntimeConfig.cloudPreset);
       Axios.post(
           "https://api.cloudinary.com/v1_1/"+publicRuntimeConfig.cloudName+"/image/upload",
           formData
       )
       .then(response=>{
        setImageSelected("");
        console.log(response.data.url)
        console.log(event.target.parentElement.previousSibling.value)
        event.target.parentElement.previousSibling.value=""; 
        props.getImgUrl(response.data.url);
        })
        .catch(e=>{console.log('Fail to upload image')})
    }

    return(
        <div className="w-full flex flex-col justify-center items-center " >
            <input type='file' className='w-full border-0 m-2 rounded-md' onChange={(event)=>setImageSelected(event.target.files[0])}/>
            <div className="w-full m-3 p-1 text-sm border text-center rounded-lg navbar__item" onClick={(e)=>{pictureUpload(e)}}>Сохранить</div>
        </div>
    )
}

export default Cloudinary;
