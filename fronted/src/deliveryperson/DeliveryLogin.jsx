import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { deliveryLoginAxiosFunction } from "../Service/api";

const loginSchema = z.object({
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

function DeliveryLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await deliveryLoginAxiosFunction(data);
  }

  return (
    <div>
      <h1>Delivery Person Login</h1>

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="tel"
            placeholder="Enter phone number"
            {...register("phone")}
          />
          {errors.phone && <p role="alert">{errors.phone.message}</p>}
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
          <Link to="/delivery-registration">Create delivery person account</Link>
          <Link to="/assignment">View delivery assignments</Link>
          <Link to="/customer-login">Customer login</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default DeliveryLogin;