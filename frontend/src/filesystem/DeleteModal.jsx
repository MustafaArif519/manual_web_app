import React, { useState } from 'react';
import { Text, Grid, Input, Spacer, Modal, User } from '@geist-ui/core'


const DeleteModal = ({ setViewDelete, viewDelete, deleteMode, token, path, user, setView, id,
                        name }) => {
  const [filename, setFilename] = useState('');


  const handleFileNameChange = (event) => {
    const file = event.target.value;
    setFilename(file);
  };


  const handleUpload = () => {
    fetch(`http://localhost:8000/api/v1/files${id}/`, {
      method: 'DELETE',
      // No headers are provided in this version
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete file');
        }
        // No need to parse response since DELETE requests don't have a response body
        console.log('File deleted successfully');
        // Assuming setViewDelete is the correct function to update view state
        setViewDelete(false);
      })
      .catch((error) => {
        console.error('Error deleting file:', error.message);
      });
  };
  
  

  return (
    <Modal visible={viewDelete} onClose={() => setViewDelete(false)}>
      <Modal.Title>WARNING!</Modal.Title>
      <Modal.Subtitle>You are about to delete {name}!</Modal.Subtitle>


      <Modal.Action passive onClick={() => setViewDelete(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={handleUpload}>DELETE {name}</Modal.Action>
    </Modal>
  );
};

export default DeleteModal;