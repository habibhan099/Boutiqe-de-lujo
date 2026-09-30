import React from "react";

export default function NewCollection() {
  return (
    <section className="section new-collection">
      <div className="collection-text">
        <h2>New Collection</h2>
        <p>
          Fresh styles just landed. Explore pieces made for the season ahead,
          from everyday basics to statement layers.
        </p>
        <button className="shop-btn">Explore Collection</button>
      </div>

      <div className="collection-image">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
          alt="New collection clothing"
        />
      </div>
    </section>
  );
}