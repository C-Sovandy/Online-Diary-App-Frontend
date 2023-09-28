// pages/edit.js
import { useRouter } from 'next/router';
import New from '../components/NewDiary';

function NewDiary({userid}) {
    console.log('userid', userid);
  // Fetch the diary entry details using diaryId
  // The diary entry data is passed as a prop from getServerSideProps

  return (
    <div className="container mx-auto p-4">
      <New userId={userid}/>
      {/* Add edit functionality or components here */}
    </div>
  );
}


export async function getServerSideProps(context) {
    // Retrieve the diaryId from the query parameters
    const { userid } = context.query;
  

      return {
        props: {userid},
      };
    
    
  }
// This function will be called at build time to fetch the initial data for the page

export default NewDiary;
