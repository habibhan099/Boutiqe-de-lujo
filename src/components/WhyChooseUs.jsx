import React from "react";

const reasons = [
  { title: "Free Shipping", text: "On all orders over $50" },
  { title: "Easy Returns", text: "30-day return window" },
  { title: "Secure Payment", text: "Your data is always protected" },
  { title: "24/7 Support", text: "We're here whenever you need us" },
];

export default function WhyChooseUs() {
  return (
    <section className="section why-us">
      <h2>Why Choose Us</h2>

      <div className="why-grid">
        {reasons.map((reason) => (
          <div className="why-card" key={reason.title}>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}