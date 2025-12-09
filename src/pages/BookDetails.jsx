import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookListContext } from '../contexts/BookListContext';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Reviews from '../components/Reviews';

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

  const info = book.volumeInfo;

  return (
    <>
      <h1 className="details-header">About</h1>

      <div className="details-container">
        <img
          src={info.imageLinks?.thumbnail}
          alt={info.title}
        />
        <div className="details-info">
          <h1>{info.title}</h1>
          <p>{info.authors?.join(", ") || "Unknown Author"}</p>
          
          <div className="extra-details">
            {info.publishedDate && (
              <p><strong>Published:</strong> {info.publishedDate}</p>
            )}

            {info.publisher && (
              <p><strong>Publisher:</strong> {info.publisher}</p>
            )}

            {info.pageCount && (
              <p><strong>Pages:</strong> {info.pageCount}</p>
            )}

            {info.categories && (
              <p><strong>Categories:</strong> {info.categories.join(", ")}</p>
            )}

            {info.language && (
              <p><strong>Language:</strong> {info.language.toUpperCase()}</p>
            )}

            {/*isbns*/}
            {info.industryIdentifiers?.length > 0 && (
              <>
                <p><strong>ISBN-10:</strong> {info.industryIdentifiers.find(i => i.type === "ISBN_10")?.identifier || "N/A"}</p>
                <p><strong>ISBN-13:</strong> {info.industryIdentifiers.find(i => i.type === "ISBN_13")?.identifier || "N/A"}</p>
              </>
            )}

            {/*the preview link*/}
            {info.previewLink && (
              <p>
                <a
                  href={info.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-link"
                >
                  🔗 Preview this book
                </a>
              </p>
            )}
          </div>

          {/* description*/}
          {info.description && (
            <p className="book-description">
              <span>Description</span>
              <br /><br />
              {info.description}
            </p>
          )}

          {/*Add to booklist button*/}
          <button
            onClick={() => {
              addToBookList({
                id,
                title: info.title,
                authors: info.authors,
                image: info.imageLinks?.thumbnail,
                published: info.publishedDate,
                price: Number((Math.random() * (25 - 5) + 5).toFixed(2)),
              });

              toast.success(`Added ${info.title} to your Book List!`, {
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

          <div className="back-button">
            <NavLink to="/">
              <button className="checkout-button">Back to Book Search</button>
            </NavLink>
          </div>

          <Reviews bookId={id} />

        </div>
      </div>
    </>
  );
};

export default BookDetails;