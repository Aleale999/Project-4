
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
  const [appearList, setAppearList] = useState(false)
  const [appearCard, setAppearCard] = useState()

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
        ck && console.log(ck)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

  function createList(){
    setAppearList(!appearList)
    console.log('Created List')
  }
  function submittedList(e){
    setAppearList(false)
    console.log('Hit submit List')
  }

  function createCard(e, i){
    e.preventDefault()
    console.log('Hit create Card in List => ', ck[i])
    setAppearCard(appearCard && appearCard.map((card,j) => {
      if (i === j){
        return !card
      } else {
        return (card)
      }
    }))
  }
  function submittedCard(e,i){
    e.preventDefault()
    setAppearCard(appearCard && appearCard.map((card,j) => {
      if (i === j){
        return !card
      } else {
        return (card)
      }
    }))
    console.log('Hit submit Card')
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

  return (
    <>
      <div>
        <h1 style={{ textTransform: 'uppercase' }}>{title && title}</h1>
        {lists && lists.map((list,i) => {
          return (
            <>
              <form key={i} onSubmit={e => editlist(e,i)}>
                <input id={i} placeholder={list.name && list.name} value={(editList && editList)} onChange={e => handleChange(e,i)}></input>
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
                <input className={ appearCard[i] && appearCard[i] ? 'show' : 'hide'} placeholder='New card'></input>
              </form>
            </>
          )
        })}
      </div>
      <button onClick={e => createList()}>Create new list</button>
      <form onSubmit={e => submittedList(e)}>
        <input className={appearList ? 'show' : 'hide'} placeholder='New list'></input>
      </form>
    </>
  )
}