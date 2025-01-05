import Image from "next/image";
import homepageHeroImage from "../../assets/images/homepage-hero-header.jpg";

export default function HomepageHero() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-16 lg:gap-32 px-8 py-12 lg:py-32">
      <div>
        <h1 className="font-bold text-4xl lg:text-5xl flex flex-col gap-[6px]">
          Find the Perfect Groomer
          <span>for Your Pup,</span>
          <span>Anytime, Anywhere!</span>
        </h1>
        <p className="text-xl leading-relaxed mt-8 max-w-[80%]">
          Discover top-rated dog groomers near you and book appointments 24/7
          with ease.
        </p>
        <button className="text-lg cursor-pointer btn btn-primary mt-8 btn-wide">
          Get Started Now
        </button>
      </div>
      <div className="w-[35%]">
        <div className="h-[50%]">
          <Image
            className="h-[500px] rounded-xl"
            src={homepageHeroImage}
            alt="homepage hero"
          />
        </div>
      </div>
    </div>
  );
}
