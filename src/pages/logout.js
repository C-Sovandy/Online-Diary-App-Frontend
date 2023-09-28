import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie ,removeCookie } from '../utils/cookie';
const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Send a request to your Spring Boot server to perform the logout
    // You can use an HTTP library like axios for this purpose

    // Assuming you have an API endpoint for logout in Spring Boot
    // Replace '/api/logout' with your actual logout endpoint
    fetch('http://localhost:8081/auth/logout', {
      method: 'GET',
      credentials: 'include', // Include cookies if you use session-based authentication
    })
      .then(() => {
        // Redirect to the home page or login page after logout
        const tokenFromCookie = getCookie('sessionToken');

        if (tokenFromCookie) {
          removeCookie('sessionToken');
        }
        router.push('/login'); // Change the route as needed
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  }, [router]);

  return (
    <div>
      <p>Logging out...</p>
      {/* You can display a loading indicator or message here */}
    </div>
  );
};

export default Logout;
