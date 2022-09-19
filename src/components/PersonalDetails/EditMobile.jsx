import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import OTPInput,  { ResendOTP } from "otp-input-react";
import React, { useState } from "react";
import axios from "axios";

const EditMobile = ({ mobile, newMobile, personal, setPersonal }) => {
  const [displayMobile, setDisplayMobile] = useState(false);
  const [position, setPosition] = useState("center");
  const [displayPosition, setDisplayPosition] = useState(false);
  const [account, toggleAccount] = useState("enterMobile");
  const [OTP, setOTP] = useState("");
  const [input, setInput] = useState("");
  const URL = process.env.REACT_APP_BASE_URL;
  const userCode = sessionStorage.getItem("userCode");
  const [error, setError] = useState();
  const [wait, setWait] = useState("");
  const [verify, setVerify] = useState("");
  

  const dialogFuncMap = {
    displayMobile: setDisplayMobile,
    displayPosition: setDisplayPosition,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
      setWait('');
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    toggleAccount("enterMobile");
    setWait('');
    setError('')
    setInput('')
    setOTP('')
    setVerify('')
  };
  const sendOtp = async (event) => {
    try {
      if(input == personal.userMobile){
        setError('Please enter diffrent mobile number');
        return
      }
      setWait("Please Wait....");
      event.currentTarget.disabled = true;
      const response = await axios.post(`${URL}/PersonalDetail/sendMobileOTP`, {
        userCode: userCode,
        userMobile: input,
      });
      toggleAccount("enterOtp");
    } catch (error) {
      setError(error.response.data.result.flagMsg);
      setInput("");
      setWait("");
    }
  };

  const verifyOtp = async (event) => {
    try {
      setVerify('OTP Verifying.....')
      event.currentTarget.disabled = true;
      const responce = await axios.post(`${URL}/PersonalDetail/verifyMobileOTP`, {
        userCode: userCode,
        userOtp: OTP,
        userMobile: input,
      });
      setPersonal({
        ...personal,
        userMobile: input,
      });
       setDisplayMobile(false);
      toggleAccount("enterMobile");
    } catch (error) {
      setError(error.response.data.result.flagMsg)
      setVerify('')
    }
  };

  const resendOtp = async () => {
    try{
      setOTP('');
      setError('')
      await axios.post(`${URL}/PersonalDetail/sendMobileOTP`,{ userCode: userCode,
        userMobile: input, })
    } catch (error) {
      console.log('error in send otp', error);
    }
  };

  const onInputChange = (event) => {
    if(error){
      setError('')
     } 
    setInput(event.target.value);
  };

  return (
    <>
      <div className="p-inputgroup h-5">
        <InputText
          value={
            personal.userMobile ? personal.userMobile : newMobile.userMobile
          }
          disabled
        />
        <span
          style={{cursor: 'pointer'}}
          onClick={() => onClick("displayMobile")}
          className="p-inputgroup-addon"
        >
          <i className="pi pi-pencil"></i>
        </span>
      </div>
      <Dialog
        onHide={() => onHide("displayMobile")}
        header="Edit-Mobile Number"
        visible={displayMobile}
        style={{ width: "325px" }}
      >
        {account === "enterMobile" ? (
          <div className="dialog_wrapper">
            <p className="font-semibold w-10">Registred Mobile Number</p>
            <InputText 
            className="p-inputtext-sm h-5"
            value={personal.userMobile} disabled />
            <p className="font-semibold w-10 mt-3">New Mobile Number</p>
            <span className="p-input-icon-right" style={{ width: "100%" }}>
            {
              error ? (
                <i className="pi pi-info-circle" style={{ color: "red" }} />
              ) : null
              // <i className="pi pi-check-circle" style={{color: 'green'}}/>
            }
            <InputText
            type='text'
              className="p-inputtext-sm h-5"
              placeholder="Please Enter New Mobile Number"
              onChange={onInputChange}
              maxlength="10"
              keyfilter="num"
            />
          </span>
            {error ? (
              <span style={{ color: "red", fontSize: 12, marginTop: 10 }}>
                {error}
              </span>
            ) : null}
            <Button
            disabled={input.length != 10}
              label= {wait ? wait : "Sent OTP"}
              onClick={sendOtp}
              className="p-button-outlined  p-button-sm smc_color"
              style={{
                backgroundColor: "#05BB75",
                color: "#ffffff",
                margin: "40px 0px 10px 0px",
              }}
            />

            <Button
              label="Cancel"
              className="p-button-outlined  p-button-sm smc_color_outline"
              onClick={() => onHide("displayMobile")}
            />
          </div>
        ) : (
          <div className="dialog_wrapper">
            <p className="font-semibold w-10">Registred Mobile Number</p>
            <InputText 
            className="p-inputtext-sm h-5"
            value={mobile} disabled />
            <p className="font-semibold w-10 mt-3">New Mobile Number</p>
            <InputText 
            className="p-inputtext-sm h-5"
            value={input} disabled />
            <h5>Verify OTP</h5>
            <div className={error ? 'otp_wrapper_red' : "otp_wrapper"}>
              <OTPInput
                value={OTP}
                onChange={error ? () => {setError('')} : setOTP}
                OTPLength={6}
                autoFocus
                otpType="number"
                disabled={false}
                placeholder={["-", "-", "-", "-", "-", "-"]}
              />
            </div>
            <div className='resend_btn' style={{display: 'flex'}}>
          <p style={{ fontSize: "12px", marginTop: 20, marginBottom: 20 }}>
            Didn't recieve the OTP?{" "}
          </p>
          <ResendOTP 
          maxTime='20'
          className='resend_btn'
          style={{ fontSize: "12px", margin: '20px 0px 10px 10px', display: 'flex', gap:5 }}
          onResendClick={resendOtp} />
          </div>
          <p style={{color: 'red', fontSize: 12}}>{error ? error : null}</p>
            <Button
            disabled={OTP.length != 6}
              onClick={verifyOtp}
              label={verify ? verify : "Verify OTP"}
              className="p-button-outlined  p-button-sm smc_color"
              style={{
                backgroundColor: "#05BB75",
                color: "#ffffff",
                margin: "20px 0px 10px 0px",
              }}
            />

            <Button
              label="Cancel"
              className="p-button-outlined  p-button-sm smc_color_outline"
              onClick={() => onHide("displayMobile")}
            />
          </div>
        )}
      </Dialog>
    </>
  );
};

export default EditMobile;
