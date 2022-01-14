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
  console.log(session)
  let opt=session?{ url: '/logout', title: 'Выйти' }:{ url: '/login', title: 'Регистрация' }
  navbarLinks.push(opt);
  navbarLinksAdmin.push(opt);
  return (
    <div>
      <Head>
        {/* <link
          rel="preload"
          href="/fonts/SourceSansPro-ExtraLight.ttf"
          as="SourceSansPro"
          
        /> */}
      </Head>
      <main className="h-screen bg-main-bg containerFont text-white text-lg overflow-hidden overflow-y-scroll">
        <Navbar navbarLinks={(session && session.user.status ==="admin")?navbarLinksAdmin:navbarLinks} />
        {children}
        <Footer />
      </main>
    </div>
  );
}
