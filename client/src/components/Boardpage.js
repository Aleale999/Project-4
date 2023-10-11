
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosAuth from '../lib/axios'
import axios from 'axios'
import { getToken } from '../lib/auth'

export default function Boardpage(){
  const { lk } = useParams()
  let ck

  const [lists, setLists] = useState()
  const [title, setTitle] = useState()
  const [cards, setCards] = useState()
  const [editList, setEditList] = useState([])

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get(`/api/board/${lk}/`)
        const board = await axiosAuth.get('/api/board/')

        ck = await data.map((list) => {
          return list.id
        })
        const cards = await Promise.all(ck.map((cardId) => {
          const promise = axiosAuth.get(`/api/board/${lk}/${cardId}/`)
          return promise
        }))
        setCards(cards.map(card => (card.data && card.data)))

        console.log(data)
        setTitle(board && board.data.map((data,i) => {
          if (data.id === parseInt(lk)) {
            return data.name
          }
        }))
        data && data.map((name) => editList.push(name.name))
        setLists(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

  function handleChange(e,i){
    setEditList(e.target.value)
    console.log(editList)
  }

  function editlist(e,i){
    e.preventDefault()
    axios.patch(`/api/board/${lk}/`, {
      pk: ck,
      name: editList[i],
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
      <h1 style={{ textTransform: 'uppercase' }}>{title && title}</h1>
      {lists && lists.map((list,i) => {
        return (
          <form key={i} onSubmit={e => editlist(e,i)}>
            <input placeholder={list.name} value={(editList && editList[i])} onChange={e => handleChange(e, i)}></input>
            <button type='submit'>Save changes</button>
            {cards[i] && cards[i].map((card) => {
              {console.log(card)}
              return (<p key={card.id}>{card ? ['"name of the card" => ', card.name,' , "colours" => ', card.colours] : 'This list is empty'}</p>)
            })}
          </form>
        )
      })}
    </>
  )
}