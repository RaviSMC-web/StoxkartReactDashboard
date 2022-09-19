import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stox from "../../pics/stoxkart_old_logo.png";

const VerifyLogin = ({change}) => {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const [verify, setVerify] = useState("");
  const [isAuth, setAuth] = useState(sessionStorage.getItem("userCode"))

  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BASE_URL;
  
  const sendOtp = async () => {
    try {
      setOTP("");
      await axios.post(`${URL}/Login/sendOTP`, { userCode: change });
    } catch (error) {
      console.log("error in send otp", error);
    }
  };

  const verifyOtp = async (event) => {
    try {
      setVerify("OTP Verifying.....");
      event.currentTarget.disabled = true;
      await axios.post(`${URL}/Login/verifyOTP`, {
        userCode: change,
        userOtp: OTP,
      });
      sessionStorage.setItem("userCode", change);
      navigate("/main");
    } catch (error) {
      console.log(error);
      //setError(error.response.data.result.flagMsg);
      setVerify("");
    }
  };

  useEffect(() => {
    console.log(isAuth);
    if(isAuth) {
      navigate("/main");
    }
  }, [])

  return (
    <>
      <Stack direction="horizontal">
        <div className="left_panel1">
          <img
            src="/assets/Left part.png"
            alt="left_pan_img"
            style={{ width: "45vw", height: "100vh" }}
          />
        </div>
        <div className="right_panel">
          <div className="img_logo">
            <img
              src={Stox}
              alt="/"
              style={{ width: 330, margin: "20px 20px 20px auto" }}
            />
          </div>
          <h1>Hello Again</h1>
          <p style={{ fontSize: 10 }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
            voluptatem!
          </p>
          <h3>Verify OTP</h3>
          <p style={{ fontSize: 12 }}>Enter the OTP Here </p>
          <div className={error ? "otp_wrapper_red" : "otp_wrapper"}>
            <OTPInput
              value={OTP}
              onChange={
                error
                  ? () => {
                      setError("");
                    }
                  : setOTP
              }
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              placeholder={["-", "-", "-", "-", "-", "-"]}
            />
          </div>
          <div className="resend_btn" style={{ display: "flex" }}>
            <p style={{ fontSize: "12px", marginTop: 20, marginBottom: 20 }}>
              Didn't recieve the OTP?{" "}
            </p>
            <ResendOTP
              maxTime="20"
              className="resend_btn"
              style={{
                fontSize: "12px",
                margin: "20px 0px 10px 10px",
                display: "flex",
                gap: 5,
              }}
              onResendClick={sendOtp}
            />
          </div>
          <p style={{ color: "red", fontSize: 12 }}>{error ? error : null}</p>
          <div className="d-grid gap-2 mt-4">
            <Button
              disabled={OTP.length != 6}
              style={{ backgroundColor: "#05BB75", border: "none" }}
              size="md"
              onClick={verifyOtp}
            >
              {verify ? verify : "Verify OTP"}
            </Button>
          </div>
        </div>
      </Stack>
      {/* <div className="left_text">
        <p className="img_text">
          <b style={{ color: "#222448" }}>Connecting is more than giving</b>{" "}
          advice
        </p>
        <p style={{ color: "#ffffff" }}>
          I just want to protect them,even if I have to go through any kind of
          suffering
        </p>
      </div> */}
    </>
  );
};

export default VerifyLogin;
