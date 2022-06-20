import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
function signup() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    if (passwordRef.current.value.length < 6) {
      return setError('Passwords should be at least 6 symbols long');
    }
    try {
      setError('');
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
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <div
    className="w-full h-screen flex items-center justify-center"
  >
  {/* {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />} */}
    <div
      className="border-0 rounded-md p-4 bg-popup shadow max-w-[450px] w-full"
      style={{ boxShadow: '0 0 150px rgb(255 236 0 / 50%),inset 0 0 20px #FFEC00' }}
    >
      <h2
        className="text-center font-bold uppercase"
        style={{ color: 'whitesmoke', letterSpacing: '1px' }}
      >
        Регистрация
      </h2>

      <form
        className="flex flex-col items-center text-main-bg p-3 bottom-0"
        onSubmit={handleSubmit}
      >
        {error && (
          <label className="text-center text-red-600 italic font-bold">
            {error}
          </label>
        )}
        <label className="text-gray-100">Email </label>
        <input
          className="flex-1 outline-none border-none rounded-md bg-gray-100 p-0.5 mx-1"
          id="email"
          type="email"
          ref={emailRef}
          required
        />

        <label className="text-gray-100">Password </label>
        <input
          className="flex-1 outline-none border-none rounded-md bg-gray-100 p-0.5 mx-1"
          id="password"
          type="password"
          ref={passwordRef}
          required
        />
        <label className="text-gray-100">Password Confirmation</label>
        <input
          className="flex-1 outline-none border-none rounded-md bg-gray-100 p-0.5 mx-1 mb-2"
          id="password-confirm"
          type="password"
          ref={passwordConfirmRef}
          required
        />

        <button
          className="btnBlue1 p-2 max-w-xs"
          disabled={loading}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <label className="flex flex-col items-center justify-center text-gray-100 mx-auto"> Already have an account? 
      <button
        className="btnBlue1 p-2 max-w-xs"
        onClick={() => {
          router.replace('/login');
        }}
      >
       Войти
      </button>
    </label>
    </div>
    </div>
  );
}

export default signup;
