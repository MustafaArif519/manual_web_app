import React, { useState } from 'react';
import { Text, Grid, Input, Spacer, Modal, User } from '@geist-ui/core'


const DirUpload = ({ setView, view, viewHandler, token, path, user }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filename, setFilename] = useState("");



    const handleFileNameChange = (event) => {
        const file = event.target.value;
        setFilename(file);
        // console.log(filename);
    };

    const handleUpload = () => {

        const formData = new FormData();
        formData.append('title', filename); // Replace with the actual title
        formData.append('author', user);
        formData.append('is_file', false);
        formData.append('directory', path);
    
        fetch('http://localhost:8000/api/v1/files', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log('Folder uploaded successfully:', responseData);
            // Handle success, update state, or perform additional actions
            setView(false);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            // Handle error, display a message, or perform error-related actions
          });
      
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
                <Input label="Folder Name:" placeholder="Ex: Furniture Manuals" 
                value = {filename} onChange={handleFileNameChange}/>

            </Modal.Content>
            <Modal.Action passive onClick={() => setView(false)}>Cancel</Modal.Action>
            <Modal.Action onClick={handleUpload}>Create Folder</Modal.Action>
            </Modal>
   

    );
};

export default DirUpload;
