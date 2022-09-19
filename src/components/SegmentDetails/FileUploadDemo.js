
import React, { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { style } from '@mui/system';

export const FileUploadDemo = () => {

    const [displaySegment, setDisplaySegment] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState("center");

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

  const chooseOptions = {label: 'Browser', icon: 'pi pi-fw pi-plus'};
const uploadOptions = {label: 'Uplaod', icon: 'pi pi-upload', className: 'p-button-success'};
const cancelOptions = {label: 'Cancel', icon: 'pi pi-times', className: 'p-button-danger'};

    return (
        <div>
            <div className="segment_btn">
        <Button
          icon="pi pi-file"
          label="Upload Documents"
          className="p-button-outlined p-button-sm"
          onClick={() => onClick("displaySegment")}
        />
      </div>

            <Dialog
        onHide={() => onHide("displaySegment")}
        visible={displaySegment}
        style={{ height: "75%", width: "400px" }}
      >
                <p className="text-2xl">Segment Proof</p>
          <p className="text-xs">
            Upload a copy of the cancelled cheque which shows your Name, Bank
            account number and IFSC code
          </p>
                <div className='seg_pop'>
                <FileUpload name="demo" uploadLabel='' accept="image/*" maxFileSize={1000000}
                    // emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} 
                    
                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}/>
                    </div>
                    
           </Dialog>
        </div>
    )
}
                 