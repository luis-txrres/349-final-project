// import React from 'react'
// import BookCard from './BookCard'

// const DisplayBooks = () => {
//   return (
    
//     <div className = "books-container">
//         <h2>Find Your Book</h2>
//         <div className = "books-shown">
//             <BookCard />
//         </div>

//     </div>
//   )
// }

// export default DisplayBooks

// import React, { useEffect, useState } from "react";
// import BookCard from "./BookCard";

// const DisplayBooks = () => {
//   const [books, setBooks] = useState([]);

//   const fetchBooks = async (query = "harry potter") => {
//     try {
//       const res = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
//       );
//       const data = await res.json();
//       setBooks(data.items || []); // this is async = allowed
//     } catch (err) {
//       console.error("Error fetching books:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   return (
//     <div className="books-container">
//       <h2>Find Your Book</h2>

//       <div className="books-shown">
//         {books.map((book) => (
//           <BookCard
//             key={book.id}
//             title={book.volumeInfo.title}
//             authors={book.volumeInfo.authors}
//             image={book.volumeInfo.imageLinks?.thumbnail}
//             published={book.volumeInfo.publishedDate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayBooks;

// Old version!!!!!
// import React, { useEffect, useState } from "react";
// import BookCard from "./BookCard";

// const DisplayBooks = () => {
//   const [books, setBooks] = useState([]);

//   const fetchBooks = async (searchQuery = "", category = "") => {
//   try {
//     let q = searchQuery || "bestsellers";  
//     if (category && category !== "all") {
//       q += `+subject:${category}`;          
//     }

//     const res = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=20`
//     );
//     const data = await res.json();
//     setBooks(data.items || []);

//   } catch (err) {
//     console.error("Error fetching books:", err);
//   }
// };

// useEffect(() => {
//   fetchBooks();
// },[]);


//   return (
//     <div className="books-container">
//       <h2>Best Sellers</h2>
//       <div className="books-shown">
//         {books.map((book) => (
//           <BookCard
//             key={book.id}
//             id={book.id}
//             title={book.volumeInfo.title}
//             authors={book.volumeInfo.authors}
//             image={book.volumeInfo.imageLinks?.thumbnail}
//             published={book.volumeInfo.publishedDate}

//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayBooks;

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