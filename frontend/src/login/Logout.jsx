import React from 'react';
import { Button } from '@geist-ui/core';

const Logout = ({ onLogout }) => {
  

  return (
    <Button auto type="error" onClick={onLogout}>
      Logout
    </Button>
  );
};

export default Logout;
