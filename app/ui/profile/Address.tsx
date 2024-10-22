"use client";

import { updateUser, updateUserAddress } from "@/app/actions/user";
import { useUserContext } from "@/app/contexts/userContext";
import { User } from "@/app/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function AddressDetails() {
  const { user, setUser } = useUserContext();
  const [isEditing, setEditingMode] = useState(false);

  const editUser = async (formData: FormData) => {
    const line_1 = formData.get("address_line_1") as string;
    const line_2 = formData.get("address_line_2") as string;
    const town_or_city = formData.get("town_or_city") as string;
    const county = formData.get("county") as string;
    const postcode = formData.get("postcode") as string;

    if (user?.id !== undefined) {
      const updatedUser: any = await updateUserAddress(
        { line_1, line_2, town_or_city, county, postcode },
        String(user.id)
      );

      // Ensure updatedUser is not undefined before calling setUser
      if (updatedUser.data) {
        setUser(updatedUser?.data as User); // updatedUser is safely of type User here
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
        <h1 className="text-xl my-7">Address Details</h1>
      </Link>
      {!isEditing ? (
        <div className="relative flex flex-col gap-6 bg-base-100 rounded-box shadow-xl p-8">
          <div>
            <p className="text-sm">Address Line 1</p>
            <p className="text-md">{user?.address_line_1}</p>
          </div>
          <div>
            <p className="text-sm">Address Line 2</p>
            <p className="text-md">{user?.address_line_2}</p>
          </div>
          <div>
            <p className="text-sm">Town / City:</p>
            <p className="text-md">{user?.town_or_city}</p>
          </div>
          <div>
            <p className="text-sm">County:</p>
            <p className="text-md">{user?.county}</p>
          </div>
          <div>
            <p className="text-sm">Postcode:</p>
            <p className="text-md">{user?.postcode}</p>
          </div>
          <button
            onClick={() => setEditingMode(true)}
            className="btn btn-primary w-[80px] absolute right-5 top-5"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="bg-base-100 rounded-box shadow-xl p-8">
          <form action={editUser} className="form-control flex gap-6">
            <div className="space-y-3">
              <p className="text-sm">Address Line 1</p>
              <label
                htmlFor="address_line_1"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="address_line_1"
                  id="address_line_1"
                  required
                  defaultValue={user?.address_line_1}
                />
              </label>
            </div>
            <div className="space-y-3">
              <p className="text-sm">Address Line 2</p>
              <label
                htmlFor="last_name"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="address_line_2"
                  id="address_line_2"
                  required
                  defaultValue={user?.address_line_2}
                />
              </label>
            </div>
            <div className="space-y-3">
              <p className="text-sm">Town / City</p>
              <label
                htmlFor="town_or_city"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="town_or_city"
                  id="town_or_city"
                  required
                  defaultValue={user?.town_or_city}
                />
              </label>
            </div>
            <div className="space-y-3">
              <p className="text-sm">County</p>
              <label
                htmlFor="county"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="county"
                  id="county"
                  required
                  defaultValue={user?.county}
                />
              </label>
            </div>
            <div className="space-y-3">
              <p className="text-sm">Postcode</p>
              <label
                htmlFor="postcode"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  className="grow"
                  type="text"
                  name="postcode"
                  id="postcode"
                  required
                  defaultValue={user?.postcode}
                />
              </label>
            </div>
            <div className="mt-3 flex items-center gap-4 justify-end">
              <button
                className="block btn btn-outline border-primary text-primary"
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
