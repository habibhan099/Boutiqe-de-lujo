import React from "react";

function OrderForm() {
  return (
    <div>
      <h1>Place Your Order</h1>

      <form>
        <div>
          <label>Product Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter product name"
          />
        </div>

        <br />

        <div>
          <label>Size</label>
          <br />
          <select>
            <option>Select Size</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>

        <br />

        <div>
          <label>Color</label>
          <br />
          <input
            type="text"
            placeholder="Enter color"
          />
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        <br />

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
            placeholder="Enter complete delivery address"
          ></textarea>
        </div>

        <br />

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;