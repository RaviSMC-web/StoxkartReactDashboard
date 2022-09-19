//STYLES
import styles from "./RightNavbar.module.scss";

//HOOKS
import { useContext, useEffect } from "react";

//CONTEXT
import NavContext from "../../Context/NavContext";

//ICONS , IMAGES
import { MdOutlineMenu } from "react-icons/md";

//Components
import MyProfile from "./Submenus/MyProfile";

 import moment from "moment";
//import Moment from 'react-moment';

const RightNavbar = ({setPersonal , personal}) => {
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {}, []);

  let Date = moment().format("DD MMM,yyyy");
  let weekDay = moment(Date).format('dddd')+', ';
  //const dateToFormat = '1976-04-19T12:59-0500';

  return (
    <>
      <div className={styles.burger_top}></div>
      <div className={styles.container}>
       
        <div
          className={styles.burger_container}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <MdOutlineMenu />
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
        
         {weekDay}{Date} 
        </div>

        {/* My Profile */}
        <MyProfile setPersonal={setPersonal} personal={personal}/>
      </div>
    </>
  );
};

export default RightNavbar;
