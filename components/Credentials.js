import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router"
import { signIn, getSession } from 'next-auth/client';
import { toast } from 'react-toastify'
function Credentials() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
      getSession().then((session) => {
          if (session) {
              router.replace('/');
          } else {
              setLoading(false);
          }
      });
  }, []);
  if (loading) {
      return <p>Loading...</p>;
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return toast.error("Passwords should be at least 6 symbols long");
    }
    try {
      setError("");
      setLoading(true);
      const status = await signIn('credentials', {
        redirect: false,
        email: emailRef.current.value,
        password: passwordRef.current.value,
    });
    console.log(status);

    //Await for data for any desirable next steps
    const data = await res.json();
    console.log(data);
    } catch {
      toast.error("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <form  className="flex flex-col items-center p-3 bg-white bottom-0"onSubmit={handleSubmit}>
      <label>Email </label>
      <input className="flex-1 outline-none border-none rounded-sm bg-gray-100 p-0.5 mx-1" id="email" type="email" ref={emailRef} required />

      <label>Password </label>
      <input className="flex-1 outline-none border-none rounded-sm bg-gray-100 p-0.5 mx-1" id="password" type="password" ref={passwordRef} required />
      

      <button className="w-full button border-t border-gray-100 border-solid" disabled={loading} type="submit">
        Log In
      </button>
{/* 
      <label> Already have an account? </label>
      <button className="w-full button border-t border-gray-100 border-solid" onClick={()=>{props.onChange()}}>Log in</button> */}
    </form>
  );
}

export default Credentials;
