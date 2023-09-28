import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/login.css'; // Import the CSS for styling
import { setCookie, getCookie } from '../utils/cookie';


function LoginPage() {



  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const router = useRouter(); // Get the router object

  // State variable to manage redirection
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    // Check if a redirection route is set
    if (redirectTo) {
      router.push(redirectTo); // Redirect to the specified route
    }
  }, [redirectTo, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your Spring Boot API to authenticate the user
      const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Redirect or perform actions upon successful login
     
        const userInfo = await response.json();                                                
        const userData = {
          userId: userInfo.userId,
          username: userInfo.username,
        };
        
        console.log(userData);
        console.log('Login successful');
    
        setCookie('sessionToken', JSON.stringify(userData) ); 
        setRedirectTo('/home');
      } else {
        // Handle authentication errors
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button  className="bg-blue-500 hover:bg-blue-700 w-20 text-white font-bold py-2 px-4 rounded mr-2" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
