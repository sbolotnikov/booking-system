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

       <main className="h-screen bg-black overflow-hidden overflow-y-scroll">
       <Navbar navbarLinks={navbarLinks} />
       <div className=" h-screen px-0 my-2 flex flex-col justify-center items-center bg-gray-800">
        {children}
        </div>
        <Footer/>
        </main>

  )
}