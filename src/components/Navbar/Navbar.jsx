//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext } from "react";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import { NavLink } from "react-router-dom";

//ICONS
 import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import {  IoPersonOutline} from "react-icons/io5"
import {RiLoader4Fill} from "react-icons/ri"
import Locate from "../../pics/location.svg"
import Document from "../../pics/document.svg"
import Dots from "../../pics/dots.svg";
import Pen from "../../pics/pen.svg";
//import Stox from "../../pics/stoxkart.svg";
import Stox from '../../pics/stoxkart_old_logo.png'


const NavUrl = ({ url, icon, description }) => {
  const { nav, setNav } = useContext(NavContext);
  const checkWindowSize = () => {
    if (window.innerWidth < 1024) setNav(!nav);
  };

  return (
    <li className={styles.li_navlink}>
      <NavLink
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={() => checkWindowSize()}
      >
        {icon}
        <span className={styles.description}>{description}</span>
      </NavLink>
    </li>
  );
};

const Navbar = ({msg}) => {
  const { nav, setNav } = useContext(NavContext);
  const statusIcon = <i className="pi pi-spin pi-spinner" style={{fontSize: '2em', color: 'black'}} />;

  return (
    <div
      className={`${styles.navbar_container} ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav className={nav ? undefined :  undefined }>
        <div className={styles.logo}>
          <img src={Stox} alt="logo" className={styles.logo_icon} style={{ width: '85%'}}/>
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={styles.menu_container}>
          {/* FIRST CATEGORY */}

          <NavUrl
            url="/main"
            icon={<IoPersonOutline />}
    
            description={`Personal Details `}
             img={<RiLoader4Fill/>}
    
          />
          <NavUrl
            url="/permanent"
            icon={<img src={Locate} />}
            description="Permanent Address"
          />
          <NavUrl
            url="/segment"
            icon={<img src={Document} />}
            description="Segment Details"
          />
          <NavUrl url="/other" icon={<img src={Dots} />} description="Other Details" />

          <NavUrl
            url="/esign"
            icon={<img src={Pen}/>}
            description="Esign"
          />
        </ul>

        <div className={styles.copyright}>
<h6>© 2021 Stoxkart</h6>
<p>Lorem ipsum dolor sit amet, consectetur
adipiscing elit ut aliquam, purus sit amet</p>
        </div>

        {/* LOGOUT BUTTON */}
      
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  );
};

export default Navbar;
