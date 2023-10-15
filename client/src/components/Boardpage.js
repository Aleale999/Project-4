
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosAuth from '../lib/axios'
import axios from 'axios'
import { getToken } from '../lib/auth'

export default function Boardpage(){

  const navigate = useNavigate()

  const { lk } = useParams()

  const [ck, setCk] = useState()
  const [lists, setLists] = useState()
  const [title, setTitle] = useState()
  const [cards, setCards] = useState()
  const [editList, setEditList] = useState([])
  const [newList, setNewList] = useState('')
  const [newCard, setNewCard] = useState('')
  const [appearList, setAppearList] = useState(false)
  const [appearCard, setAppearCard] = useState()
  const [collabForm, setCollabForm] = useState(false)
  const [collabName, setCollabName] = useState('')
  const [collabMessage, setCollabMessage] = useState('')
  const [owner, setOwner] = useState()
  const [user, setUser] = useState()
  const [userMessage, setUserMessage] = useState('')
  const [state, setState] = React.useState(false)

  const [popup, setPopup] = useState(false)
  
  const [showEditList, setShowEditList] = useState(false)
  const [board, setBoard] = useState()

  const [editCard, setEditCard] = useState()
  const [showEditCard, setShowEditCard] = useState(false)

  const [showCollaborators, setShowCollaborators] = useState()
  const [showCollaboratorsForm, setShowCollaboratorsForm] = useState(false)

  const [colours, setColours] = useState(['red', 'green', 'yellow'])

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get(`/api/board/${lk}/`)
        setBoard(data)
        setTitle(data.name)
        setLists(data.lists)
        data.lists && setCards(data.lists.map(({ cards }) => {
          return cards
        }))
        data.lists && setEditCard(data.lists.map(({ cards }) => {
          return cards
        }))
        setCk(data && data.lists.map((lists) => {
          return lists.id
        }))
        data.lists && setAppearCard(data.lists.map(({ cards }) => {
          return false
        }))
        data.lists && setShowEditCard(data.lists.map(({ cards }) => {
          return cards && cards.map((card) => false)
        }))
        data.lists && setShowEditList(data.lists.map((cards) => {
          return false
        }))
        data.lists && setOwner(data.owner)
        const id = await axiosAuth.get(`/api/auth/users/${lk}/`)
        setUser(id.data[0].id)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [state])

  function createList(){
    setAppearList(!appearList)
  }
  function submittedList(e){
    if (newList) {
      axios.post('/api/boardlists/', {
        name: newList,
        board: lk,
      }, 
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      })
    }
    setAppearList(false)
    setNewList('')
  }

  function createCard(e, i){
    e.preventDefault()
    setAppearCard(appearCard && appearCard.map((card,j) => {
      if (i === j){
        return !card
      } else {
        return (card)
      }
    }))
  }
  function submittedCard(e,i){
    ck[i] && axios.post('/api/cards/', {
      name: newCard,
      boardlist: ck[i],
    },
    {
      headers: {
        'Authorization': `Bearer ${getToken('access-token')}`,
      },
    }
    )
    setAppearCard(appearCard && appearCard.map((card,j) => {
      if (i === j){
        return !card
      } else {
        return (card)
      }
    }))
  }


  function handleChange(e,i){
    e.preventDefault()
    const newArray = [...lists]
    newArray[i].name = e.target.value
    setLists(newArray)
  }

  function editlist(e,i){
    if (lists[i].name[0]) {
      e.preventDefault()
      ck[i] && axios.patch(`/api/boardlists/${ck[i]}/`, {
        name: lists[i].name,
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      }
      )
      setEditList('')
    } else {
      ck[i] && axios.delete(`/api/boardlists/${ck[i]}/`, {
        name: editList,
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      }
      )
      setState(!state)
    }
    const newArray = [...showEditList]
    newArray[i] = !newArray[i]
    setShowEditList(newArray)
  }

  function showCollabForm() {
    setCollabForm(!collabForm)
  }

  async function addedCollaborator(e) {
    e.preventDefault()
    setCollabMessage('')
    const { data } = await axiosAuth.get('/api/auth/users/')
    let id
    data && data.map((user) => {
      if (user.email === collabName) {
        id = user.id
      }
    })
    console.log(id)
    if (id) {
      axios.patch(`/api/board/${lk}/collaborators/`,{
        collaborators: id,
      }, {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      })
    } else {
      setCollabMessage('User Not Found')
    }
    setState(!state)
    setCollabName('')
  }

  function showedEditList(i){
    const newArray = [...showEditList]
    newArray[i] = !newArray[i]
    setShowEditList(newArray)
  }
  function showedEditCard(e,i,j){
    e.preventDefault()
    const newArray = [...showEditCard]
    newArray[i][j] = !newArray[i][j]
    setShowEditCard(newArray)
  }

  function clickedCheck(status){
    console.log(status)
  }

  function changeEditCard(e, i, j){
    e.preventDefault()
    const newArray = [...editCard]
    newArray[i][j].name = e.target.value
    setEditCard(newArray)
  }

  async function editedCard(e,i,j){
    // e.preventDefault()
    const id = editCard[i][j].id
    if (editCard[i][j].name) {
      e.preventDefault()
      await axios.patch(`/api/cards/${id}/`, {
        name: editCard[i][j].name,
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      }
      )
    } else {
      await axios.delete(`/api/cards/${id}/`,
        {
          headers: {
            'Authorization': `Bearer ${getToken('access-token')}`,
          },
        }
      )
    }
    console.log(editCard[i][j].name)
    const newArray = [...showEditCard]
    newArray[i][j] = !newArray[i][j]
    setShowEditCard(newArray)
  }

  function clickedYes(){
    if (user === owner) {
      axios.delete(`/api/board/${lk}/`, {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      })
      setPopup(!popup)
      navigate('/')
    } else {
      setUserMessage('You are not the owner of the board')
    }
  }

  function clickedNo(){
    setUserMessage('')
    setPopup(!popup)
  }

  async function showCollab(){
    const { data } = await axiosAuth.get('/api/auth/users/')
    const newArray = []
    data && data.map(( data) => {
      board && board.collaborators.map((collabs,i) => {
        if (data.id === collabs) newArray.push(data.username)
      })
    })
    setShowCollaborators(newArray.map((collab,i) => {
      return (collab)
    }))
    setShowCollaboratorsForm(!showCollaboratorsForm)
  }

  function showColours(){
    console.log('Nothing yet')
  }

  return (
    <>
      <div>
        <header className='boardpage-header'>
          <div>
            <button onClick={showColours}>Show colours</button>
          </div>
          <div>
            <button onClick={e => setPopup(!popup)}>Delete board</button>
            <div className={popup ? 'popup' : 'hidden'}>
              <div className={popup ? 'popup_inner' : 'hidden'}>
                <h1 className={popup ? 'h1' : 'hidden'}>Are you sure you want to delete the board?</h1>
                <div className='button-container'>
                  <button className={popup ? 'button btn-sm btn-block' : 'hidden'} onClick={clickedYes}>Yes</button>
                  <button className={popup ? 'button btn-sm btn-block' : 'hidden'} onClick={clickedNo}>No</button>
                  {userMessage && <p>{userMessage}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className='collaborators-container'>
            <button className='show-collaborators' onClick={showCollab}>Collaborators List</button>
            <div className='collaborators'>
              {showCollaboratorsForm ? showCollaborators && showCollaborators.map((collab,i) => (<p key={i}>{collab}</p>)) : <></>}
            </div>
            <button onClick={e => showCollabForm()}>Add collaborator</button>
            <form className={collabForm ? 'show' : 'hide'} onSubmit={e => addedCollaborator(e)}>
              <input placeholder='Insert email' type='email' value={collabName && collabName} autoComplete='off' onChange={e => (setCollabName(e.target.value), setCollabMessage(''))}></input>
              {collabMessage && <p>{collabMessage}</p>}
            </form>
          </div>
        </header>
        <div className='board-container'>
          <h1 style={{ textTransform: 'uppercase' }}>{title && title}</h1>
          <div className='board'>
            <div className='lists'>
              {lists && lists.map((list,i) => {
                return (
                  <div key={list.id} className='singlelist'>
                    { showEditList[i] ?
                      <form onSubmit={e => editlist(e,i)}>
                        <input placeholder={list.name && list.name} autoComplete='off' value={(list.name && list.name)} onChange={e => handleChange(e,i)}></input>
                        <button className='createcard' type='submit'>Save changes</button>
                      </form> :
                      <div className='list-title'>
                        <h3>{list.name}</h3>
                        <button onClick={e => showedEditList(i)}>✏️</button>
                      </div>
                    }
                    <div className='cards'>
                      {cards[i] && cards[i].map((card,j) => {
                        return (
                          <div key={card.id}>
                            { showEditCard[i][j] ?
                              <form onSubmit={e => editedCard(e,i,j)}>
                                <input placeholder={card && card.name} value={editCard && editCard[i][j].name} onChange={e => changeEditCard(e,i,j)}>
                                  {/* {card.id ? ['"name of the card" => ', card.name,' , "colours" => ', card.colours, ' , "Status " => ', card.status ? 'true' : 'false' ] : 'This list is empty'} */}
                                </input>
                                {/* <input type="checkbox" onClick={e => clickedCheck(card.status)}/> */}
                                <button className='createcard' type='submit'>Save changes</button>
                              </form> :
                              <p onClick={e => showedEditCard(e,i,j)} >{card.name}</p>
                            }
                          </div>
                        )
                      })}
                    </div>
                    <form onSubmit={e => submittedCard(e, i)}>
                      <input className={ appearCard[i] && appearCard[i] ? 'show' : 'hide'} autoComplete='off' onChange={e => setNewCard(e.target.value)} placeholder='New card'></input>
                    </form>
                    <button className='createcard' onClick={e => createCard(e, i)}>Create new card</button>
                  </div>
                )
              })}
            </div>
            <form onSubmit={e => submittedList(e)}>
              <input className={appearList ? 'show' : 'hide'} value={newList && newList} autoComplete='off' onChange={e => setNewList(e.target.value)} placeholder='New list'></input>
            </form>
            <button className='createlist' onClick={e => createList()}>Create new list</button>
          </div>
        </div>
      </div>
    </>
  )
}