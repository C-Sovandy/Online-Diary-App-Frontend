// pages/edit.js
import { useRouter } from 'next/router';
import EditList from '../components/EditList';

function EditPage({ diary }) {
  // Fetch the diary entry details using diaryId
  // The diary entry data is passed as a prop from getServerSideProps
  console.log(diary)
  return (
    <div className="container mx-auto p-4">
      <EditList diary={diary} />
      {/* Add edit functionality or components here */}
    </div>
  );
}

// This function will be called at build time to fetch the initial data for the page
export async function getServerSideProps(context) {
  // Retrieve the diaryId from the query parameters
  const { diaryId } = context.query;

  // Construct the URL for fetching the diary entry data
  const serverUrl = process.env.LOCAL_URL;
  const apiUrl = `${serverUrl}/diary/${diaryId}`;

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

export default EditPage;
