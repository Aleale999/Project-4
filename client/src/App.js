import { useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'

export default function App() {
  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axios.get('/api/board/') // <---- Replace with your endpoint to test the proxy
        console.log(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getData()
  }, [])

  return <Login />
}
