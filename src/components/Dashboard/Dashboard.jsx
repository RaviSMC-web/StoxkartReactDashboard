
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Container from "../Container/Container";
import RightNavbar from "../RightNavbar/RightNavbar";
import NavContext from "../../Context/NavContext";
import PermanentAddress from "../Permanent Address/PermanentAddress";


function Dashboard ({setPersonal, personal}) {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };

  return (
    <div className="App">
      <NavContext.Provider value={value}>
        <Navbar />
        <Container
          stickyNav={<RightNavbar setPersonal={setPersonal} personal={personal} />}
          content={
            <PermanentAddress setPersonal={setPersonal} personal={personal} />
          }
        />
      </NavContext.Provider>
    </div>
  );
}

export default Dashboard;
