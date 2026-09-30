import React from "react";

function DeliveryStatus() {
  return (
    <div>
      <h1>Delivery Status</h1>

      <form>
        <div>
          <label>Order ID</label>
          <br />
          <input
            type="text"
            placeholder="Enter order ID"
          />
        </div>

        <br />

        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            placeholder="Customer name"
          />
        </div>

        <br />

        <div>
          <label>Delivery Status</label>
          <br />
          <select>
            <option>Assigned</option>
            <option>Picked Up</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Failed</option>
          </select>
        </div>

        <br />

        <div>
          <label>Delivery Notes</label>
          <br />
          <textarea
            placeholder="Enter delivery notes"
          ></textarea>
        </div>

        <br />

        <button type="submit">Update Status</button>
      </form>
    </div>
  );
}

export default DeliveryStatus;