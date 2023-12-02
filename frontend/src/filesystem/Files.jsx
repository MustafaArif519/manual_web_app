import { useState, useEffect } from 'react'
import { Text, Grid, Button, Spacer } from '@geist-ui/core'
import File from './File';
import Dir from "./Dir"



const Files = () => {
  const [path, setPath] = useState("/");
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);
  const apiUrl = 'http://localhost:8000/api/v1/files';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Separate files and dirs based on the 'is_file' attribute
        const filesList = data.filter((item) => item.is_file);
        const dirsList = data.filter((item) => !item.is_file);

        setFiles(filesList);
        setDirs(dirsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
      <Text>{path}</Text>
      <Grid.Container>

        <Button auto type="secondary">Create File</Button>
        <Spacer w={5} />
        <Button auto type="secondary">Upload File</Button>
      </Grid.Container>

      <Grid.Container gap={2} justify="center">
      {dirs.length != 0 && dirs.map((dir) => (
          <Dir key={dir.id} dir={dir} />
        ))}
        {files.length != 0 && files.map((file) => (
          <File key={file.id} file={file} />
        ))}

      </Grid.Container>

    </>
  );
};

export default Files;

