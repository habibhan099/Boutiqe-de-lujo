import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/">BOUTIQUE DE LUJO</Link>

      <nav className="nav">
        <Link to="/product-search">Men</Link>
        <Link to="/product-search">Women</Link>
        <Link to="/product-search">Kids</Link>
        <Link to="/product-search">Collection</Link>
        <Link to="/product-search">Trends</Link>
      </nav>

      <div className="header-actions">
        <Link to="/checkout" className="icon-btn" aria-label="Cart">
          🛍
        </Link>
        <Link className="login-btn" to="/login">Login</Link>
        <Link className="login-btn" to="/signup">register</Link><Link className="login-btn" to="/stakeholders">Stakeholders</Link>
        
      </div>
    </header>
  );
}