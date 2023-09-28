function ViewDiary({ diary }) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-semibold">{diary.title}</h2>
          <p className="text-gray-600">Created Date: {diary.creationDate}</p>
          <p className="text-gray-600">Happened Date: {diary.happendDate}</p>
          <p className="text-black-600 pt-4">{diary.content}</p>
        </div>
      </div>
    );
  }
  
  export default ViewDiary;
  