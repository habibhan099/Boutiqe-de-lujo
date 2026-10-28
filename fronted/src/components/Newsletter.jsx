import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { newsletterAxiosFunction } from "../Service/api";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  async function subscribe(data) {
    logFormSubmission(data);
    await newsletterAxiosFunction(data);
    setSubmitted(true);
    reset();
  }

  return (
    <section className="newsletter">
      <h2>Stay In The Loop</h2>
      <p>Sign up for exclusive offers and new arrivals.</p>

      <form className="newsletter-form" onSubmit={handleSubmit(subscribe)} noValidate>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <button type="submit" className="shop-btn">Subscribe</button>
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </form>

      {submitted && <p className="newsletter-success">Thanks for subscribing!</p>}
    </section>
  );
}