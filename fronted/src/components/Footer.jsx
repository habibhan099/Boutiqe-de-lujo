import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>Ash Store</h3>
          <p>Fashion that fits your everyday life.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/product-search">Men</Link>
          <Link to="/product-search">Women</Link>
          <Link to="/product-search">Kids</Link>
          <Link to="/product-search">Collection</Link>
        </div>

        <div>
          <h4>Help</h4>
          <span>Contact Us</span>
          <span>Shipping</span>
          <span>Returns</span>
        </div>

        <div>
          <h4>Follow Us</h4>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Pinterest</span>
        </div>
      </div>

      <p className="footer-bottom">© 2026 BOUTIQUE DE LUJO. All rights reserved.</p>
    </footer>
  );
}