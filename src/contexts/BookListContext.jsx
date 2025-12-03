
// import { createContext, useState } from "react";

// export const BookListContext = createContext();

// export const BookListProvider = ({ children }) => {
//   const [bookList, setBookList] = useState([]);

//   const addToBookList = (book) => {
//     setBookList((prev) => {
//       const exists = prev.find((item) => item.id === book.id);

//       if (exists) {
//         // increase quantity
//         return prev.map((item) =>
//           item.id === book.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       // new book → add quantity = 1
//       return [...prev, { ...book, quantity: 1 }];
//     });
//   };

//   const increaseQty = (id) => {
//     setBookList((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setBookList((prev) =>
//       prev
//         .map((item) =>
//           item.id === id
//             ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//             : item
//         )
//         // If quantity goes to 0, remove item
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeFromBookList = (id) => {
//     setBookList((prev) => prev.filter((b) => b.id !== id));
//   };

//   return (
//     <BookListContext.Provider
//       value={{
//         bookList,
//         addToBookList,
//         increaseQty,
//         decreaseQty,
//         removeFromBookList,
//       }}
//     >
//       {children}
//     </BookListContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const BookListContext = createContext();

export const BookListProvider = ({ children }) => {
  const [bookList, setBookList] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("bookList");
    return stored ? JSON.parse(stored) : [];
  });

  // Save bookList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookList", JSON.stringify(bookList));
  }, [bookList]);

  const addToBookList = (book) => {
    setBookList((prevList) => {
      const existing = prevList.find((b) => b.id === book.id);

      if (existing) {
        return prevList.map((b) =>
          b.id === book.id ? { ...b, quantity: b.quantity + 1 } : b
        );
      }

      return [...prevList, { ...book, quantity: 1 }];
    });
  };

  const removeFromBookList = (id) => {
    setBookList((prevList) => prevList.filter((b) => b.id !== id));
  };

  const clearBookList = () => {
    setBookList([]); 
  };

  const increaseQty = (id) => {
    setBookList((prevList) =>
      prevList.map((b) =>
        b.id === id ? { ...b, quantity: b.quantity + 1 } : b
      )
    );
  };

  const decreaseQty = (id) => {
    setBookList((prevList) =>
      prevList
        .map((b) =>
          b.id === id ? { ...b, quantity: Math.max(1, b.quantity - 1) } : b
        )
        .filter((b) => b.quantity > 0)
    );
  };

  return (
    <BookListContext.Provider
      value={{ bookList, 
               addToBookList, 
               removeFromBookList,
               clearBookList, 
               increaseQty, 
               decreaseQty }}
    >
      {children}
    </BookListContext.Provider>
  );
};