
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosAuth from '../lib/axios'

export default function Boardpage(){
  const { lk, ck } = useParams()

  const [lists, setLists] = useState()
  const [title, setTitle] = useState()

  useEffect(() => {
    async function getData(){
      try {
        const { data } = await axiosAuth.get(`/api/board/${lk}/`)
        const board = await axiosAuth.get('/api/board/')
        setTitle(board && board.data.map((data) => {
          if (data.id === parseInt(lk)) {
            return data.name
          }
        }))
        console.log(data)
        setLists(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1 style={{ textTransform: 'uppercase' }}>{title && title}</h1>
      {lists && lists.map((list,i) => {
        return (
          <>
            <h3 key={i}>{list.name}</h3>
            <p>cards</p>
          </>
        )
      })}
    </>
  )
}