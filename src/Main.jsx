import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import NavContext from "./Context/NavContext";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import axios from "axios";



function Main({setPersonal , personal}) {
  const [nav, setNav] = useState(false);
  const [msg, setMsg] = useState('')
  const value = { nav, setNav };
  const userCode = sessionStorage.getItem("userCode");
  const URL = process.env.REACT_APP_BASE_URL;

  // const getUserStatus = async () => {
  //   try {
  //  const res =   await axios.post(`${URL}/Application/getStatus`, { userCode: userCode });
  //  console.log(res.data)
  //  if(res.data.result.flag == 1){
  //   setMsg(res.data.data.personalDetailStatus
  //     )
  //  }
  //   } catch (error) {
  //     console.log("error in get status", error);
  //   }
  // };

  // useEffect(()=>{
  //   getUserStatus();
  // },[])
//console.log(msg);
  return (
    <div className="App">
      <NavContext.Provider value={value}>
        <Navbar />
        <Container
          stickyNav={<RightNavbar setPersonal={setPersonal} personal={personal} />}
          content={
            <PersonalDetails setPersonal={setPersonal} personal={personal} />
          }
        />
      </NavContext.Provider>
    </div>
  );
}

export default Main;
