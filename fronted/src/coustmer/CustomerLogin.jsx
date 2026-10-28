import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { customerLoginAxiosFunction } from "../Service/api";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

function CustomerLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await customerLoginAxiosFunction(data);
  }

  return (
    <div>
      <h1>Customer Login</h1>

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>

        <br />

        <div>
          <input type="checkbox" {...register("rememberMe")} />
          <label> Remember me</label>
        </div>

        <br />

        <button type="submit">Login</button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/product-search">Browse products</Link>
          <Link to="/signup">Create an account</Link>
          <Link to="/admin-login">Admin login</Link>
          <Link to="/delivery-login">Delivery person login</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}

export default CustomerLogin;