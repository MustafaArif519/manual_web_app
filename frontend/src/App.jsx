import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login/Login'


function App() {
  const [user, setUser] = useState(null);


  return (
    <>
      {user === null && <Login setUser = {setUser} />}
    </>
  )
}

export default App
