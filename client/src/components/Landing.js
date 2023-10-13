import { useEffect, useState } from 'react'
import axiosAuth from '../lib/axios'
import { Link } from 'react-router-dom'



export default function Landing(){

  const [userData, setUserData] = useState()

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get('/api/board/')
        console.log(data)
        setUserData(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      {userData && userData.map((data, i) => {
        return <Link key={i} to={`/board/${data.id}`}>{data.name}</Link>
      })}
    </>
  )
}