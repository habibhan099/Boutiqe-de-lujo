import React from "react";

function AdminLogin() {
  return (
    <div>
      <h1>Admin Login</h1>

      <form>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter admin email"
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

export default AdminLogin;