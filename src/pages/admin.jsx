import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../auth/firebase'; // Ensure this is your Firebase config path
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users'); // Adjust your collection name accordingly
        const usersSnapshot = await getDocs(usersCollection);
        const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);
        const movieList = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMovies(movieList);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchUsers();
    fetchMovies();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteDoc(doc(db, 'movies', movieId));
      setMovies(movies.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error("Error deleting movie: ", error);
    }
  };

  const handleShowEditModal = (movie) => {
    setSelectedMovie(movie);
    setUpdatedTitle(movie.title);
    setUpdatedImage(movie.image);
    setShowEditModal(true);
  };

  const handleEditMovie = async () => {
    if (selectedMovie) {
      try {
        const movieRef = doc(db, 'movies', selectedMovie.id);
        await updateDoc(movieRef, {
          title: updatedTitle,
          image: updatedImage,
        });
        // Update the local state
        setMovies(movies.map(movie => (movie.id === selectedMovie.id ? { ...movie, title: updatedTitle, image: updatedImage } : movie)));
        setShowEditModal(false);
        setSelectedMovie(null);
      } catch (error) {
        console.error("Error updating movie: ", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Admin Panel</h1>
      
      <h2 className="mt-4 text-warning">Registered Users</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2 className="mt-4 text-warning">Uploaded Movies</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Movie ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>
                  <img src={movie.image} alt={movie.title} style={{ width: '100px', height: 'auto' }} />
                </td>
                <td>
                  <Button variant="warning me-2" onClick={() => handleShowEditModal(movie)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteMovie(movie.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No movies found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Edit Movie Modal */}
      <Modal  show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header  closeButton>
          <Modal.Title className='text-black'>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
          <Form >
            <Form.Group controlId="formMovieTitle">
              <Form.Label className=' text-warning'>Title</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedTitle} 
                onChange={(e) => setUpdatedTitle(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formMovieImage">
              <Form.Label className=' text-warning' >Video URL</Form.Label>
              <Form.Control 
                type="text" 
                value={updatedImage} 
                onChange={(e) => setUpdatedImage(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formMovieImage">
              <Form.Label className='text-warning'>Upload New Image</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={(e) => setSelectedFile(e.target.files[0])} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer >
          <Button className='btn btn-danger '  variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button className='btn btn-warning'  variant="primary" onClick={handleEditMovie}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
