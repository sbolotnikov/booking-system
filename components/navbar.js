import { useState } from 'react';
import Emailform from './emailform';
// import CallIcon from '@mui/icons-material/Call';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
const Navbar = ({ navbarLinks }) => {
  // Determines if the "menu icon" was clicked or not. Note that this icon is only visible when the window width is small.
  const [menuClicked, setMenuClicked] = useState(false);
  const [emailFormVis, setEmailFormVis] = useState(false);
  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <nav className="navbar">
      <span className="navbar__logo">Челябинск</span>

       <ul
        className={
          menuClicked ? 'navbar__list navbar__list--active' : 'navbar__list'
        }
      >
      {menuClicked &&
        <li className="navbar__item" key={'zeroitem'}>
          <a className="navbar__link" onClick={()=>{setMenuClicked(!menuClicked);}} href={'tel:+7(351)220-7549'}>
            <div className="w-4">
              <img src={'/icons/call.svg'} alt="menu call" />
            </div>
            +7 (351) 220-75-49
          </a>
        </li>}
        {navbarLinks.map((item, index) => {
          return (
            <li className="navbar__item" key={index}>
              <a className="navbar__link" onClick={()=>{setMenuClicked(!menuClicked);}} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="navbar__right_span">
        <div className="navbar__menu_grid" >
          <a  href={'tel:+7(351)220-7549'}><img  src={'/icons/call.svg'} alt="menu call" /></a>
        </div>
        <div className="navbar__menu_grid" onClick={()=>{setEmailFormVis(true)}}>
          <img src={'/icons/message.svg'}  alt="menu send email" />
        </div>
        {menuClicked ? (
          <div className="navbar__menu" onClick={toggleMenuClick}>
            <img src={'/icons/close.svg'}   alt="menu close" />
          </div>
        ) : (
          <div className="navbar__menu" onClick={toggleMenuClick}>
            <img src={'/icons/burger.svg'} alt="menu burger" />
          </div>
        )}
      </div>
      {emailFormVis &&<Emailform onChange={(e)=>{setEmailFormVis(false)}}/>}
    </nav>
  );
};

export default Navbar;
