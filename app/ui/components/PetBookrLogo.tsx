import Image from "next/image";
import petBookrLogo from "@/app/assets/images/pet-bookr-logo.svg";

export default function PetBookrLogo({
  height = 80,
  width = 80,
  fontSize = "text-3xl",
}: {
  height?: number;
  width?: number;
  fontSize?: string;
}) {
  return (
    <div className="flex justify-center items-center gap-4">
      <Image
        priority
        src={petBookrLogo}
        height={height}
        width={width}
        alt="pet bookr"
      />
      <h1 className={`${fontSize} font-semibold text-black`}>Pet Bookr</h1>
    </div>
  );
}
