import { useRef, useState } from "react";
function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Passwords should be at least 6 symbols long");
    }
    try {
      setError("");
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <form  className="flex flex-col items-center p-3 bg-white bottom-0"onSubmit={handleSubmit}>
      {error && <label className="text-center text-red-600 italic">{error}</label>}
      <label>Email </label>
      <input className="flex-1 outline-none border-none rounded-sm bg-gray-100 p-0.5 mx-1" id="email" type="email" ref={emailRef} required />

      <label>Password </label>
      <input className="flex-1 outline-none border-none rounded-sm bg-gray-100 p-0.5 mx-1" id="password" type="password" ref={passwordRef} required />
      <label>Password Confirmation</label>
      <input className="flex-1 outline-none border-none rounded-sm bg-gray-100 p-0.5 mx-1"
        id="password-confirm"
        type="password"
        ref={passwordConfirmRef}
        required
      />

      <button className="w-full button border-t border-gray-100 border-solid" disabled={loading} type="submit">
        Sign Up
      </button>

      <label> Already have an account? </label>
      <button className="w-full button border-t border-gray-100 border-solid" onClick={()=>{props.onChange()}}>Log in</button>
    </form>
  );
}

export default Signup;
