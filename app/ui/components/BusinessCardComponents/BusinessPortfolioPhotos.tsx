import Image from "next/image";

type IPhoto = {
  id: number;
  groomer_business_id: number;
  photo_url: string;
};

export default function BusinessPortfolioPhotos({
  photos,
}: {
  photos: IPhoto[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      {photos && photos.length > 0 ? (
        photos.map((photo) => (
          <Image
            className="w-[250px] h-[250px] object-cover rounded-lg"
            key={photo.id}
            src={photo.photo_url}
            alt={`Photo ${photo.id}`}
            width={0} // Required but not used with "fill" layout
            height={0} // Required but not used with "fill" layout
            sizes="100vw" // Adjust to match your layout needs
            priority // Optional: for above-the-fold images
          />
        ))
      ) : (
        <p>No photos available for this business.</p>
      )}
    </div>
  );
}
