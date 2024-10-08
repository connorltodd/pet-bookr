"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "@/app/lib/auth";
import FormButton from "@/app/ui/components/FormButton";

const initialState = {
  errors: [],
};

export default function Login() {
  const [formState, formAction] = useFormState(login, initialState);

  return (
    <div className="flex items-center justify-center min-h-lvh">
      <form
        className="min-w-[380px] max-w-[500px] form-control p-6 flex gap-4 bg-base-100 rounded-box shadow-xl"
        id="auth-form"
        action={formAction}
      >
        <h1 className="text-2xl text-center font-bold">Login</h1>
        <div className="space-y-0.5">
          <p className="text-md">Email</p>
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
              placeholder="Enter your email ..."
            />
          </label>
        </div>
        <div className="space-y-0.5">
          <p className="text-md">Password</p>
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
              placeholder="Enter your password ..."
            />
          </label>
        </div>
        <div className="space-y-0.5">
          <div>
            {/* @ts-ignore */}
            <p className="font-bold text-md">{formState?.errors[0]?.message}</p>
          </div>
        </div>
        <FormButton title="Login" loadingMessage="Loading..." />
        <p className="text-center mt-2 link">
          <Link href="/signup">Create a new account</Link>
        </p>
      </form>
    </div>
  );
}
