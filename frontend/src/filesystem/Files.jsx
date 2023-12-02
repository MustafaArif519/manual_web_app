import { useState, useEffect } from 'react'
import { Text, Grid, Button, Spacer } from '@geist-ui/core'
import File from './File';
import Dir from "./Dir"
import { FilePlus, FolderPlus, ArrowLeftCircle } from '@geist-ui/icons'




const Files = ({user}) => {
  const [path, setPath] = useState('root');
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);
  const apiUrl = 'http://localhost:8000/api/v1/files';


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

      // Filter files and dirs based on user and path attributes
      const userFilteredFiles = data.filter((item) => item.is_file && item.author === user);
      const userFilteredDirs = data.filter((item) => !item.is_file && item.author === user);

      const pathFilteredFiles = data.filter((item) => item.is_file && item.directory === path);
      const pathFilteredDirs = data.filter((item) => !item.is_file && item.directory === path);

      // Combine user and path filtered lists
      const filesList = userFilteredFiles.concat(pathFilteredFiles);
      const dirsList = userFilteredDirs.concat(pathFilteredDirs);

      setFiles(filesList);
      setDirs(dirsList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [apiUrl, user, path]);

  return (
<>
  <Grid.Container justify="center" alignItems="center">

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
    <Button type="success" iconRight={<FilePlus />} auto />
    <Spacer w={2} />
    <Button type="success" iconRight={<FolderPlus />} auto />
  </Grid.Container>

  <Spacer h={5} />

  <Grid.Container gap={2} justify="center">
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