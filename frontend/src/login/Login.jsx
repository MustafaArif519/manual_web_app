// Login.js

import React, { useState } from 'react';
import { Input, Grid, Button, Spacer } from '@geist-ui/core'

const Login = ({setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [data, setData] = useState(null);
    const [error, setError] = useState(null)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const LoginRequest = async () => {
        try {
          // Make the API request
          const response = await fetch('http://localhost:8000/api/v1/dj-rest-auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
    
          if (response.ok) {
            // Successful login
            const result = await response.json();
            console.log('Login successful:', result);
            setUser(username);
            // You may want to handle the successful login, such as redirecting the user
          } else {
            // Handle errors for non-successful responses
            setError('Invalid username or password');
          }
        } catch (error) {
          // Handle network errors or other exceptions
          setError('Error logging in');
        }
      };
  

    const handleLogin = () => {
        // Implement your login logic here
        console.log('Logging in with:', { username, password });
        // You can add authentication logic here
        LoginRequest();


    };

    return (
        <div>
            <h2>Login</h2>

            <div>
                <Input
                    label="username/email"
                    placeholder="ex: johDoe260"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <br />
            <div>
                <Input.Password
                    label="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <br />
            <Grid.Container justify="center">

                <Button
                    auto type="success"
                    onClick={handleLogin}>
                    Login
                </Button>
                <Spacer w={2}/>
                <Button
                    auto type="success"
                    onClick={handleLogin}>
                    Register
                </Button>
            </Grid.Container>

        </div>
    );
};

export default Login;