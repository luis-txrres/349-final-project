
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookListContext } from '../contexts/BookListContext';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToBookList } = useContext(BookListContext);

  const fetchBookById = async (bookId) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching book:", err);
      return null;
    }
  };

  useEffect(() => {
    const loadBook = async () => {
      const data = await fetchBookById(id);
      setBook(data);
    };
    loadBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <>
      <h1 className="details-header">About</h1>

      <div className="details-container">
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />

        <div className="details-info">
          <h1>{book.volumeInfo.title}</h1>
          <p>{book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
          
          {book.volumeInfo.description && (
            <p>
              <span>Description</span>
              <br /><br />
              {book.volumeInfo.description}
            </p>
          )}

          <button
            onClick={() => {
              addToBookList({
                id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                image: book.volumeInfo.imageLinks?.thumbnail,
                published: book.volumeInfo.publishedDate,
                price: Number((Math.random() * (25 - 5) + 5).toFixed(2)),
              });
                  toast.success(`Added ${book.volumeInfo.title} to your Book List!`, {
                    className: "custom-toast",
                    bodyClassName: "custom-toast-body",
                    progressClassName: "custom-toast-progress",
                    autoClose: 2000,
                  });
              
            }}
            className="checkout-button"
          >
            Add to Book List
          </button>
          
          <div className = "back-button">
            <NavLink to = "/"> <button className = "checkout-button"> Back to Book Search</button></NavLink>
          </div>
          
          
        </div>
      </div>
    </>
  );
};

export default BookDetails;