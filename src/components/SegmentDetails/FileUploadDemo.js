
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

                 