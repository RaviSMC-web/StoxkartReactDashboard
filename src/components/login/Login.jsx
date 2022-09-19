import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import "./login.css";
import Stox from "../../pics/stoxkart_old_logo.png";
import axios from "axios";

const LoginMain = ({change, setChange}) => {
  const [error, setError] = useState(false);
  const [wait, setWait] = useState("");

  const URL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const inputHandler = (event) => {
    if (error) {
      setError("");
    }
    setChange(event.target.value);
  };

  const sendOtp = async (event) => {
    try {
      setWait("Please Wait....");
      event.currentTarget.disabled = true;
      await axios.post(`${URL}/Login/sendOTP`, { userCode: change });
      navigate("/verify");
    } catch (error) {
      setError(error.response.data.result.flagMsg);
      setWait("");
    }
  };
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
          <p style={{ fontSize: 12, marginBottom: "12%" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
            voluptatem!
          </p>
          <h3 style={{ fontSize: 24 }}>Client ID</h3>
          <span className="p-input-icon-right" style={{ width: "100%" }}>
            {
              error ? (
                <i className="pi pi-info-circle" style={{ color: "red" }} />
              ) : null
            }
            <InputText
              type="text"
              className="p-inputtext-sm h-5"
              placeholder="Please Enter Your Client ID"
              onChange={inputHandler}
              maxlength="7"
              keyfilter="alphanum"
              value={change.toUpperCase()}
            />
          </span>
          <p style={{ color: "red", fontSize: 12, marginTop: 15 }}>
            {error ? error : null}
          </p>
          <div className="d-grid gap-2">
            <Button
              disabled={change.length != 7}
              style={{
                backgroundColor: "#05BB75",
                border: "none",
                marginTop: "20%",
              }}
              size="md"
              onClick={sendOtp}
            >
              {wait ? wait : "Sent OTP"}
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

export default LoginMain;
