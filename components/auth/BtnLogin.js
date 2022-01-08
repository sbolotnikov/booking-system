import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import Router from 'next/router'
import AlertMenu from '../alertMenu'

const BtnLogin = ({children, provider, bgColor, txtColor, options}) => {
  const [loading, setLoading] = useState(false)
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success(provider, options.email)
    if ((provider === "credentials")&&(options.password.length < 6)) {
      return toast.error("Passwords should be at least 6 symbols long");
    }
    setLoading(true);
    const res = await signIn(provider, options);
    setLoading(false);
    
    if(provider === 'email'){
      console.log(res)
      if(res.status === 200){
        setAlertStyle({
          variantHead: 'info',
          heading: 'Предупреждение',
          text: `Проверьте почту. Там будет емейл со ссылкой для входа`,
          color1: 'success',
          button1: 'Подтвердить',
          color2: '',
          button2: '',
        });
        setRevealAlert(true);
      }

    }
    if(provider === "credentials"){
      if(res.error){
        console.log(res)
        if(res.error === "Success! Check your email."){
          signIn('email', {email: options.email})
          setAlertStyle({
            variantHead: 'info',
            heading: 'Предупреждение',
            text: `Проверьте почту. Там будет емейл со ссылкой для входа`,
            color1: 'success',
            button1: 'Подтвердить',
            color2: '',
            button2: '',
          });
          setRevealAlert(true);
        }else{
          setAlertStyle({
            variantHead: 'danger',
            heading: 'Ошибка регистрации',
            text: `${res.error}`,
            color1: 'secondary',
            button1: 'Подтвердить',
            color2: '',
            button2: '',
          });
          setRevealAlert(true);
        }
      }
    }
  }
  const onReturn = (choice) => {
    return Router.push("/")
  }
  return (
      <div>
      { loading && <Loading /> }
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
    <form onSubmit={handleSubmit}>

      {children}

      <button type="submit" className="w-full button rounded-b-md" 
      style={{ background: `${bgColor}`, color: `${txtColor}`}}>
        Вход {(provider=='credentials')?'обычный':(provider=='google')?'через Гугл':"через почту"}
      </button>

      
    </form>
    </div>
  )
}

BtnLogin.defaultProps = {
  txtColor: '#eee'
}
export default BtnLogin