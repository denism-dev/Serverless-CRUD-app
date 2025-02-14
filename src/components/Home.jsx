import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch user data
  const fetchData = () => {
    axios.get('http://localhost:3000/users')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  // Function to handle user deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      // Filter out the deleted user from the state
      setData(data.filter(user => user.id !== id));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <h1>List of Users</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to='/create' className='btn btn-success'>ADD +</Link>
        </div>
        <table className='table table-striped table-hover table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d, i) => (
                <tr key={i}>
                  <td>{d.id} </td>
                  <td>{d.name} </td>
                  <td>{d.email} </td>
                  <td>{d.phone} </td>
                  <td>
                    <Link to={`read/${d.id}`}>
                      <button className='btn btn-sm btn-info me-2'>Read</button>
                    </Link>
                    <Link to={`update/${d.id}`}>
                      <button className='btn btn-sm btn-primary me-2'>Edit</button>
                    </Link>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(d.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
