import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookListContext } from "../contexts/BookListContext";

const BookList = () => {
  const { bookList, increaseQty, decreaseQty, removeFromBookList, clearBookList } =
    useContext(BookListContext);
  const navigate = useNavigate(); 

  const total = bookList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (bookList.length === 0)
    return <div className="empty-booklist">Your Book List is empty!</div>;

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <h2>Your Book List</h2>
        <p>{bookList.reduce((total, book) => total + book.quantity, 0)} item(s)</p>
      </div>

      <button className = "clear-button" 
      onClick = {clearBookList}> Clear Book List </button>
      <br />
      <br />
      <div className="cart-list">
        {bookList.map((b) => (
          <div className="cart-item" key={b.id}>
            <img className="cart-item-image" src={b.image} alt={b.title} />

            <div className="cart-item-info">
              <h3>{b.title}</h3>
              <p>{b.authors?.join(", ") || "Unknown Author"}</p>
              <p className="cart-item-price">${b.price.toFixed(2)}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(b.id)}>-</button>
                <span>{b.quantity}</span>
                <button onClick={() => increaseQty(b.id)}>+</button>
              </div>
            </div>


            <div className="cart-item-actions">
              <button onClick={() => removeFromBookList(b.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">Total: ${total.toFixed(2)}</div>
        <button
          className="checkout-button"
          onClick={() => navigate("/checkout")} 
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BookList;

