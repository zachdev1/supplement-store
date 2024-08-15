import './Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });

            // valid login
            if (response.ok) {
                console.log('Login successful');
                const data = await response.json(); 
                localStorage.setItem('user', JSON.stringify(data.user));
                setError('');
                window.alert('Login Successful');
                navigate('/');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
                window.alert(errorMessage);
            }
        } catch(error) {
            console.error('Error:', error);
            setError('An error occurred while logging in.');
            res.status(500).send('Interal Server Error');
            window.alert('An error occurred while logging in.');
        }
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Username">Username</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                    <input type="submit" value="Login"></input>
                    <p>{error}</p>
                </form>
            </div>
        </>
    )
}