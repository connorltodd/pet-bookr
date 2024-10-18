"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/app/lib/auth";
import FormButton from "@/app/ui/components/FormButton";
import PetBookrLogo from "../ui/components/PetBookrLogo";

const initialState = {
  errors: [],
};

export default function Signup() {
  const [formState, formAction] = useFormState(signup, initialState);

  return (
    <div className="flex items-center justify-center min-h-lvh">
      <div>
        <div className="flex justify-center items-center pb-6 pt-6">
          <PetBookrLogo
            height={60}
            width={60}
            fontSize="text-2xl md:text-3xl"
          />
        </div>
        <form
          className="w-[90vw] md:min-w-[380px] max-w-[500px] form-control p-6 flex gap-4 bg-base-100 rounded-box shadow-xl"
          id="auth-form"
          action={formAction}
        >
          <h1 className="text-xl md:text-3xl text-center font-bold">Signup</h1>
          <div className="space-y-0.5">
            <p className="text-sm">First Name</p>
            <label
              htmlFor="first_name"
              className="input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter your first name ..."
                required
              />
            </label>
          </div>
          <div className="space-y-0.5">
            <p className="text-sm">Last Name</p>
            <label
              htmlFor="last_name"
              className="input input-bordered flex items-center gap-2"
            >
              <input
                className="grow"
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter your last name ..."
                required
              />
            </label>
          </div>
          <div className="space-y-0.5">
            <p className="text-sm">Email</p>
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
            <p className="text-sm">Password</p>
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
          {formState?.errors.length ? (
            <ul>
              {/* @ts-ignore */}
              {formState.errors.map((error) => {
                return error.validation === "regex" ? (
                  <>
                    <p className="text-sm font-bold">
                      Password must contain the following:
                    </p>
                    <ul className="list-disc ml-4 mt-2">
                      <li className="text-sm">8 characters</li>
                      <li className="text-sm">One uppercase letter</li>
                      <li className="text-sm">One lowercase letter</li>
                      <li className="text-sm">One special character</li>
                    </ul>
                  </>
                ) : (
                  <p className="text-sm font-bold" key={error.message}>
                    {error.message}
                  </p>
                );
              })}
            </ul>
          ) : null}
          <FormButton title="Create Account" loadingMessage="Loading..." />
          <div className="text-center mt-2">
            <Link href="/login">Login with existing account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
