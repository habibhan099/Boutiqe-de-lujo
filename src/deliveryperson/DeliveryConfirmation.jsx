import React from "react";

function DeliveryConfirmation() {
  return (
    <div>
      <h1>Delivery Confirmation</h1>

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
          <label>Delivery Date</label>
          <br />
          <input type="date" />
        </div>

        <br />

        <div>
          <label>Confirmation</label>
          <br />
          <select>
            <option>Delivered Successfully</option>
            <option>Customer Not Available</option>
            <option>Delivery Failed</option>
          </select>
        </div>

        <br />

        <div>
          <label>Remarks</label>
          <br />
          <textarea
            placeholder="Enter remarks"
          ></textarea>
        </div>

        <br />

        <button type="submit">Confirm Delivery</button>
      </form>
    </div>
  );
}

export default DeliveryConfirmation;