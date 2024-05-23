import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authenticate, getUser } from '../services/authorize';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const { username, password } = state;
  const navigate = useNavigate();

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((res) => {
        // login สำเร็จ
        authenticate(res, () => navigate('/'));
      })
      .catch((err) => {
        Swal.fire({
          title: 'Notice',
          text: err.response.data.error,
          icon: 'error',
        });
      });
  };

  useEffect(() => {
    getUser() && navigate('/')
  },[])

  return (
    <div className="container p-5">
      <Navbar />
      <h1>Log in</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue('username')}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue('password')}
          />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Login;
