import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import SegmentProof from "./SegmentProof";
//import SignatureProof from "./SignatureProof";
import axios from "axios";
import { Dialog } from "primereact/dialog";

const SegmentDetails = ({ setPersonal, personal }) => {
  const userCode = sessionStorage.getItem("userCode");
  const URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [docType, setDockType] = useState("");
  const [segmentFile, setSegmentFile] = useState('')
  const [signFile, setSignFile] = useState('')
  const [check, setCheck] = useState(false)
  const [segment, setSegment] = useState('')
  const [error, setError] = useState("");
  const [segError, setSegError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const documentType = [
    {
      label: "Last 6 months Bank Statement",
      value: "LAST-SIX-MONTS-BANK-STATEMENT",
    },
    { label: "Latest Salary Slip", 
      value: "LATEST-SALARY-SLIP" 
    },
    {
      label: "Latest ITR Acknowledgement",
      value: "LATEST-ITR-ACKNOWLEDGE",
    },
  ];

  const getSegmentData = async () => {
    try {
      const response = await axios.post(`${URL}/SegmentDetail/getSegmentDetails`, {
        userCode: userCode,
      });
      setSegment(response.data.data);
    } catch (error) {
      console.log("error in segment data", error);
    }
  };

  useEffect(() => {
    getSegmentData();
  }, []);

  const segmentSubmit = (event) => {
    setShowMessage(true);
  }

  const onValueChange = (e) => {
setDockType(e.target.value);
setSegError('')
  }

  const closePopUp = () => {
    setShowMessage(false);
    navigate("/other");
  
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
      <div className="personal_1" >
      <div className="line">
      <h2 
      // style={{marginTop: '-1rem'}}
      >Segment Updation</h2>
          <hr />
        </div>
          
        <div className="mobile"
        //  style={{marginTop: '-13px'}}
         >
          <div className="mobile_form_1">
            <label>Document Type</label>
            <Dropdown
              className={segError ? "p-inputtext-sm p-invalid" : "p-inputtext-sm"}
              value={docType}
              options={documentType}
              placeholder="Select Document Type"
              onChange={onValueChange}
            />
{segError ? <span style={{ color: "red", fontSize: 12,marginTop: '-25px' }}>{segError}</span> : null}
            <label 
            // style={{ marginTop: "-0.8em" }}
            >
              Segment Proof{" "}
              <span className="act">(only pdf)</span>
            </label>
            <SegmentProof setSegmentFile={setSegmentFile} segmentFile={segmentFile} docType={docType} setSegError={setSegError}/>
            {/* <label style={{ marginTop: "-1rem" }}>
              Signature <span className="act">(only jpg,jpeg &png)</span>
            </label>
        <SignatureProof setSignFile={setSignFile} signFile={signFile} setSegError={setSegError} docType={docType} /> */}
            <div className="check_segmenet">
              <div className="check">
              <input
                className="styled-checkbox"
                id="styled-checkbox-1"
                type="checkbox"
                onChange={(e) => {setCheck(e.target.checked)}}
                checked={check}
                style={{ width: "20px", height: "20px" }}
              />
                <span className="activate">
                  I want to activate Future option
                </span>
              </div>
            </div>
          </div>

          <Button
          disabled={docType.length == '' || segmentFile.length == '' || check == false }
            label="Confirm"
            onClick={segmentSubmit}
            className="p-button-raised mr-3 p-button-sm smc_color res_btn"
          />
        </div>
      
      </div>
    </>
  );
};

export default SegmentDetails;
