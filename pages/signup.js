import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Router from 'next/router';
import { toast } from 'react-toastify';
// import Email from '../components/auth/Email'

const Signup = ({ session }) => {
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    if (session) return Router.push('/');
  }, [session]);

  useEffect(() => {
    if (Router.query.error) {
      toast.error(Router.query.error);
      return Router.push('/login');
    }
  }, []);

  if (session) return null;
  return (
    <div
      className="w-full flex justify-center items-center"
    >
      <div
        className="border-0 max-auto p-4 shadow max-w-[450px] w-full m-3"
        style={{ boxShadow: '0 0 150px rgb(100 100 255 / 80%)' }}
      >
        <h2
          className="text-center fw-bolder text-uppercase"
          style={{ color: 'whitesmoke', letterSpacing: '1px' }}
        >
          Login
        </h2>
          <div className="flex flex-col items-center p-3 bg-popup rounded-t-md bottom-0">
            <label>Адрес эл. почты</label>
            <input
              type="email"
              name="email"
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              required
              placeholder="введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center p-3 bg-white bottom-0">
            <label htmlFor="password2">Подтвердить пароль</label>
            <input
              type="password"
              id="password2"
              name="password2"
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              placeholder="потвердите пароль"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center p-3 bg-white bottom-0">
            <label htmlFor="email">Телефон</label>
            <input
              type="email"
              id="email2"
              name="email2"
              className="flex-1 outline-none border-none rounded-sm bg-gray-100 p-0.5 mx-1"
              placeholder="email@example.com"
              required
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </div>
          <input
          className="w-full rounded mb-1 bg-[#0C1118]"
          type="tel"
          placeholder="Телефон"
          required
          minLength={13}
          maxLength={13}
          onChange={(e) => {
            setError('');
            setPhone(e.target.value.slice(3));
          }}
          value={'+7 ' + phone}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default Signup;