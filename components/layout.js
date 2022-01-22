import Navbar from './navbar';
import Footer from '../components/footer';
import Head from "next/head";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const {data:session, loading} = useSession();
  let navbarLinks = [
    { url: '/about', title: 'Об игре' },
    { url: '/book', title: 'Забронировать' },
    { url: '#', title: 'День Рождения' },
    { url: '#', title: 'Корпоратив' },
    { url: '#', title: 'Сертификат' },,
    { url: '/contacts/0', title: 'Где находится?' },
  ];
  let navbarLinksAdmin = [
    { url: '/book', title: 'Забронировать' },
    { url: '/admin', title: 'Расписание' },
    { url: '/adm_location/0', title: 'Резервации' },
    { url: '/contacts/0', title: 'Где находится?' },
  ];
  let navbarLinksSuper = [
    { url: '/book', title: 'Забронировать' },
    { url: '/admin', title: 'Расписание' },
    { url: '/adm_location/0', title: 'Резервации' },
    { url: '/contacts/0', title: 'Где находится?' },
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
      <main id="mainPage" className="h-screen bg-main-bg containerFont text-white relative text-lg overflow-hidden overflow-y-scroll">
        <Navbar navbarLinks={(session && session.user.status ==="admin")?navbarLinksAdmin:(session && session.user.status ==="super")?navbarLinksSuper:navbarLinks} />
        {children}
        <Footer />
      </main>
    </div>
  );
}
