import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { customerRegistrationAxiosFunction } from "../Service/api";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(8, "Enter a valid phone number."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
  address: z.string().trim().min(5, "Enter your address."),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

function Registration() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  async function myFormSubmissionFunction(data) {
    setMessage("");
    setError("");
    setSubmitting(true);
    logFormSubmission(data);

    try {
      await customerRegistrationAxiosFunction(data);
      setMessage("Registration successful!");
      reset();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (submissionError) {
      setError(
        submissionError.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Customer Registration</h1>

      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Full Name</label>
          <br />
          <input type="text" placeholder="Enter full name" {...register("name")} />
          {errors.name && <p role="alert">{errors.name.message}</p>}
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input type="email" placeholder="Enter email" {...register("email")} />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input type="tel" placeholder="Enter phone number" {...register("phone")} />
          {errors.phone && <p role="alert">{errors.phone.message}</p>}
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input type="password" placeholder="Enter password" {...register("password")} />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>

        <br />

        <div>
          <label>Confirm Password</label>
          <br />
          <input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p role="alert">{errors.confirmPassword.message}</p>}
        </div>

        <br />

        <div>
          <label>Address</label>
          <br />
          <textarea placeholder="Enter address" {...register("address")}></textarea>
          {errors.address && <p role="alert">{errors.address.message}</p>}
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Create Account"}
        </button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/login">Already have an account? Log in</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default Registration;