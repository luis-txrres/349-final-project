
import React, { useState, useContext } from "react";
import { BookListContext } from "../contexts/BookListContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { bookList, addToBookList, removeFromBookList } = useContext(BookListContext);

  const [newBook, setNewBook] = useState({
    title: "",
    authors: "",
    image: "",
    price: "",
  });

  const [editBookId, setEditBookId] = useState(null);
  const [editBookData, setEditBookData] = useState({
    title: "",
    authors: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = (e) => { // just adding a book to the booklist due to 
    e.preventDefault();          // time constraints
    if (!newBook.title || !newBook.authors || !newBook.price) return;

    addToBookList({
      id: Date.now().toString(),
      title: newBook.title,
      authors: newBook.authors.split(",").map((a) => a.trim()),
      image: newBook.image,
      price: Number(newBook.price),
      quantity: 1,
    });

    toast.success(`Added ${newBook.title}!`);
    setNewBook({ title: "", authors: "", image: "", price: "" });
  };

  const handleEditBook = (e) => {
    e.preventDefault();
    if (!editBookData.title || !editBookData.authors || !editBookData.price) return;

    const updatedBook = {
      id: editBookId,
      title: editBookData.title,
      authors: editBookData.authors.split(",").map((a) => a.trim()),
      image: editBookData.image,
      price: Number(editBookData.price),
      quantity: 1,
    };

    removeFromBookList(editBookId);
    addToBookList(updatedBook);

    toast.info(`Updated ${editBookData.title}!`);
    setEditBookId(null);
    setEditBookData({ title: "", authors: "", image: "", price: "" });
  };

  const startEdit = (book) => {
    setEditBookId(book.id);
    setEditBookData({
      title: book.title,
      authors: book.authors.join(", "),
      image: book.image,
      price: book.price,
    });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section className="add-book-form">
        <h2>Add New Book</h2>
        <br />
        <form onSubmit={handleAddBook}>
          <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleChange} required />
          <input type="text" name="authors" placeholder="Authors (comma separated)" value={newBook.authors} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL" value={newBook.image} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={newBook.price} onChange={handleChange} required />
          <button type="submit">Add Book</button>
        </form>
      </section>

      <section className="existing-books">
        <h2>Existing Books</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authors.join(", ")}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromBookList(book.id)}>Delete</button>
                  <button onClick={() => startEdit(book)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Form */}
        {editBookId && (
          <div className="edit-book-form">
            <h3>Edit Book</h3>
            <br />
            <form onSubmit={handleEditBook}>
              <input type="text" name="title" value={editBookData.title} onChange={handleEditChange} required />
              <input type="text" name="authors" value={editBookData.authors} onChange={handleEditChange} required />
              <input type="text" name="image" value={editBookData.image} onChange={handleEditChange} />
              <input type="number" name="price" value={editBookData.price} onChange={handleEditChange} required />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditBookId(null)}>Cancel</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;