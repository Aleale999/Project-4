import { useEffect, useState } from 'react'
import axiosAuth from '../lib/axios'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../lib/auth'



export default function Landing(){

  const [userData, setUserData] = useState()
  const [newBoard, setNewBoard] = useState('')
  const [appearBoard, setAppearBoard] = useState(false)

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get('/api/board/')
        setUserData(data)
        setNewBoard()
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])
  
  function submittedBoard(e){
    console.log(newBoard)
    if (newBoard) {
      axios.post('/api/board/', {
        name: newBoard,
      }, 
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      })
    }
    setAppearBoard(!appearBoard)
    setNewBoard('')
  } 

  return (
    <>
      {userData && userData.map((data, i) => {
        return <Link key={i} to={`/board/${data.id}`}>{data.name}</Link>
      })}
      <button onClick={e => setAppearBoard(!appearBoard)}>Create new Board</button>
      <form onSubmit={e => submittedBoard(e)}>
        <input className={ appearBoard ? 'show' : 'hide'} value={newBoard && newBoard} autoComplete='off' onChange={e => setNewBoard(e.target.value)} placeholder='New Board'></input>
      </form>
    </>
  )
}