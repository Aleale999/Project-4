import { useEffect, useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Nav'
import axiosAuth from './lib/axios'
import Landing from './components/Landing'

export default function App() {


  useEffect(() => {
    async function getData(){
      try {
        console.log(localStorage)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
