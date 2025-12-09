import React from "react";
import BookCard from "./BookCard";

const DisplayBooks = ({ books }) => {
  return (
    <div className="books-container">
      <h2>Find Your Book</h2>
      {books.length === 0 && <p>No books found</p>}
      <div className="books-shown">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            image={book.volumeInfo.imageLinks?.thumbnail}
            published={book.volumeInfo.publishedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayBooks;