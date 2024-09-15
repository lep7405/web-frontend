import React from "react";
import SliderImage from "./SliderImage";
import DetailVariant from "./DetailVariant";
import Description from "./Description";

const Detail = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="flex  gap-x-3">
        <div className="w-1/2">
          <img
            src={data?.images[0]}
            alt="image"
            className="w-full h-[300px] max-h-[300px]"
          />
          <SliderImage im={data?.images} />
        </div>
        <div>
          <h1 className="font-bold text-3xl font-sans">{data?.productName}</h1>
          <DetailVariant product={data} />
        </div>
      </div>
      <h1 className="font-bold font-mono text-2xl">Description</h1>
     {data?.description&&<Description des={data?.description}/>}
    </div>
  );
};

export default Detail;
