import React from "react";

const products = [
  { name: "Classic White Coat", price: "$89", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" },
  { name: "Summer Floral Dress", price: "$59", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80" },
  { name: "Denim Jacket", price: "$74", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80" },
  { name: "Casual Sneakers", price: "$65", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80" },
];

export default function TrendingNow() {
  return (
    <section className="section trending-section">
      <h2>Trending Now</h2>

      <div className="trending-grid">
        {products.map((product) => (
          <div className="product-card" key={product.name}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}