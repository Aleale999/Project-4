
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosAuth from '../lib/axios'
import axios from 'axios'
import { getToken } from '../lib/auth'

export default function Boardpage(){
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
  
  const [showEditList, setShowEditList] = useState(false)

  const [editCard, setEditCard] = useState()
  const [newEditCard, setNewEditCard] = useState()
  const [showEditCard, setShowEditCard] = useState(false)

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get(`/api/board/${lk}/`)
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
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

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
    console.log(newArray)
    setLists(newArray)
  }

  function editlist(e,i){
    if (lists[i].name[0]) {
      console.log('Edit List not empty')
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
      console.log('Edit List empty')
      ck[i] && axios.delete(`/api/boardlists/${ck[i]}/`, {
        name: editList,
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      }
      )
    }
    setShowEditList(!showEditList)
  }

  function showCollabForm() {
    setCollabForm(!collabForm)
  }

  async function addedCollaborator(e) {
    e.preventDefault()
    setCollabMessage('')
    console.log('Added collab => ', collabName)
    const { data } = await axiosAuth.get('/api/auth/users/')
    let id
    data && data.map((user) => {
      if (user.email === collabName) {
        id = user.id
      }
    })
    if (id) {
      axios.patch('/api/board/6/collaborators/',{
        collaborators: id,
      }, {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      })
    } else {
      setCollabMessage('User Not Found')
    }
    setCollabName('')
  }

  function clickedCheck(status){
    console.log(status)
  }

  function clickEditButton(e){
    e.preventDefault()
    console.log(e.target.id)
  }

  function changeEditCard(e, i, j){
    e.preventDefault()
    const newArray = [...editCard]
    newArray[i][j].name = e.target.value
    setEditCard(newArray)
  }

  async function editedCard(e,i,j){
    const id = editCard[i][j].id
    await axios.patch(`/api/cards/${id}/`, {
      name: editCard[i][j].name,
    },
    {
      headers: {
        'Authorization': `Bearer ${getToken('access-token')}`,
      },
    }
    )
  }

  return (
    <>
      <div>
        <header>
          <h1 style={{ textTransform: 'uppercase' }}>{title && title}</h1>
          <div>
            <button>Show collaborators</button>
            <button onClick={e => showCollabForm()}>Add collaborator</button>
            <form className={collabForm ? 'show' : 'hide'} onSubmit={e => addedCollaborator(e)}>
              <input placeholder='Insert email here' type='email' value={collabName && collabName} autoComplete='off' onChange={e => (setCollabName(e.target.value), setCollabMessage(''))}></input>
              {collabMessage && <p>{collabMessage}</p>}
            </form>
          </div>
        </header>
        {lists && lists.map((list,i) => {
          return (
            <>
              { showEditList ?
                <form key={i} onSubmit={e => editlist(e,i)}>
                  <input id={i} placeholder={list.name && list.name} autoComplete='off' value={(list.name && list.name)} onChange={e => handleChange(e,i)}></input>
                  <button type='submit'>Save changes?</button>
                </form> :
                <div>
                  <h3>{list.name}</h3>
                  <button onClick={e => setShowEditList(!showEditList)}>✏️</button>
                </div>
              }
              {cards[i] && cards[i].map((card,j) => {
                return (
                  <div key={card.id}>
                    { showEditCard ?
                      <form onSubmit={e => editedCard(e,i,j)}>
                        <input placeholder={card && card.name} value={editCard && editCard[i][j].name} onChange={e => changeEditCard(e,i,j)}>
                          {/* {card.id ? ['"name of the card" => ', card.name,' , "colours" => ', card.colours, ' , "Status " => ', card.status ? 'true' : 'false' ] : 'This list is empty'} */}
                        </input>
                        {/* <input type="checkbox" onClick={e => clickedCheck(card.status)}/> */}
                        <button id={card.id} type='submit'>✏️</button>
                      </form> :
                      <p>{card.name}</p>
                    }
                  </div>
                )
              })}
              <button onClick={e => createCard(e, i)}>Create new card</button>
              <form onSubmit={e => submittedCard(e, i)}>
                <input className={ appearCard[i] && appearCard[i] ? 'show' : 'hide'} autoComplete='off' onChange={e => setNewCard(e.target.value)} placeholder='New card'></input>
              </form>
            </>
          )
        })}
      </div>
      <button onClick={e => createList()}>Create new list</button>
      <form onSubmit={e => submittedList(e)}>
        <input className={appearList ? 'show' : 'hide'} value={newList && newList} autoComplete='off' onChange={e => setNewList(e.target.value)} placeholder='New list'></input>
      </form>
    </>
  )
}