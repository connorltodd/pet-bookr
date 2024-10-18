export default function Businesses() {
  return (
    <div>
      <div className="container m-auto mt-14">
        <form className="flex justify-center items-center gap-6">
          <label
            htmlFor="groomer_search"
            className="input input-bordered flex items-center gap-2 min-w-[300px]"
          >
            <input
              type="text"
              name="groomer_search"
              id="groomer_search"
              required
              className="text-sm"
              placeholder="Search Groomers nearby..."
            />
          </label>
          <button className="btn btn-primary min-w-24 max-w-28">Search</button>
        </form>
      </div>
    </div>
  );
}
