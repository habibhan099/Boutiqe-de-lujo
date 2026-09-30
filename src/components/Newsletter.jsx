import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="newsletter">
      <h2>Stay In The Loop</h2>
      <p>Sign up for exclusive offers and new arrivals.</p>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="shop-btn">Subscribe</button>
      </form>

      {submitted && <p className="newsletter-success">Thanks for subscribing!</p>}
    </section>
  );
}