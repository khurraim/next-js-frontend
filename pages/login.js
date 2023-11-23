import React, { useState } from "react";
import AuthUser from "./components/AuthUser";
import { ToastContainer, toast } from 'react-toastify';
import Layout from "./layouts/Layout";

const Login = () => {
  const { http, setToken } = AuthUser(); // Call AuthUser only once

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    // api call
    // http.post('/login', { email: email, password: password }).then((res) => {   
    //   if(res.error) {
    //     toast.error('Unauthorized');
    //   } else {
    //     setToken(res.data.user, res.data.access_token);
    //   }
    // });

    http.post('/login', { email: email, password: password })
    .then((res) => {   
        if (res.status === 401) {
          console.error('Unauthorized'); // Log the error to the console
          toast.error('Unauthorized');    // Display an error message to the user
        } else {
        setToken(res.data.user, res.data.access_token);
        toast.success('Successfully Logged In.');
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error); // Log any other errors to the console
        toast.error('An error occurred');             // Display a generic error message to the user
    });


  }

  return (
    <Layout>
    <div className="row justify-content-center py-5 mb-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">Login </h1>
          <div className="form-group">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control custom-select"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control custom-select"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
            />
          </div>
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-dark mt-4"
            style={{borderRadius: '0px'}}
          >
            Login
          </button>
        </div>
      </div>
    </div>
    </Layout>  
  );
}

export default Login;
