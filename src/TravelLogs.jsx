import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Nav from "./Nav";
import AddImg from "./assets/AddImage.png";

function TravelLogs() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(AddImg);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const email = Cookies.get('userEmail');
    setIsLoggedIn(!!email);
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !details) {
      setError('Title and details are required.');
      return;
    }

    if (!isLoggedIn) {
      setError('Please log in to post a travel log.');
      return;
    }

    setError(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('details', details);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost/my-app-api/TravelLogs.php', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert('Travel log posted successfully!');
        setTitle('');
        setDetails('');
        setImage(null);
        setImagePreview(AddImg);
      } else {
        setError(result.error || 'Failed to post travel log. Please try again.');
      }
    } catch (err) {
      setError('Failed to post travel log: Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div
        className="w-full min-h-screen pt-[100px] flex flex-col items-center font-outfit"
        style={{ background: 'linear-gradient(to bottom, rgba(255, 204, 102, 0.17), rgba(255, 204, 102, 0.68))' }}
      >
        <div className="w-[90%]">
          <h1>Travel Logs</h1>
        </div>
        <div className="w-[90%] h-[350px] bg-[#FFF6F6] flex flex-col items-center">
          <div className="w-[95%]">
            <h5>{new Date().toLocaleDateString()}</h5>
          </div>
          <div className="w-full flex flex-col items-center gap-3 mt-4">
            <input
              className="w-[95%] border border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-[95%] border border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Enter Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="w-[95%] h-[40%] mt-[20px] flex flex-col items-start">
            <label htmlFor="image-upload" className="cursor-pointer w-full h-full">
              <img
                className="h-[100%] object-contain"
                src={imagePreview}
                alt="Add or Preview Image"
              />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-[100%] flex flex-row items-end justify-end">
              <button
                className="bg-[#993300] text-[#FFCC66] px-4 py-2 rounded-md hover:bg-[#7A2A00]"
                onClick={handleSubmit}
                disabled={isLoading || !isLoggedIn}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default TravelLogs;