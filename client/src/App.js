import { useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Nav'
import axiosAuth from './lib/axios'

export default function App() {
  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get('/api/board/') // <---- Replace with your endpoint to test the proxy
        console.log(data)
      } catch (error) {
        console.log(error.response.data)
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
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
