import { useEffect, useState } from 'react'
import axiosAuth from '../lib/axios'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../lib/auth'



export default function Landing(){

  const [userData, setUserData] = useState()
  const [newBoard, setNewBoard] = useState('')
  const [appearBoard, setAppearBoard] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get('/api/board/')
        setUserData(data)
        setNewBoard()
        if (localStorage.getItem('access-token')){
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
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
      <header><h1>TRELLO MOCK</h1></header>
      {isAuth ? 
        <>
          <div className='boards'>
            {userData && userData.map((data, i) => {
              return <Link key={i} to={`/board/${data.id}`}><h3>{data.name}</h3></Link>
            })}
          </div>
          <div className='landing-div'>
            <button onClick={e => setAppearBoard(!appearBoard)}>Create new Board</button>
            <form className='landing-input' onSubmit={e => submittedBoard(e)}>
              <input className={ appearBoard ? 'show create' : 'hide'} value={newBoard && newBoard} autoComplete='off' onChange={e => setNewBoard(e.target.value)} placeholder='New Board'></input>
            </form>
          </div>
        </>
        :
        <h2>Log in an account to see the boards</h2>
      }
    </>
  )
}