import { useEffect, useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Nav'
import axiosAuth from './lib/axios'
import Landing from './components/Landing'
import Boardpage from './components/Boardpage'

export default function App() {

  const token = localStorage.getItem('access-token')

  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Landing />} />
            <Route path='/board/:lk' element={<Boardpage />} />
            <Route path='/board/:lk/:ck' element={<Boardpage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
