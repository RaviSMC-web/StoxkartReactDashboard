import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

const SignatureProof = ({ setOpen, setSignFile, signFile, setSegError,docType }) => {
  const [highlight, setHighlight] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const [drop, setDrop] = React.useState(false);
  const [displaySign, setDisplaySign] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState("center");
  const [error, setError] = useState("");
  const [signatureProof, setSignatureProof] = useState('');
  const [signImage, setSignImage] = useState(false)
  const userCode = sessionStorage.getItem("userCode");
  const URL = process.env.REACT_APP_BASE_URL;

  const submitSignatureProof = async () => {
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
            ProofName: signFile.name.toUpperCase(),
            ProofDocument: signFile
          }
        });
      setSignatureProof(response.data.data);
      onHide("displaySign")
      setSignImage(true)
    } catch (error) {
      console.log("error in signature data", error);
    }
  };

  const dialogFuncMap = {
    displaySign: setDisplaySign,
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

  const handleClose = () => {
    setOpen(false);
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
    setSignFile(file);
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

  const onShowSignPop = () => {
    if(docType.length == 0) {
      setSegError('Please Select document type first.')
      return;
    } else{
      onClick("displaySign")
    }
  }

  return (
    <>
    <div className="segment_btn">
    <Button 
            icon={signImage ? <img src={preview} /> : "pi pi-file" }
            label={signImage ? signFile.name : "Upload Documents"}
            className="p-button-outlined p-button-sm"
            onClick={onShowSignPop}
            />
    </div>
    <Dialog
        onHide={() => onHide("displaySign")}
        visible={displaySign}
        className="dialog_res"
      >
      <div className="signature_upload">
        <p className="text-2xl">Signature Proof</p>
<p className="text-xs">Please make sure your signature fits into the box</p>
        <div className={signFile ? "upload_files_check_wbg" : "upload_files_check"}>
          <div
            onDragEnter={(e) => handleEnter(e)}
            onDragLeave={(e) => handleLeave(e)}
            onDragOver={(e) => handleOver(e)}
            onDrop={(e) => handleUpload(e)}
            className={`upload${
              highlight ? " is-highlight" : drop ? " is-drop" : ""
            }`}
            style={{ backgroundImage: `url(${preview})` }}
          >
            <form class="my-form">
              <div className="upload-button">
                <input
                  type="file"
                  className="upload-file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e)}
                />
              </div>
            </form>
          </div>
        </div>
        <p className="file_name">{signFile ? signFile.name : null}</p>
        <Button
              disabled={!signFile}
              label={signFile ? 'Confirm' : 'Browser'}
              onClick={submitSignatureProof}
              className="p-button-raised mt-2 p-button-sm smc_color"
              style={{
                backgroundColor: "#05BB75",
                color: "#ffffff",
                
                width: '100%'
              }}

            />
      </div>
      </Dialog>
    </>
  );
};

export default SignatureProof;
