import React from "react";

function DeliveryRegistration() {
  return (
    <div>
      <h1>Delivery Person Registration</h1>

      <form>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter full name"
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
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
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
          />
        </div>

        <br />

        <div>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <br />

        <div>
          <label>Address</label>
          <br />
          <textarea
            placeholder="Enter address"
          ></textarea>
        </div>

        <br />

        <div>
          <label>CNIC Number</label>
          <br />
          <input
            type="text"
            placeholder="Enter CNIC number"
          />
        </div>

        <br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default DeliveryRegistration;