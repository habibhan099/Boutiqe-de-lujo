import React from "react";

function DeliveryLogin() {
  return (
    <div>
      <h1>Delivery Person Login</h1>

      <form>
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
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default DeliveryLogin;