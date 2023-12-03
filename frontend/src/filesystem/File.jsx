import React, { useState, useEffect } from 'react';
import { Input, Grid, Text, Button } from '@geist-ui/core'
import { FileText } from '@geist-ui/icons'




const File = ({ file }) => {
  const [data, setData] = useState(file);

  const handleDownload = () => {
    // Assuming the file attribute contains the download link or data
    const fileDownloadLink = data.file;

    // You can use the link to initiate the download
    window.open(fileDownloadLink, '_blank');
  };

  return (
    <>
      <Button type="secondary" iconRight={<FileText />} auto onClick={handleDownload} />
      <Text>{data.title}</Text>
    </>
  );
};

export default File;
