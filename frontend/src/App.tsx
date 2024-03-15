import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import Navbar from './components/Navbar';
function App() {

  return (
    <>
    <Navbar></Navbar>
      <Button variant='contained'>Hello</Button>
    </>
  )
}

export default App
