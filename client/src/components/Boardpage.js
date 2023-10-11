
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosAuth from '../lib/axios'
import axios from 'axios'
import { getToken } from '../lib/auth'

export default function Boardpage(){
  const { lk } = useParams()
  let ck

  const [board, setBoard] = useState()
  const [lists, setLists] = useState()
  const [title, setTitle] = useState()
  const [cards, setCards] = useState()
  const [editList, setEditList] = useState([])

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get(`/api/board/${lk}/`)
        console.log(data)
        setTitle(data.name)
        setLists(data.lists)
        data.lists && setCards(data.lists.map(({ cards }) => {
          return cards
        }))
        console.log(data.lists[1])
        ck = lists && lists.map((list) => {
          return list.id
        })
        console.log(ck)
        // const cards = await Promise.all(ck.map((cardId) => {
        //   const promise = axiosAuth.get(`/api/board/${lk}/${cardId}/`)
        //   return promise
        // }))
        // setCards(cards.map(card => (card.data && card.data)))

        // setTitle(board && board.data.map((data,i) => {
        //   if (data.id === parseInt(lk)) {
        //     return data.name
        //   }
        // }))
        // data && data.map((name) => editList.push(name.name))
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

  function handleChange(e){
    setEditList(e.target.value)
  }

  function editlist(e,i){
    e.preventDefault()
    axios.patch(`/api/board/${lk}/${ck}`, {
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
      <div>
        <h1 style={{ textTransform: 'uppercase' }}>{title && title}</h1>
        {lists && lists.map((list,i) => {
          return (
            <>
              <form key={i} onSubmit={e => editlist(e,i)}>
                <input placeholder={list.name && list.name} value={(editList && editList)} onChange={e => handleChange(e)}></input>
                <button type='submit'>Save changes</button>
                {cards[i] && cards[i].map((card) => {
                  return (
                    <div key={card.id}>
                      <p>
                        {card ? ['"name of the card" => ', card.name,' , "colours" => ', card.colours, ' , "Status " => ', card.status ? 'true' : 'false' ] : 'This list is empty'}
                      </p>
                    </div>
                  )
                })}
              </form>
              <button>Create new card</button>
            </>
          )
        })}
      </div>
      <button>Create new list</button>
    </>
  )
}