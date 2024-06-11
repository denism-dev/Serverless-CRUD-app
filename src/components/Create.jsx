import React, { useState } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

const CreateUser = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  });

  // State to track successful user creation
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the field being changed is 'website'
    if (name === 'website') {
      // Check if the value already starts with 'http://' or 'https://'
      if (!value.startsWith('http://') && !value.startsWith('https://')) {
        // If not, prepend 'http://'
        setFormData({
          ...formData,
          [name]: 'http://' + value
        });
      } else {
        // If it does, update state with the current value
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      // For other fields, update state with the new value directly
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to JSON server
      const response = await axios.post('http://localhost:3000/users', formData);
      console.log('User created:', response.data);
      // Reset form after successful submission
      setFormData({
        id: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
      });
      // Set isSuccess to true upon successful creation
      setIsSuccess(true);
    } catch (error) {
      console.error('There was an error creating the user!', error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
      {/* Page heading */}
      <h2>Create User</h2>
      {/* Conditional rendering based on isSuccess */}
      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          {/* Input for ID */}
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          {/* Input for Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Input for Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          {/* Input for Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Input for Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          {/* Input for Website */}
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              className="form-control"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary">Create User</button>
        </form>
      ) : (
        // Display success message with animated checkmark upon successful user creation
        <div className="text-center">
          {/* Animated checkmark SVG */}
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          <p>User created successfully!</p>
          {/* Option to create another user */}
          <button
            className="btn btn-primary"
            onClick={() => setIsSuccess(false)} // Reset isSuccess to false to create another user
          >
            Create Another User
          </button>
          {/* Link to go back home */}
          <Link to="/" className="btn btn-success">Go Back Home</Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default CreateUser;
