import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import pdf from '../../pics/pdf.svg'

const SegmentProof = ({ setSegmentFile, segmentFile, docType, setSegError}) => {
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");
  const [drop, setDrop] = useState(false);
  const [displaySegment, setDisplaySegment] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState("center");
  const [error, setError] = useState("");
  const [segmentProof, setSegmentProof] = useState('');
  const userCode = sessionStorage.getItem("userCode");
  const URL = process.env.REACT_APP_BASE_URL;
  const [segImage, setSegImage] = useState(false)


  const submitSegmentProof = async () => {
    try {
      const response = await axios(
        {
          method: 'post',
          url: `${URL}/SegmentDetail/saveSegmentProof`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: {
            userCode: userCode,
            ProofName: docType,
            ProofDocument: segmentFile,
          }
        });
      setSegmentProof(response.data.data);
      onHide("displaySegment")
      setSegImage(true)
      setError('')
    } catch (error) {
      console.log("error in segment data", error);
    }
  };

  const dialogFuncMap = {
    displaySegment: setDisplaySegment,
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
  };

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    preview === "" && setHighlight(true);
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    preview === "" && setHighlight(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setHighlight(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setHighlight(false);
    setDrop(true);

    const [file] = e.target.files || e.dataTransfer.files;

    uploadFile(file);
    setSegmentFile(file);
  };

  function uploadFile(file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileRes = btoa(reader.result);

      setPreview(`data:image/jpg;base64,${fileRes}`);
    };

    reader.onerror = () => {};
  }

  const onShowSegPop = () => {
    if(docType.length == 0) {
      setSegError('Please Select document type first.')
      return;
    } else{
      onClick("displaySegment")
    }
  }

  return (
    <>
      <div className="segment_btn">
        <Button
          icon={segImage == true ? <img src={pdf} /> : "pi pi-file" }
          label={segImage == true ? segmentFile.name : "Upload Documents"}
          className="p-button-outlined p-button-sm "
          onClick={onShowSegPop}
          style={{marginBottom: 15}}
        />
         {segImage ?
        <div>
          <p className="preview">Remove</p><p className="preview">Preview</p> 
        
        </div> : null}
      </div>
      
      <Dialog
        onHide={() => onHide("displaySegment")}
        visible={displaySegment}
        className="dialog_res"
      >
        <div className="signature_upload">
          <p className="text-2xl">Segment Proof</p>
          <p className="text-xs">
            Upload a copy of the cancelled cheque which shows your Name, Bank
            account number and IFSC code
          </p>
          <div className={segmentFile ? "upload_files_check_wbg" : "upload_files_check"}>
            <div
              onDragEnter={(e) => handleEnter(e)}
              onDragLeave={(e) => handleLeave(e)}
              onDragOver={(e) => handleOver(e)}
              onDrop={(e) => handleUpload(e)}
              className={`upload${
                highlight ? " is-highlight" : drop ? " is-drop" : ""
              }`}
              style={{ backgroundImage: segmentFile ?  `url(${pdf})` : `url(${preview})`  }}
            >
              <form className="my_form">
                <div className="upload-button">
                  <input
                    type="file"
                    className="upload-file"
                    accept="application/pdf"
                    onChange={(e) => handleUpload(e)}
                  />
                </div>
              </form>
            </div>
          </div>
          <p className="file_name">{segmentFile ? segmentFile.name : null}</p>
          {/* <p style={{ color: "red", fontSize: 12 }}>{error ? error : null}</p> */}
          <Button
          disabled={!segmentFile}
            label={segmentFile ? 'Confirm' : 'Browser'}
            onClick={submitSegmentProof}
            className="p-button-raised mt-2 p-button-sm smc_color"
            style={{
              backgroundColor: "#05BB75",
              color: "#ffffff",

              width: "100%",
            }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default SegmentProof;
