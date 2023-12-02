import React from 'react';

class Dir extends React.Component {
  handleDirChange = (event) => {
    const selectedDir = event.target.Dirs[0];
    // Do something with the selected Dir, e.g., upload it or process it
    console.log('Selected Dir:', selectedDir);
  };

  render() {
    return (
      <div>
        <h2>Dir Component</h2>
        <input type="Dir" onChange={this.handleDirChange} />
      </div>
    );
  }
}

export default Dir;
