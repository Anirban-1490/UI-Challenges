import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { ratingDescription } from "./rating-text";

export const Rating = () => {
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  return (
    <>
      <h1 className=" text-white text-[4rem] text-center font-semibold mb-8 ">
        How much stars do you want to give us?
      </h1>
      <div
        className=" flex gap-6 justify-center w-fit mx-auto"
        onMouseLeave={() => {
          //* when mouse exist from parent container , rmeove the hovered element counter
          setHoveredElement(null);
        }}
      >
        {new Array(5).fill("").map((id, index) => {
          //* check when hovering over a star, if this hovered star and previous stars can be filled
          const isFilledOver = hoveredElement && hoveredElement >= index + 1;
          //* check when clicking on a star, if this star where the click happens and previous stars can be filled
          const isFilledOnrating = rating && rating >= index + 1;

          const isFilled = isFilledOver || isFilledOnrating;

          return (
            <StarFilled
              onMouseOver={(ev) => {
                setHoveredElement(index + 1);
              }}
              onClick={() => {
                setRating(index + 1);
              }}
              key={uuidV4()}
              id={`star-${index}`}
              style={{
                fontSize: "4rem",
                color: isFilled ? "yellow" : "grey",
              }}
            />
          );
        })}
      </div>
      {rating && (
        <div className="mt-10 mx-auto ">
          <p className=" text-center px-[20rem]">
            {ratingDescription.find(
              (ratingDesc) => ratingDesc.rating === rating
            )?.text || ""}
          </p>
        </div>
      )}
    </>
  );
};
