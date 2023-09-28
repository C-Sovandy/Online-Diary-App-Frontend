// pages/edit.js
import { useRouter } from 'next/router';
import ViewDiary from '../components/ViewDiary';

function ViewPage({ diary }) {
  // Fetch the diary entry details using diaryId
 return (
    <ViewDiary diary={diary}/>
 );
}
export async function getServerSideProps(context) {
    // Retrieve the diaryId from the query parameters
    const { diaryId } = context.query;
  
    // Construct the URL for fetching the diary entry data
    const apiUrl = `http://localhost:8081/diary/${diaryId}`;
  
    try {
      // Make the API call to get the diary entry data
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch diary entry with ID ${diaryId}`);
      }
  
      // Parse the response data as JSON
      const diary = await response.json();
  
      // Pass the diary entry data as a prop to the page component
      return {
        props: { diary },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
  
      // Redirect to an error page or handle the error as needed
      return {
        redirect: {
          destination: '/error', // Replace with your error page URL
          permanent: false,
        },
      };
    }
  }


export default ViewPage;
