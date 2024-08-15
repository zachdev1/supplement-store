import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email }),
        });

        // valid register
        if (response.ok) {
          console.log('User registered successfully');
          setError('');
          window.alert('User registered successfully');
          navigate('/login');
        
        // duplicate user
        } else if(response.status == 409) {
          const errorMessage = await response.text();
          setError(errorMessage);
          window.alert(errorMessage);
        
        // error registering  
        } else {
          console.error('Failed to register user');
          setError('');
          window.alert('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while registering.');
        window.alert('An error occurred while registering.');
      }
    };

    return (
      <>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <input type="submit" value="Register" />
            <p>{error}</p>
          </form>
        </div>
      </>
    )
} 

