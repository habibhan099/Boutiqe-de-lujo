import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { adminLoginAxiosFunction } from "../Service/api";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await adminLoginAxiosFunction(data);
  }

  return (
    <div>
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter admin email"
            {...register("email")}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>

        <br />

        <button type="submit">Login</button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/admin-dashboard">Open admin dashboard</Link>
          <Link to="/customer-login">Customer login</Link>
          <Link to="/delivery-login">Delivery person login</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default AdminLogin;