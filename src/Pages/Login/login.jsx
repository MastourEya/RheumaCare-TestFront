import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await axios.post('https://tt-front.duplessy.eu/api/token', {
            email: email,
            password: password
          });
          console.log('Response:', response.data); 
          const { token } = response.data;
          localStorage.setItem('jwtToken', token);
      
          if (email === 'admin@findly.co') {
            navigate('/dashboard');
          } else {
            navigate('/home');
          }
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      };
      
    

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="form">
                        <form>
                            <h1>Welcome to <br /> RheumaCare Blog!</h1>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    className="input email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>E-Mail Address</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="input password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label>Password</label>
                            </div>

                            <div className="input-group">
                                <button type="button" onClick={handleLogin}>
                                    LOGIN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
