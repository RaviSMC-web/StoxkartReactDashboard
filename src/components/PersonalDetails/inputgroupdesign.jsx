import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./personaldetails.css";
import "primeflex/primeflex.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditMobile from "./EditMobile";
import EditEmail from "./EditEmail";
import { Dialog } from "primereact/dialog";

const PersonalDetails = ({ setPersonal, personal,msg }) => {
  const [newMobile, setNewMobile] = useState({});
  const [newEmail, setNewEmail] = useState([]);
  
  //const [maritalStatus, setMaritalStatus] = useState('');
  const [DOB, setDOB] = useState("");
  const [error, setError] = useState("");
  const [update, setUpdate] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const selectGender = [
    { label: "Select Your Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Transgender", value: "Transgender" },
  ];

  const selectMaritalStatus = [
    { label: "Select Your Marital Status", value: "" },
    { label: "Married", value: "Married" },
    { label: "Single", value: "Single" },
  ];

  const initialValue = {
    gender: "",
    maritalStatus: "",
  } 
  const [user, setUser] = useState(initialValue);
  const { gender, maritalStatus } = user;
  const navigate = useNavigate();
  const userCode = sessionStorage.getItem("userCode");
  const URL = process.env.REACT_APP_BASE_URL;

  const getUserData = async () => {
    try {
      const response = await axios.post(`${URL}/PersonalDetail/getDetails`, {
        userCode: userCode,
      });
      setPersonal(response.data.data);
    } catch (error) {
      console.log("error in get data", error);
    }
  };

  const savetUserData = async (event) => {
    try {
      await axios.post(`${URL}/PersonalDetail/saveDetails`, {
        userCode: personal.userCode,
        userFullName: personal.userFullName,
        userDOB: personal.userDOB ? personal.userDOB : DOB,
        userPAN: personal.userPAN,
        userGender: gender ? gender : personal.userGender,
        userMaritalStatus: maritalStatus ? maritalStatus : personal.userMaritalStatus,
        userMobile: personal.userMobile,
        userEmail: personal.userEmail,
      });
      setShowMessage(true)
      setUpdate("");
    } catch (error) {
      setError(error.response.data.result.flagMsg);
    
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

 const closePopUp = () => {
  setShowMessage(false);
  navigate("/permanent");

 }

 const onValueChange = (e) => {
  setUser({...user, [e.target.name]: e.target.value})
  setUpdate("Proceed With Updated Details");
} 

//console.log(user);

  // const changeMaritalStatus = (event) => {
  //   setMaritalStatus(event.target.value);
  //   setError('');
  //   setUpdate("Proceed With Updated Details");
  // };

  // const changeGender = (event) => {
  //   setGender(event.target.value);
  //   setError('');
  //   setUpdate("Proceed With Updated Details");
  // };
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
          <h2>Personal Details </h2>
          <hr />
        </div>
        <div className="right_panel1">
          <div className="input_wrapper_main">
            <div class="field grid">
              {/* <label for="Client-id" class="col-fixed" style={{ width: 100 }}>
                Client id:<sup>*</sup>
              </label> */}
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-key"></i>
                            </span>
                            <InputText 
                            className="p-inputtext-sm h-5"
                            placeholder="Client id" />
                        </div>
                {/* <InputText
                  className="p-inputtext-sm h-5"
                  value={personal.userCode}
                  disabled
                /> */}
              </div>
            </div>
            <div class="field grid">
              {/* <label for="pan" class="col-fixed" style={{ width: 100 }}>
                PAN:<sup>*</sup>{" "}
              </label> */}
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-credit-card "></i>
                            </span>
                            <InputText 
                             className="p-inputtext-sm h-5"
                            placeholder="PAN" />
                        </div>
                {/* <InputText
                  className="p-inputtext-sm h-5"
                  value={personal.userPAN}
                  disabled
                /> */}
              </div>
            </div>
            <div class="field grid" 
            // style={{ marginTop: 25 }}
            >
              {/* <label for="Marital-Status" class="col-fixed">
                Marital Status:<sup>*</sup>{" "}
              </label> */}
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-check-circle"></i>
                            </span>
                            {/* <InputText 
                             className="p-inputtext-sm h-5"
                            placeholder="PAN" /> */}
                            <Dropdown
                  className={
  
                    error =="User Marital Status can't be blank."
                    ? "p-inputtext-sm p-invalid h-5" :  "p-inputtext-sm h-5"
                  }
                  value={
                    maritalStatus ? maritalStatus : personal.userMaritalStatus
                  }
                  name="maritalStatus"
                  options={selectMaritalStatus}
                  onChange={(e) => onValueChange(e)}
                  placeholder='Select Your Marital Status'
                />
                        </div>
                
              </div>
            </div>
            <div className="field grid sizes">
              {/* <label for="Mobile" class="col-fixed" style={{ width: 100 }}>
                Mobile:<sup>*</sup>{" "}
              </label> */}
              <div class="col">
                <EditMobile
                  newMobile={newMobile}
                  personal={personal}
                  setPersonal={setPersonal}
                />
              </div>
            </div>
          </div>
          <div className="input_wrapper_main">
            <div class="field grid">
              {/* <label for="Name" class="col-fixed" style={{ width: 100 }}>
                Name:<sup>*</sup>
              </label> */}
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-user "></i>
                            </span>
                            <InputText
                            placeholder="Name"
                  className="p-inputtext-sm h-5"
                  value={personal.userFullName}
                  disabled
                />
                        </div>
                
              </div>
            </div>
            <div class="field grid">
              {/* <label for="DOB" class="col-fixed" style={{ width: 100 }}>
                DOB:<sup>*</sup>
              </label> */}
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-calendar "></i>
                            </span>
                            <Calendar
                  className="h-5"
                  dateFormat="dd/mm/yy"
                  value={DOB}
                  onChange={(e) => setDOB(e.value)}
                  placeholder={personal.userDOB ? personal.userDOB : 'DOB'}
                  disabled
                />
                        </div>
                
              </div>
            </div>
            <div class="field grid" 
            // style={{ marginTop: 25 }}
            >
              {/* <label for="Gender" class="col-fixed" style={{ width: 100 }}>
                Gender:<sup>*</sup>{" "}
              </label> */}
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/gender.png"/>
                                {/* <i className="pi pi-user "></i> */}
                            </span>
                            <Dropdown
                  //  className='p-inputtext-sm h-5'
                  className={
                  error == "User Gender can't be blank."
                  ? "p-inputtext-sm p-invalid h-5" : "p-inputtext-sm p-valid h-5"
                  }
                  name='gender'
                  placeholder="Select Your Gender"
                  value={gender ? gender : personal.userGender}
                  options={selectGender}
                  onChange={(e) => onValueChange(e)}
                  disabled={personal.userGender}
                />
                        </div>
                
              </div>
            </div>
            <div className="field grid">
              {/* <label for="Email" class="col-fixed" style={{ width: 100 }}>
                Email:<sup>*</sup>{" "}
              </label> */}
              <div class="col">
                <EditEmail
                  personal={personal}
                  setPersonal={setPersonal}
                  newEmail={newEmail}
                  setNewEmail={setNewEmail}
                />
              </div>
            </div>
          </div>
          <div className="input_wrapper_main">
            <div class="field grid">
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-user "></i>
                            </span>
                            <InputText
                            placeholder="Father's Name"
                  className="p-inputtext-sm h-5"
                  // value={personal.userFullName}
                  disabled
                />
                        </div>
              </div>
            </div>
            <div class="field grid">
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-user "></i>
                            </span>
                            <InputText
                            placeholder="Mother's Name"
                  className="p-inputtext-sm h-5"
                  // value={personal.userFullName}
                  disabled
                />
                        </div>
              </div>
            </div>
            <div class="field grid">
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-wallet "></i>
                            </span>
                            <InputText
                            placeholder="Income Slab"
                  className="p-inputtext-sm h-5"
                  // value={personal.userFullName}
                  disabled
                />
                        </div>
              </div>
            </div>
            <div class="field grid">
              <div class="col">
              <div className="p-inputgroup">
                            <span className="p-inputgroup-addon input_holder">
                                <i className="pi pi-dollar "></i>
                            </span>
                            <InputText
                            placeholder="Networth"
                  className="p-inputtext-sm h-5"
                  // value={personal.userFullName}
                  disabled
                />
                        </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: "red", fontSize: 12 }}>{error ? error : null}</p>
        <Button
        disabled={user.maritalStatus == ''}
          style={{ fontFamily: "Plus Jakarta Sans", fontWeight: "100" }}
          onClick={savetUserData}
          label={update ? update : "Proceed with Same Details"}
          className="p-button-raised mr-3 mt-3 p-button-sm smc_color"
        />
      </div>
      {/* <p style={{color: "#198754"}}>{msg}</p> */}
    </>
  );
};

export default PersonalDetails;
