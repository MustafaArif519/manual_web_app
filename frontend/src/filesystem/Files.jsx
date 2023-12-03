import { useState, useEffect } from 'react'
import { Text, Grid, Button, Spacer, Modal, Input } from '@geist-ui/core'
import File from './File';
import Dir from "./Dir"
import FileUpload from './FileUpload';
import DirUpload from './DirUpload';
import { FilePlus, FolderPlus, ArrowLeftCircle, Trash2  } from '@geist-ui/icons'




const Files = ({user, token}) => {
  const [path, setPath] = useState('root');
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);
  const apiUrl = 'http://localhost:8000/api/v1/files';
  
  const [view, setView] = useState(false);
  const [type, setType] = useState(null);


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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [user, path, view]);


  return (
<>
  <Grid.Container justify="center" alignItems="center">


  { type === "file" && <FileUpload setView={setView} 
                        viewHandler = {viewHandler} view = {view} 
                        token={token} path={path} user={user}/>}

{ type === "dir" && <DirUpload setView={setView} 
    viewHandler = {viewHandler} view = {view} 
    token={token} path={path} user={user}/>}
  

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
    <Button type="error"  onClick={()=>viewHandler(true, "dir")} iconRight={<Trash2  />} auto />
  </Grid.Container>
  <Spacer h={2} />
    <Input label="Search" placeholder="Ex: furniture" />
  <Spacer h={5} />

  <Grid.Container  justify="center">
    {dirs.length !== 0 &&
      dirs.map((dir) => (
        <Grid xs={24} md={12} lg={8} key={dir.id}>
          <Dir dir={dir} setPath={setPath} />
        </Grid>
      ))}
    {files.length !== 0 &&
      files.map((file) => (
        <Grid xs={24} md={12} lg={8} key={file.id}>
          <File file={file} />
        </Grid>
      ))}
  </Grid.Container>
</>

  );
};

export default Files;