import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {DigiLocker} from "../digilocker"
import { useEffect } from "react";
import { Dialog } from "primereact/dialog";




const PermanentAddress = () => {
  const userCode = sessionStorage.getItem("userCode");
  const [address, setAddress] = useState("");
  const [stores, setStores] = useState([]);
  const [error, setError] = useState("");
  const [digiRequest, setDigiRequest] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.post(`${URL}/Address/getDetails`, {
        userCode: userCode,
      });
      setAddress(response.data.data);
      
    } catch (error) {
      console.log("error in get data", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

 
  // var digilocker = new DigiLocker("options");
  // digilocker.initdg();
  // digilocker.submitdg("param1", "param2", "param3");


  const handleData = async () => {
    try {
      const response = await axios.post(`${URL}/Address/reqestDigilocker`, {
        userCode: userCode,
      });
      setDigiRequest(response.data.data)

    } catch (error) {
      console.log('error in digio api', error);
    }
  }
  console.log(digiRequest);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BASE_URL;

  const onSubmitAddress = async () => {
    try {
      await axios.post(`${URL}/Address/saveDetails`, {
        userCode: userCode,
        userAddressL1: address.userAddressL1,
        userAddressL2: address.userAddressL2,
        userAddressL3: address.userAddressL3,
        userCity: address.userCity,
        userState: address.userState,
        userPincode: address.userPincode,
        userDetailsChange: true,
      });
      setShowMessage(true);
    } catch (error) {
      setError(error.response.data.result.flagMsg);
    }
  };

  const closePopUp = () => {
    setShowMessage(false);
    navigate("/segment");
  
   }
   const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-raised p-button-sm smc_color" autoFocus onClick={closePopUp} /></div>;

  return (
    <>
    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3 ">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5 className="c_pop">Details Saved Successfully!</h5>
                    
                </div>
            </Dialog>
      <div className="personal">
        <div className="line">
          <h2>Permanent Address</h2>
          <hr />
        </div>
        <div className="right_panel1">
          <div style={{ width: "100%" }}>
            <div class="field grid">
              <label for="line-1" style={{ width: 75 }}>
                Line 1: <sup>*</sup>
              </label>
              <div class="col">
                <InputText
                  value={address.userAddressL1}
                  name="userAddressL1"
                  className="p-inputtext-sm h-5"
                  disabled
                />
              </div>
            </div>
            <div class="field grid">
              <label for="line-3" style={{ width: 75 }}>
                Line 3: 
              </label>
              <div class="col">
                <InputText
                  value={address.userAddressL3}
                  name="userAddressL3"
                  className="p-inputtext-sm h-5"
                  disabled
                />
              </div>
            </div>
            <div class="field grid">
              <label for="pincode" style={{ width: 75 }}>
                Pincode: <sup>*</sup>
              </label>
              <div class="col">
                <InputText
                  value={address.userPincode}
                  name="userPincode"
                  className="p-inputtext-sm h-5"
                  disabled
                />
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div class="field grid">
              <label for="line-2" style={{ width: 75 }}>
                Line 2: 
              </label>
              <div class="col">
                <InputText
                  value={address.userAddressL2}
                  name="userAddressL2"
                  className="p-inputtext-sm h-5"
                  disabled
                />
              </div>
            </div>
            <div class="field grid">
              <label for="firstname3" style={{ width: 75 }}>
                City: <sup>*</sup>
              </label>
              <div class="col">
                <InputText
                  value={address.userCity}
                  name="userCity"
                  className="p-inputtext-sm h-5"
                  disabled
                />
              </div>
            </div>
            <div class="field grid">
              <label for="lastname3" style={{ width: 75 }}>
                State: <sup>*</sup>
              </label>
              <div class="col">
                <InputText
                  value={address.userState}
                  name="userState"
                  className="p-inputtext-sm h-5"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style={{ color: "red", fontSize: 12 }}>{error ? error : null}</p>
          <Button
            onClick={onSubmitAddress}
            label="Proceed with Same Details"
            className="p-button-raised mr-3 p-button-sm smc_color mw-3"
          />

          <Button
            // onClick={handleData}
            label="Update Details As Per Aadhar"
            className="p-button-outlined  p-button-sm smc_color_outline mw-3"
          />
            {/* <Button
            onClick={digilocker()}
            label="Esign"
            className="p-button-outlined  p-button-sm smc_color_outline mw-3"
          /> */}
        </div>
      </div>
    </>
  );
};

export default PermanentAddress;
