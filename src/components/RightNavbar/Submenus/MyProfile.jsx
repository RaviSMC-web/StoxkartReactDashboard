//REACT ROUTER
import { useNavigate } from "react-router-dom";

//HOOKS
import useClickOutside from "../../../CustomHooks/ClickOutside";
import { useState } from "react";

//ICONS , PICS , STYLES
import styles from "./MyProfile.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Avatar } from 'primereact/avatar';
//import { ReactComponent as Avatar } from "../../../pics/avatar.svg";

const MyProfile = ({setPersonal , personal}) => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/')
  }
  const [isProfileOpen, setisProfileOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisProfileOpen(false);
  });
  const auth = sessionStorage.getItem("userCode");
  console.log(auth)
  return (
    <div
      ref={domNode}
      className={styles.avatar_container}
      onClick={() => {
        setisProfileOpen(!isProfileOpen);
      }}
    >
      <Avatar icon="pi pi-user" className="mr-2" size="medium" shape="circle" />
      {/* AVATAR ICON */}
      {/* <div className={styles.icon_avatar_container}>
        <Avatar />
      </div> */}

      {/* NAME */}
      <div className={styles.name}>
        <span>{auth}</span>
        <MdKeyboardArrowDown />
      </div>

      {/* AVATAR/SETTINGS SUBMENU */}
      <div
        className={`${styles.menu} ${isProfileOpen ? styles.menu_active : ""}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>{auth}</span>
          <span className={styles.role}>
            {personal.userFullName}
            </span>
        </div>
        <div className={styles.settings}>
          
          <span style={{color: 'red', cursor: 'pointer', }}onClick={logout}>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
