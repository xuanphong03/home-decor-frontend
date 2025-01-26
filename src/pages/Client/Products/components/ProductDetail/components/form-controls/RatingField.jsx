import { Rating } from "@mui/material";
import { Controller } from "react-hook-form";

export default function RatingField({ id, name, label, control }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="inline-block text-[#777777] text-[15px]">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Rating size="medium" id={id} defaultValue={0} {...field} />
        )}
      />
    </div>
  );
}
