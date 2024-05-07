import { getID } from "@/Utils/get-ID";
import { useState } from "react";

export const OTPInput = () => {
  const [result, setResult] = useState<string[]>([]);
  const [focusedInput, setFocusedInput] = useState<number>();

  return (
    <div className=" w-[57rem] h-[42rem] mx-auto bg-[#252B42] rounded-xl">
      <h1 className=" text-center text-3xl text-[#9FA7C5]  pt-[4rem]">
        Verify your email address
      </h1>
      <p className=" text-center mt-2 text-[#8795C5] px-20">
        A four-digit code has been sent to your email name@example.com. Please
        enter the code below to verify your email address.
      </p>

      <form className=" flex gap-6 mx-auto w-fit mt-[4rem]">
        {new Array(4).fill("fil").map((_, index) => {
          return (
            <input
              inputMode="numeric"
              autoFocus={focusedInput == index}
              onChange={(evt) => {
                const numberPattern = /[0-9]/i;
                evt.currentTarget.focus();
                evt.currentTarget.select();
                const value = evt.currentTarget.value;
                //* if the input is not a number , clear the input field
                if (!numberPattern.test(value) && value) {
                  evt.currentTarget.value = "";
                  return;
                }
                setResult((prev) => {
                  const temp = [...prev];
                  temp[index] = value;
                  return temp;
                });
                value ? setFocusedInput(index + 1) : setFocusedInput(index - 1);
              }}
              maxLength={1}
              pattern="[0-9\s]"
              className="w-[10rem] h-[13rem] text-center text-[10rem] rounded-xl bg-[#1A2036] hover:border hover:border-[#9FA7C5]"
              key={getID()}
              type="text"
              value={result[index]}
              name=""
              id=""
            />
          );
        })}
      </form>
    </div>
  );
};
