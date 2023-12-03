
import { Modal } from '@geist-ui/core'


const DeleteModal = ({ setViewDelete, viewDelete, token, path, user, setView, deleteId,
                        deleteName }) => {
  
  

  return (
    <Modal visible={viewDelete} onClose={() => setViewDelete(false)}>
      <Modal.Title>WARNING!</Modal.Title>
      <Modal.Subtitle>You are about to delete {deleteName}!</Modal.Subtitle>
      <Modal.Content>
This action is NOT reversible
            </Modal.Content>

      <Modal.Action passive onClick={() => setViewDelete(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={handleUpload}>DELETE {deleteName}</Modal.Action>
    </Modal>
  );
};

export default DeleteModal;