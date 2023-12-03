import React, { useState } from 'react';
import { Text, Grid, Input, Spacer, Modal, User } from '@geist-ui/core'


const FileUpload = ({ setView, view, viewHandler, token, path, user }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filename, setFilename] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileNameChange = (event) => {
        const file = event.target.value;
        setFilename(file);
        // console.log(filename);
    };

    const handleUpload = () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('title', filename); // Replace with the actual title
        formData.append('author', user);
        formData.append('is_file', true);
        formData.append('directory', path);
        formData.append('file', selectedFile);
    
        fetch('http://localhost:8000/api/v1/files', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log('File uploaded successfully:', responseData);
            // Handle success, update state, or perform additional actions
            setView(false);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            // Handle error, display a message, or perform error-related actions
          });
      } else {
        console.warn('No file selected for upload');
        // You can display a warning message to the user if no file is selected
      }
    };
    
      

    return (

        <Modal visible={view} onClose={() => setView(false)}>
            {/* <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div> */}

            <Modal.Title>Select File to Upload</Modal.Title>
            <Modal.Subtitle>Specify file and filename to upload</Modal.Subtitle>
            <Modal.Content>
                <Input label="Filename:" placeholder="Ex: hairdryer manual" 
                value = {filename} onChange={handleFileNameChange}/>
                <Spacer h={.5} />
                <input type="file" onChange={handleFileChange} />
            </Modal.Content>
            <Modal.Action passive onClick={() => setView(false)}>Cancel</Modal.Action>
            <Modal.Action onClick={handleUpload}>Upload File</Modal.Action>
            </Modal>
   

    );
};

export default FileUpload;
