import { useEffect, useState } from "react";
import Filter from "./Filter";
import DisplayBooks from "./DisplayBooks";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("Fantasy"); 

  const fetchBooks = async (cat) => {
    const q = `subject:${cat}`;

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=20`
    );
    const data = await res.json();
    setBooks(data.items || []);
  };

  // Fetch when category changes
  useEffect(() => {
    fetchBooks(category);
  }, [category]);

  return (
    <div>
      <Filter onCategoryChange={setCategory} />
      <DisplayBooks books={books} />
    </div>
  );
};

export default BooksPage;