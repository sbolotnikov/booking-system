import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Router from 'next/router';
import BtnLogin from '../components/auth/BtnLogin';
import AlertMenu from '../components/alertMenu';
// import Email from '../components/auth/Email'

const Login = ({ session }) => {
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [password, setPassword] = useState('');
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  useEffect(() => {
    if (session) return Router.push('/');
  }, [session]);

  useEffect(() => {
    if (Router.query.error) {
      console.log(Router.query.error)
      let errText="";
      (Router.query.error=="OAuthAccountNotLinked")? errText="Для подтверждения вашей идентичности пользуйтесь только одним методом входа!":errText=Router.query.error
      setAlertStyle({
        variantHead: 'danger',
        heading: 'Ошибка регистрации',
        text: `${errText}`,
        color1: 'secondary',
        button1: 'Подтвердить',
        color2: '',
        button2: '',
      });
      setRevealAlert(true);
      
    }
  }, []);

  const onReturn = (choice) => {
    setRevealAlert(false);
    return Router.push('/login');
  }

  if (session) return null;

  return (
    <div
      className="w-full flex justify-center items-center"
    >
    {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      <div
        className="border-0 rounded-md max-auto p-4 shadow max-w-[450px] w-full m-3"
        style={{ boxShadow: '0 0 150px rgb(255 236 0 / 50%)'}}
      >
        <h2
          className="text-center font-bold uppercase"
          style={{ color: 'whitesmoke', letterSpacing: '1px' }}
        >
          Вход
        </h2>

        <BtnLogin
          provider={'credentials'}
          bgColor="gray"
          options={{ redirect: false, email, password }}
        >
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </BtnLogin>

        <div className="text-center">✦ или ✦</div>
        <div>
          <BtnLogin provider={'google'} bgColor="#f2573f" />    
        </div>
        <div className="text-center">✦ или ✦</div>
        <BtnLogin
          provider={'email'}
          bgColor="#22b05b"
          options={{ redirect: false, email: email2 }}
        >
          <div className="flex flex-col items-center p-3 bg-main-bg bottom-0">
            <label htmlFor="email">Вход через ваш эл. адрес</label>
            <input
              type="email"
              id="email2"
              name="email2"
              className="flex-1 outline-none border-none rounded-sm bg-main-bg p-0.5 mx-1"
              placeholder="email@example.com"
              required
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </div>
        </BtnLogin>
        <h4 className="w-full">Новые пользователи могут зайти через Гугл или получить ссылку для входа на почту</h4>
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

export default Login;
