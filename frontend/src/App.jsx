import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Text, Grid, Divider, Spacer, Button } from '@geist-ui/core'
import Login from './login/Login'
import Files from './filesystem/Files'
import Logout from './login/Logout'


function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  console.log(localStorage.getItem('user'));
  console.log(user);
  const handleLogout = async () => {
    try {
      // Add your logout API endpoint URL here
      const logoutEndpoint = 'http://localhost:8000/api/v1/dj-rest-auth/logout/'; // Replace with your actual logout endpoint

      // Make a fetch request to the logout API endpoint
      const response = await fetch(logoutEndpoint, {
        method: 'POST', // or 'GET', 'PUT', etc. depending on your API
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers needed for authentication, etc.
        },
        // Add any additional options like body if needed
      });

      if (!response.ok) {
        throw new Error('Logout request failed');
      }

      // Clear user data from local storage and update state
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Grid.Container>
      <Grid>
        <Text h1>Manual Drive</Text>
        {user !== null && <Logout onLogout={handleLogout} />
        }
        <Divider />
        <Spacer h={1} />
        {user === null ? <Login setUser={setUser} setToken = {setToken}/> : 
        <Files user={user} token={token}/>}
      </Grid>
    </Grid.Container>
  );
}

export default App;