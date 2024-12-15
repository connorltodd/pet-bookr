import moment from "moment";

export default function BusinessReviews({
  groomerReviews,
}: {
  groomerReviews: any;
}) {
  return (
    <div>
      {groomerReviews.length ? (
        groomerReviews.map((reviewData: any, index: number) => {
          const { review, pet_owner_first_name, pet_owner_last_name } =
            reviewData;
          const { star_rating, description, created_at } = review;

          return (
            <div key={index} className="review-item mb-7">
              <div className="flex gap-2 items-center mb-2">
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className="mask mask-star-2 bg-yellow-400 h-4 w-4"
                      checked={i + 1 === star_rating}
                      readOnly
                    />
                  ))}
                </div>
                <h3 className="text-sm">
                  {pet_owner_first_name} {pet_owner_last_name}
                </h3>
              </div>
              <p className="text-md">{description}</p>
              <p className="text-sm text-slate-500 mt-2">
                {moment(created_at).format("MMM Do YYYY, HH:MM")}
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-center">No reviews available for this business.</p>
      )}
    </div>
  );
}
