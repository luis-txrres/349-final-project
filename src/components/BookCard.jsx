import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookListContext } from "../contexts/BookListContext";
import { toast } from "react-toastify";

const BookCard = ({ id, title, authors, image, published }) => {
  const { addToBookList } = useContext(BookListContext);

  const handleAdd = () => {
    addToBookList({
      id,
      title,
      authors,
      image,
      published,
      price: Number((Math.random() * (25 - 5) + 5).toFixed(2)),
    });

    toast.success(`Added ${title} to your Book List!`, {
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      progressClassName: "custom-toast-progress",
      autoClose: 2000,
    });
  };

  return (
    <div className="entire-book-card">
      <img
        src={image || "https://via.placeholder.com/128x193?text=No+Cover"}
        alt={title}
      />

      <h3>{title}</h3>
      <p>{authors ? authors.join(", ") : "Unknown Author"}</p>
      <p>{published}</p>

      <div className = "buttons">
        <Link className="view-details-button" to={`/book/${id}`}>
          View Book Details
        </Link>
        <button onClick={handleAdd}>Add to Book List</button>
      </div>
    </div>
  );
};

export default BookCard;