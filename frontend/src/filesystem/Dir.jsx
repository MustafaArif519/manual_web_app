import React, { useState, useEffect } from 'react';
import { Input, Grid, Text, Spacer, Button } from '@geist-ui/core'
import { Folder } from '@geist-ui/icons'



const Dir = ({ dir, setPath }) => {
  const [data, setData] = useState(dir);

  const handleButtonClick = () => {
    // Concatenate the current path with the directory name
    setPath((prevPath) => prevPath + '/' + data.title);
  };

  return (
    <>
      <>
        <Button type="secondary" iconRight={<Folder />} auto onClick={handleButtonClick} />
        <Text>{data.title}</Text>
      </>
    </>
  );
};

export default Dir;
