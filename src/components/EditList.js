import React, { useState } from 'react';
import axios from 'axios';

function EditList({ diary }) {
  const [editedTitle, setEditedTitle] = useState(diary.title);
  const [editedContent, setEditedContent] = useState(diary.content);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedDiary = {
        title: editedTitle,
        creationDate: diary.creationDate,
        happenedDate: diary.happenedDate,
        content: editedContent,
        usersId: diary.usersId,
      };

      const serverUrl = process.env.LOCAL_URL;
      // Send a PUT request to update the diary entry
      const response = await axios.put(`${serverUrl}/diary/${diary.diaryId}`, updatedDiary);

      if (response.status === 200) {
        // Diary entry updated successfully, you can handle the response as needed
        console.log('Diary entry updated successfully');
        setSuccessMessage('Diary entry updated successfully');
        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        // Handle errors or display a message if the update fails
        console.error('Failed to update diary entry');
      }
    } catch (error) {
      console.error('Error updating diary entry:', error);
    }
  };

  return (
    <div>
     
      <h3 className="text-4xl font-semibold pb-6">{editedTitle}</h3>
      <h4 className="text-1xl font-semibold">Created date: {diary.creationDate}</h4>
      <h4 className="text-1xl font-semibold">Happened date: {diary.happenedDate}</h4>
      <p className="text-gray-600">
      {successMessage && (
        <div className="bg-green-500 text-white p-2 mb-2 rounded">{successMessage}</div>
      )}
        <textarea
          value={editedContent}
          onChange={handleContentChange}
          className="h-40 w-full border rounded mt-4 p-4"
        />
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}

export default EditList;
