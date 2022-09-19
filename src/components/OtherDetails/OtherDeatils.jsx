import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtherDetails = ({ personal, setPersonal }) => {
  const navigate = useNavigate();
  const userCode = sessionStorage.getItem("userCode");
  const URL = process.env.REACT_APP_BASE_URL;
  const [update, setUpdate] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const initialValue = {
    userCode: userCode,
    fatherName: "",
    motherName: "",
    incomeSlab: "",
    netWorth: "",
  }

  const initialCheck = {
    isPoliticallyExposed: false,
    isIndianCitizen: false,
    isAcceptTnC: false,
    isDetailsChange: false,
    
  }
  const [user, setUser] = useState(initialValue);
  const [check, setCheck] = useState(initialCheck);

  const {isPoliticallyExposed, 
    isIndianCitizen, 
    isAcceptTnC,isDetailsChange} = check;
  
  const [error, setError] = useState("");
  const { 
    fatherName, 
    motherName, 
    incomeSlab, 
    netWorth, 
    } = user;

  const getUserData = async () => {
    try {
      const response = await axios.post(`${URL}/OtherDetail/getDetails`, {
        userCode: userCode,
      });
      setUser(response.data.data);
      setCheck(response.data.data);
    } catch (error) {
      console.log("error in get data", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onSubmitOthers = async () => {
    try {
      
      
      await axios.post(`${URL}/OtherDetail/saveDetails`, check);
      setShowMessage(true);
    } catch (error) {
      setError(error.response.data.result.flagMsg);
    }
  };

  const onValueChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
    setUpdate("Proceed With Updated Details");
} 

const onValueCheck = (e) => {
  setCheck({...check, [e.target.name]: e.target.checked})
  setUpdate("Proceed With Updated Details");
} 

const closePopUp = () => {
  setShowMessage(false);
  navigate("/esign");

 }
 const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-raised p-button-sm smc_color" autoFocus onClick={closePopUp} /></div>;


console.log(check);
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
          <h2 style={{marginTop: '-1rem'}}>Parent’s Details </h2>
          <hr />
        </div>
        <div className="right_panel1" >
          <div class="field grid" style={{width:'100%'}}>
            <label for="firstname3" class="col-fixed_big">
              Father's name:
            </label>
            <div class="col">
              <InputText 
              value={fatherName}
              name="fatherName"
              onChange={(e) => onValueChange(e)}
              className="p-inputtext-sm h-5" />
            </div>
          </div>
          <div class="field grid" style={{width:'100%'}}>
            <label for="lastname3" class="col-fixed_big" >
              Mother's name:{" "}
            </label>
            <div class="col">
              <InputText 
              name="motherName"
              value={motherName}
              onChange={(e) => onValueChange(e)}
              className="p-inputtext-sm h-5" />
            </div>
          </div>
        </div>
        <div className="details">
          <div className="line">
            <h2 style={{marginTop: '-1.5rem'}}>Other Details </h2>
            <hr />
          </div>
        </div>
        <div className="right_panel1">
          <div class="field grid" style={{width:'100%'}}>
            <label for="firstname3" class="col-fixed_big" >
              Income Slab:
            </label>
            <div class="col">
              <InputText 
              value={incomeSlab}
              name="incomeSlab"
              onChange={(e) => onValueChange(e)}
              className="p-inputtext-sm h-5" />
            </div>
          </div>
          <div class="field grid" style={{width:'100%'}}>
            <label for="lastname3" class="col-fixed_big" >
              Networth<span style={{fontSize: 11}}> &nbsp;(optional)</span>
            </label>
            <div class="col">
              <InputText 
              value={netWorth}
              name="netWorth"
              onChange={(e) => onValueChange(e)}
              className="p-inputtext-sm h-5" />
            </div>
          </div>
        </div>
        <div className="other_details_parent">
          <ul class="unstyled centered">
            <li>
              <input
                className="styled-checkbox"
                id="styled-checkbox-1"
                type="checkbox"
                name="isPoliticallyExposed"
                checked={isPoliticallyExposed}
                value={isPoliticallyExposed}
                onChange={(e) => onValueCheck(e)}
                style={{ width: "20px", height: "20px" }}
              />
              <label for="styled-checkbox-1">
                I am not a PEP ( politically Exposed person) or related to PEP.
              </label>
            </li>
            <li>
              <input
                className="styled-checkbox"
                id="styled-checkbox-2"
                type="checkbox"
                name="isIndianCitizen"
                checked={isIndianCitizen}
                value={isIndianCitizen}
                onChange={(e) => onValueCheck(e)}
                style={{ width: "20px", height: "20px" }}
              />
              <label for="styled-checkbox-2">
                I am an Indian citizen, bom and residing in India.
              </label>
            </li>
            <li>
              <input
                className="styled-checkbox"
                id="styled-checkbox-3"
                type="checkbox"
                name="isAcceptTnC"
                checked={isAcceptTnC}
                value={isAcceptTnC}
                onChange={(e) => onValueCheck(e)}
                style={{ width: "20px", height: "20px" }}
              />
              <label for="styled-checkbox-3">Accept Terms & Conditions</label>
            </li>
          </ul>
        </div>
        {error ? (
              <span style={{ color: "red", fontSize: 12, marginTop: 10 }}>
                {error}
              </span>
            ) : null}
        <div className="btn_group">
          <Button
          disabled={fatherName.length == 0 || motherName.length == 0
            || incomeSlab.length == 0 || isPoliticallyExposed == false 
            || isAcceptTnC == false || isIndianCitizen == false 
            }
          onClick={onSubmitOthers}
          label={update ? update : "Proceed with Same Details"}
            className="p-button-raised mr-3 p-button-sm smc_color"
          />

        </div>
      </div>
    </>
  );
};

export default OtherDetails;
