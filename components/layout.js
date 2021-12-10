import Navbar from '../components/navbar'
import Footer from '../components/footer'
const navbarLinks = [
    { url: "#", title: "Об игре" },
    { url: "#", title: "Забронировать" },
    { url: "#", title: "День Рождения" },
    { url: "#", title: "Корпоратив" },
    { url: "#", title: "Сертификат" },
    { url: "#", title: "Где находится?" },
  ];
export default function Layout ({children}) {
    
  return (

       <main className="h-screen bg-[#0c1118] text-white overflow-hidden overflow-y-scroll">
       <Navbar navbarLinks={navbarLinks} />
        {children}
        <Footer/>
        </main>

  )
}