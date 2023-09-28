import React, { useState, useEffect } from 'react';
import './styles/DateFilter.css'; // Import the CSS file

function DateFilter({ onFilter }) {
  // Get the current date in YYYY-MM-DD format (e.g., "2023-09-27")
  const currentDate = new Date().toISOString().split('T')[0];

  // Calculate the default endDate as the current date
  const [endDate, setEndDate] = useState(currentDate);

  // Calculate the default startDate as one month before the endDate
  const defaultStartDate = new Date(endDate);
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);
  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);

  const [keyword, setKeyword] = useState('');

  const handleFilterClick = () => {
    onFilter({ startDate, endDate, keyword });
  };

  // Call the onFilter function with the default values when the component mounts
  useEffect(() => {
    onFilter({ startDate, endDate, keyword });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="date-filter-container">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-input"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="date-input"
      />
      {/* <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="keyword-input"
      /> */}
      <button onClick={handleFilterClick} className="filter-button">
        Filter
      </button>
    </div>
  );
}

export default DateFilter;
