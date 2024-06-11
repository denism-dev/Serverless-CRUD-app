import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Read = () => {
  const [user, setUser] = useState(null); // State to store user data
  const { id } = useParams(); // Extracting id parameter from URL using useParams hook

  // Fetch user data based on the id parameter when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data from JSON server
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data); // Update user state with fetched data
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser(); // Invoke fetchUser function
  }, [id]); // Dependency array ensures useEffect runs when id changes

  // Display loading message while fetching data
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {/* Display user name */}
          <h5 className="card-title">{user.name}</h5>
          {/* Display username */}
          <h6 className="card-subtitle mb-2 text-muted">{user.username}</h6>
          {/* Display user email */}
          <p className="card-text">Email: {user.email}</p>
          {/* Display user phone */}
          <p className="card-text">Phone: {user.phone}</p>
          {/* Display user website with a link */}
          <p className="card-text">Website: <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
          {/* Button to navigate back to the home page */}
          <Link to="/" className="btn btn-primary me-2">Go Back</Link>
          {/* Button to navigate to the edit page */}
          <Link to={`/update/${user.id}`} className="btn btn-info">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
