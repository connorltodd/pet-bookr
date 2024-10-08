"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "./session";
import { postData } from "./apiClient";

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
    const result: any = await postData("/pet-owners/signup", petOwner);

    if (result.success === true) {
      const userId = result.data.user.id;
      await createSession(userId);
    }
  } catch (error: any) {
    if (error?.response?.data?.success === false) {
      return error.response.data;
    }
  }

  redirect("/dashboard");
}

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const result: any = await postData("/pet-owners/login", {
      email,
      password,
    });

    if (result.success === true) {
      const userId = result.data.id;
      await createSession(userId);
    }
  } catch (error: any) {
    if (error?.response?.data?.success === false) {
      return error.response.data;
    }
  }

  redirect("/dashboard");
}
