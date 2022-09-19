
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Container from "../Container/Container";
import RightNavbar from "../RightNavbar/RightNavbar";


import NavContext from "../../Context/NavContext";

import PersonalDetails from "../PersonalDetails/PersonalDetails";
import PermanentAddress from "../Permanent Address/PermanentAddress";
import Esign from "../Esign/Esign";


function Sign ({ setPersonal, personal }) {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };

  return (
    <div className="App">
      <NavContext.Provider value={value}>
        <Navbar />
        <Container
          stickyNav={<RightNavbar setPersonal={setPersonal} personal={personal} />}
          content={
            <Esign setPersonal={setPersonal} personal={personal}/>
          }
        />
      </NavContext.Provider>
    </div>
  );
}

export default Sign;
