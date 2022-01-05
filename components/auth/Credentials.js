import { useState } from 'react'
import BtnLogin from './BtnLogin'

const Credentials = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <BtnLogin 
      provider={"credentials"}
      bgColor='gray'
      options={{redirect: false, email, password}}
    >
      <div className="flex flex-col items-center p-3 bg-popup bottom-0">
        <label>Email address</label>
        <input type="email" name="email"
        className="flex-1 outline-none border-none rounded-md bg-[#0C1118] p-0.5 mx-1" 
        placeholder="email@example.com" required
        value={email} onChange={e => setEmail(e.target.value)} />
 
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"
        className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"  required
        value={password} onChange={e => setPassword(e.target.value)} />
      </div>
    </BtnLogin>
  )
}

export default Credentials