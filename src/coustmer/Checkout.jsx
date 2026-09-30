import React from "react";

function Checkout() {
  return (
    <div>
      <h1>Checkout</h1>

      <h2>Order Summary</h2>

      <p>Product: Men T-Shirt</p>
      <p>Quantity: 2</p>
      <p>Price: Rs. 1500</p>
      <p>Delivery Charges: Rs. 200</p>

      <h3>Total: Rs. 3200</h3>

      <hr />

      <h2>Customer Information</h2>

      <form>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="tel"
            placeholder="Enter phone number"
          />
        </div>

        <br />

        <div>
          <label>Delivery Address</label>
          <br />
          <textarea
            placeholder="Enter complete address"
          ></textarea>
        </div>

        <br />

        <div>
          <label>Payment Method</label>
          <br />

          <select>
            <option>Cash on Delivery</option>
            <option>Online Payment</option>
          </select>
        </div>

        <br />

        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}

export default Checkout;