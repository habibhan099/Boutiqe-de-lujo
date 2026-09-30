import React from "react";

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
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Collection</a>
        </div>

        <div>
          <h4>Help</h4>
          <a href="#">Contact Us</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        <div>
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
      </div>

      <p className="footer-bottom">© 2026 BOUTIQUE DE LUJO. All rights reserved.</p>
    </footer>
  );
}