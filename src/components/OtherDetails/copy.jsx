import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtherDetails = ({ personal, setPersonal }) => {
  const userCode = sessionStorage.getItem("userCode");
  const [check, setCheck] = useState(false)
  const initialValue = {
    userCode: userCode,
    fatherName: "",
    motherName: "",
    incomeSlab: "",
    netWorth: "",
    isPoliticallyExposed: false,
    isIndianCitizen: false,
    isAcceptTnC: false,
    isDetailsChange: true
  }
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BASE_URL;
  
  const [otherDetails, setOtherDetails] = useState('')
  const [otherData, setOtherData] = useState(initialValue)
  const [error, setError] = useState("");

  const onValueChange = (e) => {
    setOtherData({ ...otherData, [e.target.name]: e.target.value });
  };
  const onSubmitOthers = async () => {
    try {
      await axios.post(`${URL}/OtherDetail/saveDetails`, otherData);
      // setShowMessage(true);
    } catch (error) {
      setError(error.response.data.result.flagMsg);
    }
  };
  const getUserData = async () => {
    try {
      const response = await axios.post(`${URL}/OtherDetail/getDetails`, {
        userCode: userCode,
      });
      setOtherDetails(response.data.data);
    } catch (error) {
      console.log("error in get data", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="personal">
        <div className="line">
          <h2>Parent’s Details </h2>
          <hr />
        </div>
        <div className="right_panel1">
          <div class="field grid" style={{width:'100%'}}>
            <label for="firstname3" class="col-fixed_big">
              Father's name:
            </label>
            <div class="col">
              <InputText 
              value={otherDetails.fatherName}
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
              value={otherDetails.motherName}
              onChange={(e) => onValueChange(e)}
              className="p-inputtext-sm h-5" />
            </div>
          </div>
        </div>
        <div className="details">
          <div className="line">
            <h2>Other Details </h2>
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
              value={otherDetails.incomeSlab}
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
              value={otherDetails.netWorth}
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
                onChange={(e)=> {setCheck(e.target.checked)}}
                checked={check}
                
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
                onChange={(e)=> {setCheck(e.target.checked)}}
                checked={check}
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
                onChange={(e)=> {setCheck(e.target.checked)}}
                checked={check}
                style={{ width: "20px", height: "20px" }}
              />
              <label for="styled-checkbox-3">Accept Terms & Conditions</label>
            </li>
          </ul>
        </div>
        <div className="btn_group">
          <Button
          onClick={onSubmitOthers}
            label="Proceed with Same Details"
            className="p-button-raised mr-3 p-button-sm smc_color"
          />

          <Button
           onClick={() => {navigate('/esign')}}
            label="Update Details"
            className="p-button-outlined  p-button-sm smc_color_outline"
          />
        </div>
      </div>
    </>
  );
};

export default OtherDetails;
