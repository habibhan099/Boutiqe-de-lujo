import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">BOUTIQUE DE LUJO</div>

      <nav className="nav">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Collection</a>
        <a href="#">Trends</a>
      </nav>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Cart">
          🛍
        </button>
        <button className="login-btn">Login</button>
        <button className="login-btn">register</button>
        
      </div>
    </header>
  );
}