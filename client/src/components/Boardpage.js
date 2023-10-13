
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

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get(`/api/board/${lk}/`)
        setTitle(data.name)
        setLists(data.lists)
        data.lists && setCards(data.lists.map(({ cards }) => {
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
    setEditList(e.target.value)
  }

  function editlist(e,i){
    if (editList[0]) {
      console.log('Edit List not empty')
      ck[i] && axios.patch(`/api/boardlists/${ck[i]}/`, {
        name: editList,
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
              <form key={i} onSubmit={e => editlist(e,i)}>
                <input id={i} placeholder={list.name && list.name} autoComplete='off' value={(editList && editList)} onChange={e => handleChange(e,i)}></input>
                <button type='submit'>Save changes</button>
                {cards[i] && cards[i].map((card) => {
                  return (
                    <div key={card.id}>
                      <p>
                        {card.id ? ['"name of the card" => ', card.name,' , "colours" => ', card.colours, ' , "Status " => ', card.status ? 'true' : 'false' ] : 'This list is empty'}
                      </p>
                    </div>
                  )
                })}
              </form>
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