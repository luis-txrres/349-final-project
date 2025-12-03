
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import DisplayBooks from "../components/DisplayBooks";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("Fantasy");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const booksPerPage = 20;

  const fetchBooks = async (startIndex = 0) => {
    try {
      const q = searchQuery
        ? searchQuery
        : category
        ? `subject:${category}`
        : "bestsellers";

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          q
        )}&startIndex=${startIndex}&maxResults=${booksPerPage}`
      );

      const data = await res.json();

      setBooks(data.items || []);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [searchQuery, category]);

  
  useEffect(() => {
    fetchBooks(page * booksPerPage);
  }, [page, searchQuery, category]);

  const totalPages = Math.ceil(totalItems / booksPerPage);

  return (
    <div className="home-page">
      <div className="search-container">
        <SearchBar setQuery={setSearchQuery} />
        <Filter onCategoryChange={setCategory} />
      </div>

      <DisplayBooks books={books} />

      {totalItems > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {page + 1} of {totalPages || 1}
          </span>

          <button
            className="pagination-btn"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

