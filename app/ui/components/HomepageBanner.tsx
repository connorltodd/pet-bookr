export default function HomepageBanner() {
  return (
    <div className="w-full py-10 my-20 flex flex-col items-center gap-8 justify-center bg-primary">
      <h1 className="text-white font-bold text-center text-2xl md:text-4xl">
        Are you a Pet Groomer looking to grow your business?
      </h1>
      <p className="text-white text-lg flex flex-col justify-center items-center gap-2">
        <span>Join our other platform to connect with local pet owners</span>
        <span>who are searching for your services on Pet Bookr.</span>
      </p>
      {/* TODO: put the link to the pet grooming business site here */}
      <button className="text-lg block cursor-pointer btn bg-white text-primary shadow-xl mt-4 m-auto btn-wide">
        Get Started Now
      </button>
    </div>
  );
}
