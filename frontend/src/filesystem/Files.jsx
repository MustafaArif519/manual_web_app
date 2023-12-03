import { useState, useEffect } from 'react'
import { Text, Grid, Button, Spacer, Modal, Input } from '@geist-ui/core'
import File from './File';
import Dir from "./Dir"
import FileUpload from './FileUpload';
import DirUpload from './DirUpload';
import DeleteModal from './DeleteModal';
import { FilePlus, FolderPlus, ArrowLeftCircle, Trash2, Folder, FileText } from '@geist-ui/icons'




const Files = ({ user, token }) => {
  const [path, setPath] = useState('root');
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);

  const [deleteDirs, setDeleteDirs] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]);

  const apiUrl = 'http://localhost:8000/api/v1/files';

  const [view, setView] = useState(false);
  const [type, setType] = useState(null);


  const [deleteMode, setDeleteMode] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState(null);


  const [searchInput, setSearchInput] = useState("");

  const viewHandler = (bool, typer) => {
    setView(bool);
    setType(typer);
  };

  const viewDeleteHandler = (bool, id, name) => {
    
    setDeleteName(name);
    setDeleteId(id);
    setView(bool);

  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/v1/files${deleteId}/`, {
      method: 'DELETE',
      // No headers are provdeleteIded in this version
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete file');
        }
        // No need to parse response since DELETE requests don't have a response body
        console.log('File deleted successfully');
        // Assuming setViewDelete is the correct function to update view state
        setViewDelete(false);
        setView(false);
      })
      .catch((error) => {
        console.error('Error deleting file:', error.message);
        setViewDelete(false);
        setView(false);
      });
  };

  const handleButtonClick = () => {
    setPath((prevPath) => {
      // Extract the portion of the path before the last slash
      const newPath = prevPath.substring(0, prevPath.lastIndexOf('/'));
      return newPath;
    });
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        let userFilteredFiles;
        let userFilteredDirs;

        if (searchInput == "") {
          console.log("running empty case");
          // If search input is blank, display everything
          console.log(user);
          console.log(path);
          userFilteredFiles = data.filter(
            (item) => item.is_file && item.author == user && item.directory == path
          );
          console.log(data);
          console.log(userFilteredFiles);
          userFilteredDirs = data.filter(
            (item) => !item.is_file && item.author == user && item.directory == path
          );
        } else {
          // Filter based on search input
          userFilteredFiles = data.filter(
            (item) =>
              item.is_file &&
              item.author == user &&
              item.directory == path &&
              item.title.toLowerCase().includes(searchInput.toLowerCase())
          );

          userFilteredDirs = data.filter(
            (item) =>
              !item.is_file &&
              item.author == user &&
              item.directory == path &&
              item.title.toLowerCase().includes(searchInput.toLowerCase())
          );
        }

        setFiles(userFilteredFiles);
        setDirs(userFilteredDirs);

        setDeleteDirs(userFilteredDirs);
        setDeleteFiles(userFilteredFiles);

        console.log(userFilteredFiles);
        console.error("Updated the data");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, path, view, viewDelete, searchInput]);

console.log(deleteMode);

  return (
    <>
      <Grid.Container justify="center" alignItems="center">


        {type === "file" && !deleteMode && <FileUpload setView={setView}
          viewHandler={viewHandler} view={view}
          token={token} path={path} user={user} />}

        {type === "dir" && !deleteMode && <DirUpload setView={setView}
          viewHandler={viewHandler} view={view}
          token={token} path={path} user={user} />}
        {view && deleteMode && 
              <Modal visible={view} onClose={() => setView(false)}>
              <Modal.Title>WARNING!</Modal.Title>
              <Modal.Subtitle>You are about to delete {deleteName}!</Modal.Subtitle>
              <Modal.Content>
        This action is NOT reversible
                    </Modal.Content>
        
              <Modal.Action passive onClick={() => setView(false)}>
                Cancel
              </Modal.Action>
              <Modal.Action onClick={handleDelete}>DELETE {deleteName}</Modal.Action>
            </Modal>
        }


        <Text>{path}</Text>
      </Grid.Container>



      <Grid.Container justify="center">
        {path !== 'root' && (
          <Grid xs={24} md={8} lg={4}>
            {/* Adjust the width as needed */}
            <Button type="warning" iconRight={<ArrowLeftCircle />} auto onClick={handleButtonClick} />
          </Grid>
        )}
        <Spacer w={2} />
        <Button type="success" onClick={() => viewHandler(true, "file")} iconRight={<FilePlus />} auto />
        <Spacer w={2} />
        <Button type="success" onClick={() => viewHandler(true, "dir")} iconRight={<FolderPlus />} auto />
        <Spacer w={2} />
        {!deleteMode && <Button type="error" onClick={()=>setDeleteMode(true)} iconRight={<Trash2 />} auto /> }
          
         {deleteMode &&  <Button type="warning" onClick={()=>setDeleteMode(false)} iconRight={<Trash2 />} auto />}
      </Grid.Container>
      <Spacer h={2} />
      <Input label="Search" placeholder="Ex: furniture"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Spacer h={5} />

      <Grid.Container justify="center"  direction="column">
        {dirs.length !== 0 && !deleteMode &&
          dirs.map((dir) => (
            <Grid xs={24} key={dir.id}>
              <Dir dir={dir} setPath={setPath} />
            </Grid>
          ))}
        {files.length !== 0 && !deleteMode &&
          files.map((file) => (
            <Grid xs={24}  key={file.id}>
              <File file={file} />
            </Grid>
          ))}

        {deleteDirs.length !== 0 && deleteMode &&
          deleteDirs.map((dir) => (
            <Grid xs={24} key={dir.id}>
              <Button type="error" iconRight={<Folder />} auto
                onClick={() => viewDeleteHandler(true, dir.id, dir.title)} />
              <Text>{dir.title}</Text>
            </Grid>
          ))}
        {deleteFiles.length !== 0 && deleteMode &&
          deleteFiles.map((file) => (
            <Grid.Container xs={24} key={file.id}>
              <Button type="error" iconRight={<FileText />} auto
                onClick={() => viewDeleteHandler(true, file.id, file.title)} />
              <Text>{file.title}</Text>
            </Grid.Container>
          ))}
      </Grid.Container>
    </>

  );
};

export default Files;