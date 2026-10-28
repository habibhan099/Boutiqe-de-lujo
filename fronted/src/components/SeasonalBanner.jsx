import React from "react";
import { Link } from "react-router-dom";

export default function SeasonalBanner() {
  return (
    <section className="seasonal-banner">
      <h2>End Of Season Sale</h2>
      <p>Up to 50% off selected styles. Limited time only.</p>
      <Link className="shop-btn light" to="/product-search">Shop The Sale</Link>
    </section>
  );
}