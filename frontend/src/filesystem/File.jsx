import React from 'react';

class File extends React.Component {
  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Do something with the selected file, e.g., upload it or process it
    console.log('Selected File:', selectedFile);
  };

  render() {
    return (
      <div>
        <h2>File Component</h2>
        <input type="file" onChange={this.handleFileChange} />
      </div>
    );
  }
}

export default File;
