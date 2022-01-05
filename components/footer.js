import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <hr />
      <ul className="navbar_list">
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
              id="instagram"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
            >
              <span className="w-5 h-5">
              <img src={'/icons/instagram.svg'} alt="menu call" />
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
      </ul>
    </footer>
  );
}
