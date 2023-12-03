// Login.js

import React, { useState } from 'react';
import { Input, Grid, Button, Spacer } from '@geist-ui/core'

const Register = ({setMode}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [data, setData] = useState(null);
    const [error, setError] = useState(null)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handlePasswordChange2 = (event) => {
        setPassword2(event.target.value);
    };

    
    

    const RegisterRequest = async () => {
        try {
          // Make the API request
          const response = await fetch('http://localhost:8000/api/v1/dj-rest-auth/registration/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password1: password,
              password2: password2,
              security_question: "how are you?",
              security_answer: "I am good",
            }),
          });
      
          // Check if the request was successful
          if (!response.ok) {
            // Handle the error, for example, by throwing an exception
            throw new Error(`Registration failed with status: ${response.status}`);
          }
      
          // Check if the response status is 204 (No Content)
          if (response.status === 204) {
            // Registration was successful, but there is no response body
            console.log('Registration successful (No Content)');
            setMode("login");
            console.log("Just set mode to login from register");
            // Optionally, you may want to handle the successful registration, such as redirecting the user
          } else {
            // Parse the response body as JSON for other status codes
            const result = await response.json();
            console.log('Registration successful:', result);
            setMode("login");
            console.log("Just set mode to login from register");
            // Optionally, you may want to handle the successful registration, such as redirecting the user
          }
        } catch (error) {
          // Handle any errors that occurred during the registration process
          console.error('Registration error:', error.message);
          // Optionally, you may want to display an error message to the user
        }
      };
      
      
  

    const handleRegister = () => {
        // Implement your login logic here
        console.log('Registering in with:', { username, email, password });
        // You can add authentication logic here
        RegisterRequest();


    };

    return (
        <div>
            <h2>Register</h2>

            <div>
                <Input
                    label="username"
                    placeholder="ex: johDoe260"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            
            <div>
            <br />
                <Input
                    label="email"
                    placeholder="ex: johDoe260@gmail.com"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>

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
            <div>
                <Input.Password
                    label="password confirm"
                    id="password2"
                    value={password2}
                    onChange={handlePasswordChange2}
                />
            </div>
            <br />


            <Grid.Container justify="center">

                <Button
                    auto type="success"
                    onClick={()=> setMode("login")}>
                    Login
                </Button>
                <Spacer w={2}/>
                <Button
                    auto type="success"
                    onClick={handleRegister}>
                    Register
                </Button>
            </Grid.Container>

        </div>
    );
};

export default Register;
