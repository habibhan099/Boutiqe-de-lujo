import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
          Find The Best
          <br />
          Fashion Style
          <br />
          For You
        </h1>

        <p>
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc
          Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class
          Aptent Taciti Sociosqu Ad Litora.
        </p>

        <button className="shop-btn">Shop Now</button>
      </div>

      <div className="hero-image">
        <div className="dots dots-top" />
        <div className="image-frame">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80"
            alt="Model wearing a white coat"
          />
        </div>
        <div className="dots dots-bottom" />
      </div>
    </section>
  );
}