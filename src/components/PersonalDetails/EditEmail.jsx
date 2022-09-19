import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import OTPInput,  { ResendOTP } from "otp-input-react";
import axios from "axios";
import React, { useState } from "react";

const EditEmail = ({ newEmail, personal, setPersonal }) => {
  const [displayEmail, setDisplayEmail] = useState(false);
  const [ setPosition] = useState("center");
  const [ setDisplayPosition] = useState(false);
  const [account, toggleAccount] = useState("enterMobile");
  const [OTP, setOTP] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [wait, setWait] = useState("");
  const [verify, setVerify] = useState("");

  const URL = process.env.REACT_APP_BASE_URL;
  const userCode = sessionStorage.getItem("userCode");

  const dialogFuncMap = {
    displayEmail: setDisplayEmail,
    displayPosition: setDisplayPosition,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    toggleAccount("enterMobile");
    setWait('');
    setError('')
    setInput('')
    setOTP('')
  };

  const sendOtp = async (event) => {
    try {
      setWait("Please Wait....");
      event.currentTarget.disabled = true;
      const response = await axios.post(`${URL}/PersonalDetail/sendEmailOTP`, {
        userCode: userCode,
        userEmail: input,
      });
      toggleAccount("enterOtp");
    } catch (error) {
      setError(error.response.data.result.flagMsg);
      setInput("");
      setWait("");
    }
  };

  const verifyOtp = async () => {
    try {
      if(input == personal.userEmail){
        setError('Please enter diffrent Email Id');
        return
      }
      const responce = await axios.post(`${URL}/PersonalDetail/verifyEmailOTP`, {
        userCode: userCode,
        userOtp: OTP,
        userEmail: input,
      });
      setPersonal({
        ...personal,
        userEmail: input,
      });
      setDisplayEmail(false)
    } catch (error) {
      setError(error.response.data.result.flagMsg)
      setVerify('')
    }
  };
  const resendOtp = async () => {
    try{
      setOTP('');
      setError('')
      await axios.post(`${URL}/PersonalDetail/sendEmailOTP`,{ userCode: userCode,
        userEmail: input, })
    } catch (error) {
      console.log('error in resend otp', error);
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
          value={personal.userEmail ? personal.userEmail : newEmail.userEmail}
          disabled
        />
        <span
        style={{cursor: 'pointer'}}
          onClick={() => onClick("displayEmail")}
          className="p-inputgroup-addon"
        >
          <i className="pi pi-pencil"></i>
        </span>
      </div>

      <Dialog
        onHide={() => onHide("displayEmail")}
        header="Edit-Email Address"
        visible={displayEmail}
        style={{ width: "325px"}}
      >
        {account === "enterMobile" ? (
          <div className="dialog_wrapper">
            <p className="font-semibold w-10">Registred Email Address</p>
            <InputText value={personal.userEmail} disabled />
            <p className="font-semibold w-10 mt-3">New Email Address</p>
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
              placeholder="Please Enter New Email Address"
              onChange={onInputChange}
              keyfilter="email"
            />
          </span>
         {error ? (
              <span style={{ color: "red", fontSize: 12, marginTop: 10 }}>
                {error}
              </span>
            ) : null}
            <Button
              disabled={!input}
              label= {wait ? wait : "Sent OTP"}
              onClick={sendOtp}
              className="p-button-outlined  p-button-sm smc_color"
              style={{
                backgroundColor: "#05BB75",
                color: "#ffffff",
                margin: "28px 0px 10px 0px",
              }}
            />

            <Button
              label="Cancel"
              className="p-button-outlined  p-button-sm smc_color_outline"
              onClick={() => onHide("displayEmail")}
            />
          </div>
        ) : (
          <div className="dialog_wrapper">
            <p className="font-semibold w-10">Registred Email Address</p>
            <InputText disabled/>
            <p className="font-semibold w-10 mt-3">New Email Address</p>
            <InputText value={input} disabled/>
            <h5>Verify OTP</h5>
            <div className={error ? 'otp_wrapper_red' : "otp_wrapper"}>
              <OTPInput
                value={OTP}
                onChange={error ? () => {setError('')} : setOTP}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                placeholder={["-", "-", "-", "-", "-", "-"]}
              />
            </div>
            <div className='resend_btn' style={{display: 'flex'}}>
          <p style={{ fontSize: "12px", marginTop: 20, marginBottom: 20 }}>
            Didn't recieve the OTP?{" "}
            {/* <span style={{ color: "#198754" }}>Resend in 20 sec</span> */}
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
                margin: "28px 0px 10px 0px",
              }}
            />

            <Button
              label="Cancel"
              className="p-button-outlined  p-button-sm smc_color_outline"
              onClick={() => onHide("displayEmail")}
            />
          </div>
        )}
      </Dialog>
    </>
  );
};

export default EditEmail;
