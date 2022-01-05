import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import Router from 'next/router'

const BtnLogin = ({children, provider, bgColor, txtColor, options}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success(provider, options.email)
    if ((provider === "credentials")&&(options.password.length < 6)) {
      return toast.error("Passwords should be at least 6 symbols long");
    }
    setLoading(true);
    const res = await signIn(provider, options);
    setLoading(false);

    if(provider === "credentials"){
      if(res.error){
        // if(res.error === "Success! Check your email."){
        //   signIn('email', {email: options.email})
        //   return toast.success(res.error)
        // }
        return toast.error(res.error)
      }

      return Router.push("/")
    }
  }
  return (
      <div>
      { loading && <Loading /> }
    <form onSubmit={handleSubmit}>

      {children}

      <button type="submit" className="w-full button rounded-sm" 
      style={{ background: `${bgColor}`, color: `${txtColor}`}}>
        Sign in with {provider}
      </button>

      
    </form>
    </div>
  )
}

BtnLogin.defaultProps = {
  txtColor: '#eee'
}
export default BtnLogin