import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Head from "next/head";
const navbarLinks = [
  { url: '/about', title: 'Об игре' },
  { url: '/book', title: 'Забронировать' },
  { url: '#', title: 'День Рождения' },
  { url: '#', title: 'Корпоратив' },
  { url: '#', title: 'Сертификат' },
  { url: '/contacts/0', title: 'Где находится?' },
];
export default function Layout({ children }) {
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
        <Navbar navbarLinks={navbarLinks} />
        {children}
        <Footer />
      </main>
    </div>
  );
}
