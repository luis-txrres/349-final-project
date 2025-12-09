import React, { useContext } from "react";
import { BookListContext } from "../contexts/BookListContext";

const Checkout = () => {
  const { bookList } = useContext(BookListContext);

  const total = bookList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (bookList.length === 0)
    return <div className="empty-booklist">Your Book List is empty!</div>;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <br />
      <div className="checkout-content">

        <form className="checkout-form">
          <h3>Billing & Shipping Information</h3>

          <label>
            Full Name
            <input type="text" placeholder="Patrick Star" />
          </label>

          <label>
            Email
            <input type="email" placeholder="patrick@gmail.com" />
          </label>

          <label>
            Phone
            <input type="tel" placeholder="(123) 456-7890" />
          </label>

          <label>
            Address
            <input type="text" placeholder="123 Sponge St, Bikini Bottom" />
          </label>

          <h3>Payment Details</h3>

          <label>
            Card Number
            <input type="text" placeholder="1234 5678 9012 3456" />
          </label>

          <div className="checkout-card-row">
            <label>
              Expiry
              <input type="text" placeholder="MM/YY" />
            </label>

            <label>
              CVV
              <input type="text" placeholder="123" />
            </label>
          </div>

          <button type="button" className="checkout-button">
            Complete Purchase
          </button>
        </form>

        {/*order summary*/}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <br />
          {bookList.map((b) => (
            <div key={b.id} className="checkout-summary-item">
              <p>{b.title} x {b.quantity}</p>
              <p>${(b.price * b.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="checkout-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
