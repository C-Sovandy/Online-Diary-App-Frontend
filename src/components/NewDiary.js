import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function New({userId}) {
  const router = useRouter();
const [redirectTo, setRedirectTo] = useState(null);

  const [title, setTitle] = useState('');
  const [happenedDate, setHappenedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with the current date
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleHappenedDateChange = (e) => {
    setHappenedDate(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreate = async () => {
    try {
      const newDiary = {
        title:title,
        creationDate: new Date().toISOString().split('T')[0], // Set creationDate to the current date
        happenedDate:happenedDate,
        content:content,
        usersId: userId, // Use userId from the URL
      };
      console.log(newDiary);

      // Send a POST request to create a new diary entry
      const serverUrl = process.env.LOCAL_URL;
      const response = await axios.post(`${serverUrl}/diary/create`, newDiary);
      console.log( response.json);
      if (response.status === 201) {
        // Diary entry created successfully
        console.log('Diary entry created successfully');
        setSuccessMessage('Diary entry created successfully');
        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 1000);
        setTimeout(() => {
          setRedirectTo('/home');
        }, 1000);
        router.push(redirectTo);
      } else {
        // Handle errors or display a message if the creation fails
        console.error('Failed to create diary entry');
      }
    } catch (error) {
      console.error('Error creating diary entry:', error);
    }
  };

 

  useEffect(() => {
    // Check if a redirection route is set
    if (redirectTo) {
      router.push(redirectTo); // Redirect to the specified route
    }
  }, [redirectTo, router]);


  return (
    <div>
      
      <h4 className="text-1xl font-semibold">Created date: {new Date().toISOString().split('T')[0]}</h4>
     
      <p className="text-gray-600">
        {successMessage && (
          <div className="bg-green-500 text-white p-2 mb-2 rounded">{successMessage} </div>
        )}
        </p>

        <h3 className="text-1xl font-semibold  pt-4 ">Title:</h3>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
          className="w-full border rounded mt-1 p-4"
        />


        <h4 className="text-1xl pt-3 font-semibold">Happened date: </h4>
        <input
          type="date"
          value={happenedDate}
          onChange={handleHappenedDateChange}
          placeholder="Select happened date"
          className="w-full border rounded mt-1 p-4"
        />

        <h4 className="text-1xl pt-3 font-semibold">Diary Contents: </h4>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Enter content"
          className="h-80 w-full border rounded pt-1"
        />
   
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
}

export default New;
