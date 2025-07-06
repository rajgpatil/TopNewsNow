import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Bussiness from './pages/Bussiness'
import World from './pages/World'
import Nation from './pages/Nation'
import Technology from './pages/Technology'
import Register from './pages/Register'
import Login from './pages/Login'
import SavedNews from './pages/SavedNews'
import Entertainment from './pages/Entertainment'
import Sports from './pages/Sports'
import Health from './pages/Health'

import { SnackbarProvider} from 'notistack';

function App() {


  return (
    <>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} classes={{ containerRoot: 'custom-snackbar' }}>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/business' element={<Bussiness />}></Route>
          <Route path='/world' element={<World />}></Route>
          <Route path='/nation' element={<Nation />}></Route>
          <Route path='/technology' element={<Technology />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/saved' element={<SavedNews />}></Route>
          <Route path='/entertainment' element={<Entertainment />}></Route>
          <Route path='/sports' element={<Sports />}></Route>
          <Route path='/health' element={<Health />}></Route>
        </Routes>
     </SnackbarProvider>
    </>
  )
}

export default App
