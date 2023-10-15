import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React, { useState, useEffect, useParams } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'


export default function Navigation() {

  const [isAuth, setIsAuth] = useState()
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    if (localStorage.getItem('access-token') !== null) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [reload])

  function logout(e){
    localStorage.clear()
    setReload(!reload)
    navigate('/login', { replace: true })
  }

  function login(e){
    console.log(e)
    setReload(!reload)
    navigate('/login')
  }

  return ( 
    <div className='nav-div'>
      <Navbar>
        {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
        <Nav>
          {isAuth ? <Button variant='link' onClick={(e) => logout(e)}>Logout</Button> :
            <Button onClick={e => login(e)}>Login</Button>}
        </Nav>
      </Navbar>
    </div>
  )
}