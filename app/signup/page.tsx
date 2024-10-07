"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/app/lib/auth";
import FormButton from "@/app/ui/components/FormButton";

const initialState = {
  errors: [],
};

export default function Signup() {
  const [formState, formAction] = useFormState(signup, initialState);

  return (
    <div className="flex items-center justify-center min-h-lvh">
      <form
        className="min-w-[340px] max-w-[500px] form-control p-6 flex gap-4 bg-base-100 rounded-box shadow-xl"
        id="auth-form"
        action={formAction}
      >
        <h1 className="text-center text-2xl font-bold">SIGN UP</h1>
        <label
          htmlFor="first_name"
          className="input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            required
          />
        </label>
        <label
          htmlFor="last_name"
          className="input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            required
          />
        </label>
        <label
          htmlFor="email"
          className="input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email"
          />
        </label>
        <label
          htmlFor="password"
          className="input input-bordered flex items-center gap-2"
        >
          <input
            className="grow"
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
          />
        </label>
        {formState?.errors.length ? (
          <ul>
            {/* @ts-ignore */}
            {formState.errors.map((error) => {
              return error.validation === "regex" ? (
                <>
                  <li>Password Must contain the following:</li>
                  <li>8 characters</li>
                  <li>one uppercase letter</li>
                  <li>one lowercase letter</li>
                  <li>one special character</li>
                </>
              ) : (
                <li key={error.message}>{error.message}</li>
              );
            })}
          </ul>
        ) : null}
        <FormButton title="Create Account" loadingMessage="Loading..." />
        <p className="text-center mt-2 link">
          <Link href="/auth/signin">Sign In with existing account.</Link>
        </p>
      </form>
    </div>
  );
}
