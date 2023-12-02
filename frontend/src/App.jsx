import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Text, Grid, Divider, Spacer, Button } from '@geist-ui/core'
import Login from './login/Login'
import Files from './filesystem/Files'


function App() {
  const [user, setUser] = useState(null);


  return (
    <>
    <Grid>
    <Text h1>Manual Drive</Text> {user != null && <Button auto type="error">Logout</Button>}
    <Divider />
    <Spacer h={1}/>
    {user === null ? <Login setUser = {setUser} /> :
        <Files /> 
        }
    </Grid>
     
    </>
  )
}

export default App
