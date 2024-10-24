import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'

const Edit = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch the selected user's data
  const fetchSelectedData = async () => {
    try {
      const result = await axios.get(`/getOne/${id}`);
      if (result.data) {
        setFormData({
          name: result.data.name || '',
          phone_number: result.data.phone_number || '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelectedData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/update/${id}`, formData);
      if (response.data) {
        toast.success('Updated Successfully')
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="update-user-form">
        <h2>Update User</h2>
        <button className = 'back-button' onClick={() => navigate('/dashboard')}>Back</button>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            name="phone_number"
            onChange={handleChange}
            value={formData.phone_number}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
