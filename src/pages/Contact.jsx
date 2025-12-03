import React from "react";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <p className="contact-description">
        Have questions or feedback? We'd love to hear from you.
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="tel" placeholder="Phone Number" />

        <textarea placeholder="Your Message" rows="5" required></textarea>

        <button type="submit" className="checkout-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;