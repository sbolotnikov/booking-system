import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='xs:hidden sticky bottom-0  flex flex-row justify-end items-center z-5'>
      {/* <hr /> */}
      <a
              id="instagram"
              href="https://www.instagram.com/pereulokquest74"
              target="_blank"
              rel="noopener noreferrer"
              title="Мы в Instagram"
              className='flex flex-row justify-center items-center mx-2'
            >
              <span className="w-6 h-6 mr-2">
              <img src={'/icons/instagram.svg'} alt="menu call" />
              </span> <span>pereulokquest74</span>
            </a> 
            <a
              id="vk"
              href="https://vk.com/chexit"
              target="_blank"
              rel="noopener noreferrer"
              title="Мы в vkontakte"
              className='flex flex-row justify-center items-center mx-2'
            >
              <span className="w-6 h-6 mr-2">
              <img src={'/icons/vk_logo.svg'} alt="menu call" />
              </span>
              <span>vk.com/chexit</span>
            </a>
      {/* <ul className="navbar_list">
        <li className="navbar__link">     
            <a
              id="facebook"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Facebook"
            >
              <span className="w-5 h-5">
              <img src={'/icons/facebook.svg'} alt="menu call" />
              </span>
            </a>     
        </li>
        

  
        <li className="navbar__link">
        <a
              id="youtube"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on YouTube"
            >
              <span className="w-5 h-5">
              <img src={'/icons/youtube.svg'} alt="menu call" />
              </span>
            </a> 
        </li>
      </ul> */}
    </footer>
  );
}
