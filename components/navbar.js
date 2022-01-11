import { useState } from 'react';
import Emailform from './emailform';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
const Navbar = ({ navbarLinks }) => {
  // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
  const [menuClicked, setMenuClicked] = useState(false);
  const [emailFormVis, setEmailFormVis] = useState(false);
  const { data: session, loading } = useSession();
  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <nav className="navbar">
      <Link className="navbar__link" href={'/'}>
        <span className="navbar__logo">
          <img src={'/images/logo.jpg'} alt="menu call" />
        </span>
      </Link>
      <ul
        className={
          menuClicked ? 'navbar__list navbar__list--active' : 'navbar__list'
        }
      >
        {menuClicked && (
          <li className="navbar__item" key={'zeroitem'}>
            <Link className="navbar__link" href={'tel:+7(351)220-7549'}>
              <a
                onClick={() => {
                  setMenuClicked(!menuClicked);
                }}
              >
                <div className="w-4">
                  <img src={'/icons/call.svg'} alt="menu call" />
                </div>
                +7(351)220-75-49
              </a>
            </Link>
          </li>
        )}
        {navbarLinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <Link className="navbar__link" href={item.url}>
                <a
                  onClick={() => {
                    setMenuClicked(!menuClicked);
                  }}
                >
                  {item.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="navbar__right_span">
        {((session && session.user.status !== 'admin') || !session) && (
          <div className="navbar__menu_grid">
            <Link href={'tel:+7(351)220-7549'}>
              <img className="object-fill" src={'/icons/call.svg'} alt="menu call" />
            </Link>
          </div>
        )}
        {((session && session.user.status !== 'admin') || !session) && (
          <div
            className="navbar__menu_grid"
            onClick={() => {
              setEmailFormVis(true);
            }}
          >
            <img className="object-fill" src={'/icons/message.svg'} alt="menu send email" />
          </div>
        )}
        {session && (
          <div className="navbar__menu_grid  rounded-full overflow-hidden">
            <Link href={'/profile'}>
              <img
                className="object-fill"
                src={
                  session.user.image
                    ? session.user.image
                    : '/icons/defaultUser.svg'
                }
                alt="profile picture"
              />
            </Link>
          </div>
        )}
        {menuClicked ? (
          <div className="navbar__menu" onClick={toggleMenuClick}>
            <img src={'/icons/close.svg'} alt="menu close" />
          </div>
        ) : (
          <div className="navbar__menu" onClick={toggleMenuClick}>
            <img src={'/icons/burger.svg'} alt="menu burger" />
          </div>
        )}
      </div>
      {emailFormVis && (
        <Emailform
          onChange={(e) => {
            setEmailFormVis(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
