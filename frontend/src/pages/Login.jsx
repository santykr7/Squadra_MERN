import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]:value,
    })
    console.log(formData)
  }

  const handleSubmit = async(e) => {
    const {email,password} = formData
    e.preventDefault()
    try {
      const result = await axios.post('/login',{
        email,password
      })
      if(result?.data?.error) {
        toast.error(result?.data?.error)
      }else{
        setFormData({
          email:'',
          password:''
        })
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button>Register</button>
      <div className="form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
      
    </div>
  )
}

export default Login
