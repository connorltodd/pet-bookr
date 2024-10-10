import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="flex justify-between md:max-w-[550px] min-h-[353px] flex-col p-4">
      <h1 className="font-bold sm:text-[24px]  text-center">
        Welcome to Pet Bookr
      </h1>
      <p className="text-center mt-4 text-lg">
        We are just a few steps away from setting up your account.
      </p>
      <div className="flex justify-center mt-4">
        <Link className="btn btn-primary " href="/dashboard/onboarding/address">
          Let's get started
        </Link>
      </div>
    </div>
  );
}
