import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

type benefit = {
  icon: any;
  iconClass: string;
  title: string;
  description: string;
};

const benefitsData: benefit[] = [
  {
    icon: faClock,
    iconClass: "fa-clock",
    title: "Convenience",
    description: "Book grooming appointments anytime, from anywhere.",
  },
  {
    icon: faHandshake,
    iconClass: "fa-handshake",
    title: "Trusted Professionals",
    description: "Access verified, top-rated groomers in your area.",
  },
  {
    icon: faCalendarCheck,
    iconClass: "fa-calendar-check",
    title: "Real-Time Scheduling",
    description: "Always know when your favorite groomer is available.",
  },
];

export default function HomepageBenefits() {
  return (
    <section>
      <div id="BENEFITS" className="h-5"></div>
      <h1 className="font-bold text-center mt-10 text-2xl md:text-4xl">
        Why choose Pet Bookr?
      </h1>
      <div className="flex gap-4 flex-col justify-center py-12 items-center lg:flex-row flex-wrap">
        {benefitsData.map((object: benefit) => (
          <div className="card m-2 w-[90vw] md:w-96 border-primary border-2 ">
            <figure className="px-10 pt-10">
              <FontAwesomeIcon
                icon={object.icon}
                className={`fas ${object.iconClass} h-10 w-10`}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{object.title}</h2>
              <p className="my-4 w-[80%]">{object.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
