export default function InfoList(props: any) {
  return (
    <div className="my-10">
      {props.listData?.map((contentItem: any) => (
        <div className="max-w-5xl m-auto my-10">
          <h2 className="text-xl font-bold mb-5">
            {contentItem.categoryHeading}
          </h2>
          {contentItem.categoryItems.map((categoryItem: any) => (
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-5">{categoryItem.title}</h2>
              {categoryItem.bulletPoints.map((item: any) => (
                <div className="flex gap-2 mb-2">
                  <p>{item.bullet ? "-" : ""}</p>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
