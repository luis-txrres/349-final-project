import React, { useState, useEffect } from "react";

const Reviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${bookId}`);
    if (stored) setReviews(JSON.parse(stored));
  }, [bookId]);

  // Add new review
  const handleAddReview = () => {
    if (!name.trim() || !comment.trim()) return;

    const newReview = { name, comment, rating, date: new Date().toISOString() };
    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem(`reviews_${bookId}`, JSON.stringify(updated));

    // Clear form
    setName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="reviews-container">
      <h3>User Reviews</h3>

      <div className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Write a review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>
        <button onClick={handleAddReview}>Add Review</button>
      </div>

      <div className="review-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r, idx) => (
          <div className="review-item" key={idx}>
            <strong>{r.name}</strong> ({r.rating} ⭐)
            <p>{r.comment}</p>
            <small>{new Date(r.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;