import { useState } from 'react'
import axios from 'axios'
import { setToken } from '../lib/auth'

export default function Register() {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      console.log(data)
      setMessage('Register was successful')
    } catch (error) {
      console.log(error)
      setMessage(error.response.data.detail)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input autoComplete='off' type="text" placeholder='email' name="email" value={formData.email} onChange={handleChange} />
      <br />
      <input autoComplete='off' type="text" placeholder='username' name="username" value={formData.username} onChange={handleChange} />
      <br />
      <input autoComplete='off' type="password" placeholder='password' name="password" value={formData.password} onChange={handleChange}  />
      <br />
      <input autoComplete='off' type="password" placeholder='password confirmation' name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
      <br />
      {message && <p>{message}</p>}
      <input type="submit" value="Submit" />
    </form>
  )
}