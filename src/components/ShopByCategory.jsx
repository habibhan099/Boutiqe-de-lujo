import React from "react";

const categories = [
  { name: "Women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" },
  { name: "Men", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80" },
  { name: "Kids", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
];

export default function ShopByCategory() {
  return (
    <section className="section category-section">
      <h2>Shop By Category</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.name}>
            <div className="category-image">
              <img src={cat.image} alt={cat.name} />
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}