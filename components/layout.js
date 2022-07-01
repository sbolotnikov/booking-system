import Navbar from './navbar';
import Footer from '../components/footer';
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
export default function Layout({ children }) {
  const {data:session, loading} = useSession();
  const router = useRouter();
  let navbarLinks = [
    { url: '/about', title: 'О нас' },
    { url: '/book', title: 'Забронировать' },
    { url: '/birthday', title: 'День Рождения' },
    { url: '/answer', title: 'Вопрос/Ответ' },
    { url: '/certificate', title: 'Сертификат' },
    { url: '/contacts/0', title: 'Контакты' },
  ];
  let navbarLinksAdmin = [
    { url: '/book', title: 'Забронировать' },
    { url: '/admin/0/0', title: 'Расписание' },
    { url: '/adm_location/0', title: 'Резервации' },
    { url: '/contacts/0', title: 'Контакты' },
  ];
  let navbarLinksSuper = [
    { url: '/book', title: 'Забронировать' },
    { url: '/admin/0/0', title: 'Расписание' },
    { url: '/adm_location/0', title: 'Резервации' },
    { url: '/contacts/0', title: 'Контакты' },
    { url: '/user_screen', title: 'Пользователи' },
  ];
  console.log(session)
  let opt=session?{ url: '/logout', title: 'Выйти' }:{ url: '/login', title: 'Регистрация' }
  navbarLinks.push(opt);
  navbarLinksAdmin.push(opt);
  navbarLinksSuper.push(opt);
  return (
    <div>
      <Head>
        {/* <link
          rel="preload"
          href="/fonts/SourceSansPro-ExtraLight.ttf"
          as="SourceSansPro"
          
        /> */}
      </Head>
      {/* bg-main-bg  */}

      <main id="mainPage" className="h-screen  bg-cover bg-center containerFont text-white relative text-lg overflow-hidden overflow-y-scroll" style={{backgroundImage:"url('/images/fon1.jpg')"}}>
        <Navbar navbarLinks={(session && session.user.status ==="admin")?navbarLinksAdmin:(session && session.user.status ==="super")?navbarLinksSuper:navbarLinks} path={router.asPath} />
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
}
