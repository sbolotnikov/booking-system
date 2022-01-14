import { useRef, useEffect, useState } from 'react';
import { signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Cloudinary from '../components/Cloudinary';
import AlertMenu from '../components/alertMenu';
import Loading from '../components/Loading';
const profile = ({ session }) => {
  const [phone, setPhone] = useState(session.user.phone);
  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const passwordConfirmRef = useRef();
  const [revealAlert, setRevealAlert] = useState(false);
  const [alertStyle, setAlertStyle] = useState({});
  const [loading, setLoading] = useState(false);
  const [toRoot, setToRoot] = useState(false);
  const [revealCloud, setRevealCloud] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(session);
  }, []);
  const [userURL, setUserURL] = useState(session.user.image);
  console.log(session);
  const getImgUrl = (url) => {
    // update URL of the profile picture
    document.querySelector('#userURL').childNodes[1].value = url;
    setUserURL(url);
    setRevealCloud(false);
    console.log(userURL);
  };
  const onReturn = async (decision1) => {
    setRevealAlert(false);
    if (decision1 == 'Закрыть') {
    }
    if (decision1 == 'Выполнить вход') {
      setLoading(true);
      await signOut();
      setLoading(false);
    }
  };

  function handleSubmit(e) {
    // submitting profile updated information
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setAlertStyle({
        variantHead: 'info',
        heading: 'Сообщение',
        text: 'Пароль не совпадает',
        color1: 'secondary',
        button1: 'Закрыть',
        color2: '',
        button2: '',
      });
      setRevealAlert(true);
      return;
    }
    if (passwordRef.current.value.length < 6) {
      setAlertStyle({
        variantHead: 'info',
        heading: 'Сообщение',
        text: 'Пароль должен быть не менее 6 символов',
        color1: 'secondary',
        button1: 'Закрыть',
        color2: '',
        button2: '',
      });
      setRevealAlert(true);
      return;
    }
    setLoading(true);

    fetch('/api/profile_update', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userNameRef.current.value,
        id: session.user.id,
        image: userURL,
        email: emailRef.current.value,
        phone,
        password: passwordRef.current.value,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setAlertStyle({
          variantHead: 'info',
          heading: 'Сообщение',
          text: 'Вы успешно обновили профиль. Зайдите еще раз',
          color1: 'secondary',
          button1: 'Выполнить вход',
          color2: '',
          button2: '',
        });
        setRevealAlert(true);
        console.log(res);
      }
    });
  }

  // if (toRoot === true) { return <Redirect to="/dashboard" /> }
  return (
    <div className="w-full flex justify-center items-center">
      {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}
      {loading && <Loading />}
      <div
        className="border-0 max-auto p-4 shadow max-w-[450px] w-full m-3"
        style={{ boxShadow: '0 0 150px rgb(100 100 255 / 80%)' }}
      >
        <h2
          className="text-center fw-bolder text-uppercase"
          style={{ color: 'whitesmoke', letterSpacing: '1px' }}
        >
          Ваш личный кабинет
          <div className="relative  outline-none border border-gray-100 rounded-md bg-main-bg w-24 p-4 my-6 mx-auto">
            {userURL != null ? (
              <img
                src={userURL}
                className="object-contain"
                alt="User Picture"
              />
            ) : (
              <img
                src={'/icons/defaultUser.svg'}
                className="object-contain"
                alt="default User Picture"
              />
            )}
            <img
              src={'/icons/plus.svg'}
              className=" outline-none border-none rounded-md bg-main-bg absolute p-1 -top-5 -right-5 w-8"
              alt="Change User Picture"
              onClick={(e) => {
                e.preventDefault();
                setRevealCloud(!revealCloud);
              }}
            />
          </div>
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col items-center p-3 bg-popup rounded-t-md bottom-0">
            Ваше имя:
            <input
              id="userName"
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              type="text"
              ref={userNameRef}
              defaultValue={session.user.name}
              placeholder="Leave blank to keep the same"
            />
          </label>
          {revealCloud && (
            <label
              className="flex flex-col items-center bg-popup rounded-t-md bottom-0 border border-gray-100 m-1 p-1 rounded-md"
              id="userURL"
            >
              Изменить линк
              <input
                type="text"
                className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
                onChange={(e) => {
                  setUserURL(e.target.value);
                }}
                defaultValue={session.user.image}
              />
              Загрузить файл
              <Cloudinary
                style={{ width: '200px', objectFit: 'cover', margin: '10px' }}
                getImgUrl={getImgUrl}
              />
            </label>
          )}
          <label className="flex flex-col items-center p-3 bg-popup rounded-t-md bottom-0">
            Адрес эл. почты
            <input
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              id="email"
              type="email"
              ref={emailRef}
              required
              defaultValue={session.user.email}
            />
          </label>
          <label className="flex flex-col items-center p-3 bg-popup rounded-t-md bottom-0">
            Пароль
            <input
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              id="password"
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </label>
          <label className="flex flex-col items-center p-3 bg-popup rounded-t-md bottom-0">
            Подтвердить пароль
            <input
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              id="password-confirm"
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </label>
          <label className="flex flex-col items-center p-3 bg-popup rounded-t-md bottom-0">
            Телефон:
            <input
              className="flex-1 outline-none border-none rounded-md bg-main-bg p-0.5 mx-1"
              type="tel"
              placeholder="Телефон"
              required
              minLength={13}
              maxLength={13}
              onChange={(e) => {
                setPhone(e.target.value.slice(3));
              }}
              value={'+7 ' + phone}
            />
          </label>
          <button
            disabled={loading}
            className=""
            style={{ width: '100%', margin: '2% auto' }}
            type="submit"
          >
            Update
          </button>
        </form>

        {/* <div className="">
          <Link to="/dashboard" className="links">
            Cancel
          </Link>
        </div> */}
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

export default profile;
