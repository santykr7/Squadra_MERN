import { useContext, useEffect, useState } from "react";
import {UserContext} from '../context/userContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from "react-router-dom";
import './Dashboard.css';
import MoviePage from "../components/MoviePage";

const companyInfo = {
  name: 'Squadra Media Pvt Ltd',
  address: 'Bengaluru, Karnataka 560038',
  phone: '096068 27067',
  email: 'info@squadramedia.com',
  website: 'https://squadramedia.com/',
};

const Dashboard = () => {
    const {user} = useContext(UserContext)
    const [activeSection, setActiveSection] = useState(false);
    const [allUser, setAllUser] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()
    const [showData, setShowData] = useState(false)

    const handleSectionChange = () => {
      setActiveSection(!activeSection);
    };

    const fetchUserData = async() => {
      const result = await axios.get('/getAll')
      console.log(result?.data,'ALL data')
      setAllUser(result?.data)

    }

    const deleteUserById = async(userId) => {
      await axios.delete(`/delete/${userId}`)
      .then((res) => {
        setAllUser((prevUser) => prevUser.filter((user) => user._id !== userId))
        toast.success('successfully deleted')
      })
      .catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      fetchUserData()
    },[])

  return (
    <div className="dashboard-container">
      
      <h1>Dashboard</h1>
      {!!user && <h2 className="user-name">{user.name}</h2>}

      {/* Menu Bar */}
      <button className="menu-button" onClick={handleSectionChange} style={{margin:'15px'}}>
        Company Info
      </button>
      <button className="menu-button" onClick={() => setShowData(!showData)}>
        Registered Users
      </button>

      {/* Company Info Section */}
      {activeSection && (
        <div className="company-info">
          <h1>Company Info</h1>
          <p><strong>Name:</strong> {companyInfo.name}</p>
          <p><strong>Address:</strong> {companyInfo.address}</p>
          <p><strong>Phone:</strong> {companyInfo.phone}</p>
          <p><strong>Email:</strong> {companyInfo.email}</p>
          <p><strong>Website:</strong> <a href={`https://${companyInfo.website}`} target="_blank" rel="noopener noreferrer">{companyInfo.website}</a></p>
        </div>
      )}

      {showData && 
      <div className="user-info">
      <h2>User Info</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <button className="edit-button" onClick={() => navigate(`/edit/${user._id}`)}>Edit</button>
              </td>
              <td>
                <button className="delete-button" onClick={() => deleteUserById(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>}

    <MoviePage />
      
    </div>

    

  )
}

export default Dashboard
