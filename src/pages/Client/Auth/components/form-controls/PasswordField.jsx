import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function PasswordField({
  id,
  label,
  placeholder,
  register,
  errorMessage,
  startIcon,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <div className="mt-[6px] relative border border-solid border-gray-200 rounded overflow-hidden">
        <label
          htmlFor={id}
          className="rounded-l absolute top-0 bottom-0 w-[32px] text-secondary flex items-center justify-center bg-gray-50"
        >
          {startIcon}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className="pl-[36px] pr-[32px] py-2 w-full outline-none"
          {...register}
        />
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-4 text-xl"
          onClick={handleToggleShowPassword}
        >
          {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>
      {errorMessage && (
        <p className="px-2 mt-1 text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
