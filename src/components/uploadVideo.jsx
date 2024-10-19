import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // State to store categories

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();
  const route = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, "categories"); // Assuming you have a 'categories' collection
        const categorySnapshot = await getDocs(categoriesCollection);
        const categoryList = categorySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name // Adjust according to your category document structure
        }));
        setCategories(categoryList);
      } catch (err) {
        console.error("Error fetching categories: ", err);
        setError("Error fetching categories: " + err.message);
      }
    };

    fetchCategories();
  }, [db]);
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

      // Get the download URL after uploading
      const downloadURL = await getDownloadURL(storageRef); // Retrieve the URL

      const movieData = {
        title,
        url,
        image: downloadURL, // Use the retrieved download URL
        userId: auth.currentUser.uid,
        category
      };

      const docRef = await addDoc(collection(db, "movies"), movieData);
      console.log("Movie uploaded with ID: ", docRef.id);
      setTitle("");
      setUrl("");
      setCategory("");
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
          <label className='text-light'>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
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
        <button type="submit" className="btn next-btn me-5">Upload Movie</button>
      </form>
    </div>
  );
};

export default VideoForm;
