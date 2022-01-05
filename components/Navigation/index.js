import React, { Fragment, useState } from 'react';
import { gsap } from "../../utils/gsap";
import Tilt from 'react-parallax-tilt';
import { Textfit } from 'react-textfit';
import Router from 'next/router';

// import { Link } from 'react-router-dom';

function Navigation(props) {
    const [show, setShow] = useState(true);
    
    function changeMenu() {
        if (show) {
            gsap.timeline()
                .to(".menuContainer", { right: "0%", width: window.innerWidth < 740 ? "100%" : "50%", duration: .4 })
                .fromTo(".link", { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: .6, stagger: .15 });
        } else {
            gsap.timeline()
                .to(".link", { opacity: 0, x: 100, duration: .6, stagger: .15 })
                .to(".menuContainer", { right: window.innerWidth < 740 ? "-100%" : "-50%", duration: .4 }, "-=1")

        }
        setShow(!show)
    }
function handleCall(e){
    let choice=e.target.previousSibling.firstChild.innerHTML;
    if (props.names.indexOf(choice)>-1){
        Router.push(props.links[props.names.indexOf(choice)])
    }
}
    return (
        <Fragment>

            <div className="openMenu" onClick={changeMenu}><svg viewBox="0 0 29 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.00012207 1.5C0.00012207 0.671573 0.671695 0 1.50012 0H27.5001C28.3285 0 29.0001 0.671573 29.0001 1.5C29.0001 2.32843 28.3285 3 27.5001 3H1.50012C0.671695 3 0.00012207 2.32843 0.00012207 1.5Z" fill="#010101" />
                <path d="M0.00012207 7.5C0.00012207 6.67157 0.671695 6 1.50012 6H27.5001C28.3285 6 29.0001 6.67157 29.0001 7.5C29.0001 8.32843 28.3285 9 27.5001 9H1.50012C0.671695 9 0.00012207 8.32843 0.00012207 7.5Z" fill="#010101" />
                <path d="M0.00012207 13.5C0.00012207 12.6716 0.671695 12 1.50012 12H27.5001C28.3285 12 29.0001 12.6716 29.0001 13.5C29.0001 14.3284 28.3285 15 27.5001 15H1.50012C0.671695 15 0.00012207 14.3284 0.00012207 13.5Z" fill="#010101" />
            </svg></div>
            {/* <div className="heroImg"></div> */}

            <div className="menuContainer">
                <div className="closeMenu" style={{ zIndex: 1000 }} onClick={changeMenu} ><svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.06069 1.06066C1.64647 0.474877 2.59622 0.474877 3.18201 1.06066L21.5668 19.4454C22.1526 20.0312 22.1526 20.981 21.5668 21.5668C20.981 22.1525 20.0312 22.1525 19.4455 21.5668L1.06069 3.18198C0.474901 2.5962 0.474901 1.64645 1.06069 1.06066Z" fill="#010101" />
                    <path d="M1.06062 21.5668C0.47483 20.981 0.47483 20.0312 1.06062 19.4454L19.4454 1.06066C20.0312 0.474876 20.9809 0.474876 21.5667 1.06066C22.1525 1.64645 22.1525 2.5962 21.5667 3.18198L3.18194 21.5668C2.59615 22.1525 1.6464 22.1525 1.06062 21.5668Z" fill="#010101" />
                </svg></div>
                <div className="brandLogo">
                    <img src={"/images/logo.jpg"} alt="logo" />
                    {/* <div className="logo">
                   
                        The Studio
                    </div> */}
                </div>
                <div className="menuLinks"  onClick={e=>{handleCall(e)}}>
                {props.names.map((option, i) => {
                            return (       
                                    <Tilt className="link menuLink1" id={`menuIgem_${i}`} glareEnable={true} glareMaxOpacity={0.9} glareColor="lightblue" transitionSpeed={1000} gyroscope={true}
                                    glarePosition="all" scale={1.1 } tiltMaxAngleY={10} tiltMaxAngleX={10} perspective={500}  >
                                       <Textfit mode="single">{option}</Textfit>
                                   </Tilt>                            
                            )
                        }
                        )}
                </div>
                <div className="socialMedia">
                    <div className="link">
                        <a href="#"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                    </div>
                    <div className="link">
                        <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                    </div>
                    <div className="link">
                        <a href="#"><i className="fa fa-youtube-square" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Navigation;