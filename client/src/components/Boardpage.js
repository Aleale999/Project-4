
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
        ck && console.log(ck)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

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