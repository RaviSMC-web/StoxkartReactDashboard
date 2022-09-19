import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import VerifyLogin from "./components/login/VerifyLogin";
import Main from "./Main";
import Dashboard from "./components/Dashboard/Dashboard";
import Segment from "./components/Segment/Segment";
import Other from "./components/other/Other";
import Sign from "./components/Sign/Sign";
import FormExample from "./components/login/Login";

const App = () => {
  const [change, setChange] = useState("");
  const [personal, setPersonal] = useState([]);


  return (
    <>
      <Routes>
  
   <>
   <Route path="/" element={<FormExample change={change} setChange={setChange} />} />
   <Route path="*" element={<main>NOT FOUND</main>} />
   <Route path="/verify" element={<VerifyLogin change={change} />} />
   </>
     
   <>
   <Route
        path="/main"
        element={<Main setPersonal={setPersonal} personal={personal} />}
      />
      <Route
        path="/permanent"
        element={
          <Dashboard setPersonal={setPersonal} personal={personal} /> 
        }
      />
      <Route
        path="/segment"
        element={
          <Segment setPersonal={setPersonal} personal={personal} />
        }
      />
      <Route
        path="/other"
        element={<Other setPersonal={setPersonal} personal={personal} />}
      />
      <Route
        path="/esign"
        element={<Sign setPersonal={setPersonal} personal={personal} />}
      />
   </>
  
   </Routes>
    </>
  );
};

export default App;
