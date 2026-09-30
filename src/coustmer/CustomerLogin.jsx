import React from "react";

function CustomerLogin() {
  return (
    <div>
      <h1>Customer Login</h1>

      <form>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <br />

        <div>
          <input type="checkbox" />
          <label> Remember me</label>
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <button>Register</button>
      </p>
    </div>
  );
}

export default CustomerLogin;