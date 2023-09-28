import React, { Suspense, useState, useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import DateFilter from '@/components/DateFilter';
import Link from 'next/link'; 
import axios from 'axios';

const serverUrl = process.env.LOCAL_URL;

const DiaryList = dynamic(() => import('../components/DiaryList'), {
  loading: () => <p>Loading...</p>,
});

function HomePage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState(null);
  const [userDiaries, setUserDiaries] = useState({ username: '', diary: [] });
  const isAuthenticated = !!usersData;
  const [filter, setFilter] = useState({ startDate: null, endDate: null, keyword: '' }); // Initialize with user's diaries
  const currentDate = new Date().toISOString().split('T')[0];
  const defaultEndDate = currentDate; // The default endDate is the current date
  const defaultStartDate = new Date(currentDate);
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 1); // The default startDate is one month before the endDate
  useEffect(() => {
    const tokenFromCookie = getCookie('sessionToken');

    if (tokenFromCookie) {
      const parsedToken = JSON.parse(tokenFromCookie);
      setUsersData(parsedToken);

      const url = serverUrl + '/users/1';
      axios
        .get(url)
        .then((userResponse) => {
          const userData = userResponse.data;
          const diaryData = userData.diary;
          setUserDiaries({
            username: userData.username,
            diary: diaryData,
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleFilter = ({ startDate, endDate, keyword }) => {
    // Update the filter state here
    setFilter({ startDate, endDate, keyword });
  };
  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Hello, {usersData.username}, {usersData.userId}
          </h3>

          <DateFilter
          onFilter={handleFilter}
          defaultStartDate={defaultStartDate.toISOString().split('T')[0]}
          defaultEndDate={defaultEndDate}
        />
      <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-4">  
      <Link href={`/newdiary?userid=${usersData.userId}`}>
       <button
                  onClick={() => {console.log('add new')} }
                  className="bg-blue-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                 >
                  Add New
                </button>
       </Link>
              </div>
        <DiaryList
          userId={usersData.userId}
          userDiaries={userDiaries}
          filter={filter} // Pass the filter to the DiaryList component
        />
      </Suspense>
        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default HomePage;
