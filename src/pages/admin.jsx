  import React, { useEffect, useState } from 'react';
  import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
  import { db } from '../auth/firebase'; // Ensure this is your Firebase config path
  import { Table, Button, Modal, Form } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';

  const Admin = () => {
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showEditMovieModal, setShowEditMovieModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedImageFile, setUpdatedImageFile] = useState(null); // Use state for the image file
    const [updatedCategory, setUpdatedCategory] = useState(""); 
    const [newMovie, setNewMovie] = useState({ title: "", image: "", category: "" });
    const [newCategory, setNewCategory] = useState({ name: "" });
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedRole, setUpdatedRole] = useState("");
    const [updatedurl, setUpdatedurl] = useState("");

  const navigate= useNavigate()
    // Fetch users, movies, and categories
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const usersCollection = collection(db, 'users');
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

      const fetchCategories = async () => {
        try {
          const categoriesCollection = collection(db, 'categories');
          const categoriesSnapshot = await getDocs(categoriesCollection);
          const categoryList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCategories(categoryList);
        } catch (error) {
          console.error("Error fetching categories: ", error);
        }
      };

      fetchUsers();
      fetchMovies();
      fetchCategories();
    }, []);

    // Add new movie function

    // Edit user function
    const handleEditUser = async () => {
      if (selectedUser) {
        try {
          const userRef = doc(db, 'users', selectedUser.id);
          await updateDoc(userRef, {
            email: updatedEmail,
            role: updatedRole,
          });
          setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, email: updatedEmail, role: updatedRole } : user)));
          setShowEditUserModal(false);
          setSelectedUser(null);
        } catch (error) {
          console.error("Error updating user: ", error);
        }
      }
    };

    // Show edit movie modal
    const handleShowEditMovieModal = (movie) => {
      setSelectedMovie(movie);
      setUpdatedTitle(movie.title);
      setUpdatedurl(movie.url);
      setUpdatedImageFile(null); // Reset the image file
      setUpdatedCategory(movie.category || "");
      setShowEditMovieModal(true);
    };
  
    const handleEditMovie = async () => {
      if (selectedMovie) {
        let imageUrl = selectedMovie.image; // Default to current image URL
  
        // If a new image file is selected, upload it
        if (updatedImageFile) {
          const storageRef = ref(storage, `movies/${selectedMovie.id}/${updatedImageFile.name}`);
          await uploadBytes(storageRef, updatedImageFile);
          imageUrl = await getDownloadURL(storageRef); // Get the new image URL
        }
  
        try {
          const movieRef = doc(db, 'movies', selectedMovie.id);
          await updateDoc(movieRef, {
            title: updatedTitle,
            url:url,
            image: imageUrl,
            category: updatedCategory,
          });
          setMovies(movies.map(movie => (movie.id === selectedMovie.id ? { ...movie, title: updatedTitle, image: imageUrl, category: updatedCategory } : movie)));
          setShowEditMovieModal(false);
          setSelectedMovie(null);
        } catch (error) {
          console.error("Error updating movie: ", error);
        }
      }
    };
  

    // Show edit user modal
    const handleShowEditUserModal = (user) => {
      setSelectedUser(user);
      setUpdatedEmail(user.email);
      setUpdatedRole(user.role);
      setShowEditUserModal(true);
    };

    // Add new category function
    const handleAddCategory = async () => {
      try {
        await addDoc(collection(db, 'categories'), { name: newCategory.name });
        setNewCategory({ name: "" });
        setShowAddCategoryModal(false);
        fetchCategories(); // Refresh categories
      } catch (error) {
        console.error("Error adding category: ", error);
      }
    };

    // Show edit category modal
    const handleShowEditCategoryModal = (category) => {
      setSelectedCategory(category);
      setUpdatedCategory(category.name);
      setShowEditCategoryModal(true);
    };

    const handleEditCategory = async () => {
      if (selectedCategory) {
        try {
          const categoryRef = doc(db, 'categories', selectedCategory.id);
          await updateDoc(categoryRef, { name: updatedCategory });
          setCategories(categories.map(category => (category.id === selectedCategory.id ? { ...category, name: updatedCategory } : category)));
          setShowEditCategoryModal(false);
          setSelectedCategory(null);
        } catch (error) {
          console.error("Error updating category: ", error);
        }
      }
    };

    // Delete movie function
    const handleDeleteMovie = async (id) => {
      try {
        await deleteDoc(doc(db, 'movies', id));
        setMovies(movies.filter(movie => movie.id !== id));
      } catch (error) {
        console.error("Error deleting movie: ", error);
      }
    };

    // Delete user function
    const handleDeleteUser = async (id) => {
      try {
        await deleteDoc(doc(db, 'users', id));
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    };

    // Delete category function
    const handleDeleteCategory = async (id) => {
      try {
        await deleteDoc(doc(db, 'categories', id));
        setCategories(categories.filter(category => category.id !== id));
      } catch (error) {
        console.error("Error deleting category: ", error);
      }
    };

    return (
      <div className="container mt-5">
        <h1 className="text-center">Admin Panel</h1>

        {/* Add Movie Section */}
        <h2 className="mt-4 text-warning">Manage Movies</h2>
        <Button variant="warning" onClick={() => navigate('/upload')}>Add Movie +</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Movie ID</th>
              <th>Title</th>
              <th>Category</th>
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
                  <td>{movie.category}</td>
                  <td><img src={movie.image} alt={movie.title} style={{ width: '100px', height: '100px' }} /></td>
                  <td>
                    <Button variant="warning me-2" onClick={() => handleShowEditMovieModal(movie)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteMovie(movie.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No movies found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Manage Categories Section */}
        <h2 className="mt-4 text-warning">Manage Categories</h2>
        <Button variant="warning" onClick={() => setShowAddCategoryModal(true)} >Add Category + </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Button variant="warning me-2" onClick={() => handleShowEditCategoryModal(category)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No categories found.</td>
              </tr>
            )}
          </tbody>
        </Table>
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
                    <Button variant="warning me-2" onClick={() => handleShowEditUserModal(user)}>Edit</Button>
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


        {/* Edit Movie Modal */}
        <Modal show={showEditMovieModal} onHide={() => setShowEditMovieModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMovieTitle">
              <Form.Label className='text-warning'>Movie Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMovieTitle">
              <Form.Label className='text-warning'>Movie Url</Form.Label>
              <Form.Control
                type="text"
                value={updatedurl}
                onChange={(e) => setUpdatedurl(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMovieImage">
              <Form.Label className='text-warning'>Upload New Movie Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setUpdatedImageFile(e.target.files[0])} // Set the selected file
              />
            </Form.Group>
            <Form.Group controlId="formMovieCategory">
              <Form.Label className='text-warning'>Movie Category</Form.Label>
              <Form.Control
                as="select"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditMovieModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditMovie}>Save changes</Button>
        </Modal.Footer>
      </Modal>

        {/* Edit User Modal */}
        <Modal show={showEditUserModal} onHide={() => setShowEditUserModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserEmail">
                <Form.Label className='text-warning'>User Email</Form.Label>
                <Form.Control
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formUserRole">
                <Form.Label className='text-warning'>User Role</Form.Label>
                <Form.Control
                  as="select"
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditUserModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleEditUser}>Save changes</Button>
          </Modal.Footer>
        </Modal>

        {/* Add Category Modal */}
        <Modal show={showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCategoryName">
                <Form.Label className='text-warning'>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleAddCategory}>Add Category</Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Category Modal */}
        <Modal show={showEditCategoryModal} onHide={() => setShowEditCategoryModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCategoryName">
                <Form.Label className='text-warning'>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditCategoryModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleEditCategory}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  export default Admin;
