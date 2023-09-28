import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link component
import ConfirmationModal from './ConfirmationModal';


const serverUrl = process.env.LOCAL_URL;



function DiaryList({ userDiaries, filter }) {
  const [diaries, setDiaries] = useState(userDiaries.diary);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState({diaryId: null });

  const handleDeleteClick = (id) => {
    console.log('id', id);
    setDeleteUrl({ diaryId: id });
    console.log('state:', deleteUrl.diaryId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isModalOpen && deleteUrl.diaryId !== null) {
      const url = serverUrl+"/diary/"+deleteUrl.diaryId;
      console.log(url);
      axios
        .delete(url)
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            const updatedDiaries = diaries.filter((diary) => diary.diaryId !== deleteUrl.diaryId);

            setDiaries(updatedDiaries);
            console.log('You have deleted the diary successfully');
          }
        })
        .catch((err) => {
          console.error('There was an error:', err);
        });

      setIsModalOpen(false);
    }
  };

  const filterDiaries = () => {
    // Filter diaries based on the selected date range and keyword
    const filteredDiaries = userDiaries.diary.filter((diary) => {
      // Filter by date range
      const diaryDate = new Date(diary.creationDate).toISOString().split('T')[0];
      const startDate = new Date(filter.startDate).toISOString().split('T')[0];
      const endDate = new Date(filter.endDate).toISOString().split('T')[0];

      // Check if the diary date is within the selected date range
      if (diaryDate < startDate || diaryDate > endDate) {
        return false;
      }

      // Filter by keyword (case-insensitive)
      if (filter.keyword && diary.content.toLowerCase().includes(filter.keyword.toLowerCase())) {
        return true;
      }

      return true; // Include the diary if no keyword is provided
    });

    // Update the diaries state with the filtered list
    setDiaries(filteredDiaries);
  };

  useEffect(() => {
    // Populate diaries initially with userDiaries.diary
    setDiaries(userDiaries.diary);
  }, [userDiaries]);

  useEffect(() => {
    // Call filterDiaries when the filter prop changes
    filterDiaries();
  }, [filter]);

  return (
    <div>
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmDelete} />

      <ul>
        {diaries.map((diary) => (
          <li key={diary.diaryId} className="mb-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold">{diary.title}</h2>
              <h4 className="text-gray-600">Creation Date: {diary.creationDate}</h4>
              <h4 className="text-gray-600">Happened Date: {diary.happendDate}</h4>
              <p className="text-black-600 pt-4">{diary.content}</p>
              <div className="mt-4">
                <Link href={`/view?diaryId=${diary.diaryId}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    View
                  </button>
                </Link>
                <Link href={`/edit?diaryId=${diary.diaryId}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(diary.diaryId)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryList;