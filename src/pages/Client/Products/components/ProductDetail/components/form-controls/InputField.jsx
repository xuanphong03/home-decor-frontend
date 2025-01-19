import { Controller } from "react-hook-form";

export default function InputField({
  id,
  name,
  label,
  placeholder,
  control,
  errors,
  required = false,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="inline-block mb-[6px] text-[#777777] text-[15px]"
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="overflow-hidden border border-solid border-gray-200 rounded">
            <input
              type="text"
              id={id}
              placeholder={placeholder}
              className="px-4 py-2 w-full outline-none"
              {...field}
            />
          </div>
        )}
      />
      {!!errors[name] && (
        <p className="px-2 mt-1 text-red-500 text-sm">
          {errors[name]?.message}
        </p>
      )}
    </>
  );
}
