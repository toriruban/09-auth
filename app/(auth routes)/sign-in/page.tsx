"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type LoginRequest, login } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";

const SignIn = () => {
  const router = useRouter();
  const { setAuth } = useAuth();         
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const user = await login(formValues);

      setAuth(user);                      
      setError("");
      router.replace("/profile");          
      router.refresh();                   
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;