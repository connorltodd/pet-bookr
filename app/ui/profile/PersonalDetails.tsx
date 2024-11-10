"use client";

import { updateUser } from "@/app/actions/user";
import { useUserContext } from "@/app/contexts/userContext";
import { User } from "@/app/types";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function PersonalDetails() {
  const { user, setUser } = useUserContext();
  const [isEditing, setEditingMode] = useState(false);

  const editUser = async (formData: FormData) => {
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone_number = formData.get("phone_number") as string;

    if (user?.id !== undefined) {
      const updatedUser: User | undefined = await updateUser(
        { first_name, last_name, email, phone_number },
        user.id as number
      );

      // Ensure updatedUser is not undefined before calling setUser
      if (updatedUser) {
        setUser(updatedUser); // updatedUser is safely of type User here
        setEditingMode(false);
      } else {
        console.error("Failed to update user");
      }
    }
  };
  return (
    <div className="w-90 max-w-[550px] m-auto mt-10 px-5">
      <Link href="/dashboard/profile" className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fas fa-arrow-left h-4 w-4"
        />
        <h1 className="text-xl my-7">Personal Details</h1>
      </Link>
      {!isEditing ? (
        <div className="relative flex flex-col gap-6 bg-base-100 rounded-box shadow-xl p-8">
          <div>
            <p className="text-sm">First Name:</p>
            <p className="text-md">{user?.first_name}</p>
          </div>
          <div>
            <p className="text-sm">Last Name:</p>
            <p className="text-md">{user?.last_name}</p>
          </div>
          <div>
            <p className="text-sm">Phone Number:</p>
            <p className="text-md">{user?.phone_number}</p>
          </div>
          <div>
            <p className="text-sm">Email:</p>
            <p className="text-md">{user?.email}</p>
          </div>
          <button
            onClick={() => setEditingMode(true)}
            className="absolute right-7 top-7"
          >
            <FontAwesomeIcon icon={faEdit} className="fas fa-edit h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="bg-base-100 rounded-box shadow-xl p-8">
          <form action={editUser} className="form-control flex gap-6">
            <div className="space-y-3">
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
                  required
                  defaultValue={user?.first_name}
                />
              </label>
            </div>
            <div className="space-y-3">
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
                  required
                  defaultValue={user?.last_name}
                />
              </label>
            </div>
            <div className="space-y-3">
              <p className="text-sm">Phone Number</p>
              <label
                htmlFor="phone_number"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  required
                  defaultValue={user?.phone_number}
                />
              </label>
            </div>
            <div className="space-y-3">
              <p className="text-sm">Email</p>
              <label
                htmlFor="last_name"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="email"
                  id="email"
                  required
                  defaultValue={user?.email}
                />
              </label>
            </div>
            <div className="mt-3 flex items-center gap-4 justify-end">
              <button
                className="block btn btn-outline border-primary text-primary hover:btn-primary hover:text-white"
                type="button"
                onClick={() => setEditingMode(false)}
              >
                Cancel
              </button>
              <button className="block btn btn-primary mt-0">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
