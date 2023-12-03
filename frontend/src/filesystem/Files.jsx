import { useState, useEffect } from 'react'
import { Text, Grid, Button, Spacer, Modal, Input } from '@geist-ui/core'
import File from './File';
import Dir from "./Dir"
import FileUpload from './FileUpload';
import DirUpload from './DirUpload';
import DeleteModal from './DeleteModal';
import { FilePlus, FolderPlus, ArrowLeftCircle, Trash2, Folder, FileText  } from '@geist-ui/icons'




const Files = ({user, token}) => {
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


  const viewHandler = (bool, typer) => {
    setView(bool);
    setType(typer);
  };



const handleButtonClick = () => {
  setPath((prevPath) => {
    // Extract the portion of the path before the last slash
    const newPath = prevPath.substring(0, prevPath.lastIndexOf('/'));
    return newPath;
  });
};

const handleDeleteMode = () => {
  setDeleteMode(!deleteMode);
};

const handleDeleteView = (id, name) => {
  setViewDelete(!viewDelete);
  setDeleteId(id);
  setDeleteName(name);
  console.log(name);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      console.log('Original data:', data);
      console.log('User:', user);
      console.log('Path:', path);

      // Filter files and dirs based on user and path attributes
      let userFilteredFiles = data.filter((item) => item.is_file && item.author == user && item.directory == path);
      let userFilteredDirs = data.filter((item) => !item.is_file && item.author == user && item.directory == path);

      console.log('Filtered files:', userFilteredFiles);
      console.log('Filtered dirs:', userFilteredDirs);

      setFiles(userFilteredFiles);
      setDirs(userFilteredDirs);

      setDeleteDirs(userFilteredDirs);
      setDeleteFiles(userFilteredFiles);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [user, path, view, viewDelete]);


  return (
<>
  <Grid.Container justify="center" alignItems="center">


  { type === "file" && <FileUpload setView={setView} 
                        viewHandler = {viewHandler} view = {view} 
                        token={token} path={path} user={user}/>}

{ type === "dir" && <DirUpload setView={setView} 
    viewHandler = {viewHandler} view = {view} 
    token={token} path={path} user={user}/>}
  {viewDelete && 
  <DeleteModal user={user} token = {token} path = {path}
    deleteMode={deleteMode} viewDelete = {viewDelete} setViewDelete={setViewDelete}
    id = {deleteId} name = {deleteName}
   />
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
    <Button type="success" onClick={()=>viewHandler(true, "file")} iconRight={<FilePlus />} auto />
    <Spacer w={2} />
    <Button type="success"  onClick={()=>viewHandler(true, "dir")} iconRight={<FolderPlus />} auto />
    <Spacer w={2} />
    <Button type="error"  onClick={handleDeleteMode} iconRight={<Trash2  />} auto />
  </Grid.Container>
  <Spacer h={2} />
    <Input label="Search" placeholder="Ex: furniture" />
  <Spacer h={5} />

  <Grid.Container  justify="center">
    {dirs.length !== 0 && !deleteMode &&
      dirs.map((dir) => (
        <Grid xs={24} md={12} lg={8} key={dir.id}>
          <Dir dir={dir} setPath={setPath} />
        </Grid>
      ))}
    {files.length !== 0 && !deleteMode &&
      files.map((file) => (
        <Grid xs={24} md={12} lg={8} key={file.id}>
          <File file={file} />
        </Grid>
      ))}

{deleteDirs.length !== 0 && deleteMode &&
      deleteDirs.map((dir) => (
        <Grid.Container xs={24} md={12} lg={8} key={dir.id}>
        <Button type="error" iconRight={<Folder />} auto 
        onClick={()=>handleDeleteView(dir.id, dir.title)} />
        <Text>{dir.title}</Text>
        </Grid.Container>
      ))}
    {deleteFiles.length !== 0 && deleteMode &&
      deleteFiles.map((file) => (
        <Grid.Container xs={24} md={12} lg={8} key={file.id}>
      <Button type="error" iconRight={<FileText />} auto 
      onClick={()=>handleDeleteView(file.id, file.title)} />
      <Text>{file.title}</Text>
        </Grid.Container>
      ))}
  </Grid.Container>
</>

  );
};

export default Files;