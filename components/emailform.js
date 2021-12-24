import { useState, useContext } from 'react';
import AppContext from '../appContext';
function Emailform(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage]= useState("");
    const value = useContext(AppContext);
    const mainEmail = value.mainEmail;
    const handleSubmit=(e)=>{
        e.preventDefault();
        let data = {
            name,
            email,
            message,
            mainEmail:mainEmail
          }
        fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
              console.log('Response succeeded!')   
              setName('')
              setEmail('')
              setMessage('')
              props.onChange(true);
            }
          })
    }
  return (

        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex justify-center  items-center">
          <form
            className="w-[80%] h-[80%] max-w-[700px] max-h-[700px] bg-black rounded-md flex flex-col justify-between  items-center p-2"
            style={{ boxShadow: '0 0 150px rgb(100 100 255 / 80%)' }}
            onSubmit={handleSubmit}
          >
            <button
              className="relative w-full"
              onClick={() => {
                props.onChange(true);
              }}
            >
              <div className="absolute  -top-5 -right-5  p-2  bg-black rounded-full  flex justify-center  items-center">
                <img
                  className="h-2"
                  src={'/icons/close.svg'}
                  alt="menu close"
                />
              </div>
            </button>
            <h2 className="w-full text-center font-extrabold">Есть вопросы?</h2>
            <p className="w-full text-gray-400">
              Мы с удовольствием ответим! Если вопрос срочный, лучше позвонить{' '}
              <strong>+7 (351) 220-75-49</strong>.
            </p>

            <input
              className="w-full rounded bg-[#0C1118]"
              type="text"
              placeholder="Ваше имя"
              required
              onChange={(e)=>{setName(e.target.value)}}
              value = {name}
              minLength="3"
            />

            <input
              className="w-full rounded bg-[#0C1118]"
              type="email" 
              placeholder="E-mail"
              required
              onChange={(e)=>{setEmail(e.target.value)}}
              value = {email}
            />
            <textarea
              className="w-full rounded bg-[#0C1118]"
              placeholder="Любые вопросы или пожелания"
              required
              onChange={(e)=>{setMessage(e.target.value)}}
              value = {message}
              minLength="5"
            ></textarea>
            <div className="error alert alert-error"></div>
            <button type="submit" className="w-full rounded bg-indigo-900">
              Отправить сообщение
            </button>
          </form>
        </div>
      
  );
}

export default Emailform;
