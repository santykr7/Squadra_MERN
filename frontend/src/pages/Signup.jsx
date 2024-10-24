import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    phone_number:'',
    profession:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]:value,
    })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name,email,password,phone_number,profession} = formData
    try {
      const response =  await axios.post('/register',{
        name,email,password,phone_number,profession
      })
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setFormData({
          name: '',
          email: '',
          password: '',
          phone_number: '',
          profession: '',
        });
        toast.success('Register successful ')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
    console.log(formData,'DATA')
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
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
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            name="phone_number"
            onChange={handleChange}
            value={formData.phone_number}
          />
        </div>
        <div className="form-group">
          <label>Profession</label>
          <select
            name="profession"
            onChange={handleChange}
            value={formData.profession}
          >
            <option value="">Select</option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="Mechanic">Mechanic</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  )
}

export default Signup
