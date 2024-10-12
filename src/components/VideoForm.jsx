import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const VideoForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();
const route=useNavigate()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setError(null); // Clear any previous errors
    } else {
      setImageFile(null);
      setError('Please upload a valid image file (e.g., .jpg, .png).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setError("You must be logged in to upload a video.");
      return;
    }

    if (!imageFile) {
      setError("Please select an image file to upload.");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      const downloadURL = await getDownloadURL(storageRef);

      const movieData = {
        title,
        url,
        image: downloadURL,
        userId: auth.currentUser.uid,
      };

      const docRef = await addDoc(collection(db, "movies"), movieData);
      console.log("Movie uploaded with ID: ", docRef.id);
      setTitle("");
      setUrl("");
      setImageFile(null);
      route('/all-movies');

    } catch (err) {
      console.error("Error uploading movie: ", err);
      setError("Error uploading movie: " + err.message);
    }
  };

  return (
    <div className='container col-6 border p-4 bg-dark rounded-4 login'>
      <h1 className='text-light'>Upload a Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='text-light'>Movie Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie title"
            className="form-control"
            required
          />
        </div>
        <div className="form-group my-3">
          <label className='text-light'>Movie URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter movie URL"
            className="form-control"
            required
          />
        </div>
        <div className="form-group my-3">
          <label className='text-light'>Movie Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
       <a href="/all-movies"> <button type="submit" className="btn next-btn me-5">Upload Movie</button></a>
      </form>
    </div>
  );
};

export default VideoForm;
