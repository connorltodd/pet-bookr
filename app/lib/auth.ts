"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "./session";

export async function logout() {
  cookies().delete("session");
  redirect("/login");
}

export async function signup(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;

  const petOwner = {
    email,
    password,
    first_name,
    last_name,
  };

  try {
    const response = await fetch("http://localhost:8000/pet-owners/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(petOwner),
    });

    const result = await response.json();
    if (result.success === false) {
      return result;
    } else {
      const userId = result.data.user.id;
      await createSession(userId);
    }
  } catch (error) {
    console.log(error);
  }

  redirect("/dashboard");
}

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const response = await fetch("http://localhost:8000/pet-owners/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success === false) {
      return result;
    } else {
      const userId = result.data.user.id;
      await createSession(userId);
    }
  } catch (error) {
    console.log(error);
  }

  redirect("/dashboard");
}
