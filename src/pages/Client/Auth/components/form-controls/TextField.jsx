export default function TextField({
  id,
  label,
  placeholder,
  register,
  errorMessage,
  startIcon,
  disabled = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <div className="relative mt-[6px] overflow-hidden border border-solid border-gray-200 rounded">
        <label
          htmlFor={id}
          className="rounded-l absolute top-0 bottom-0 w-[32px] text-secondary flex items-center justify-center bg-gray-50"
        >
          {startIcon}
        </label>
        <input
          disabled={disabled}
          type="text"
          id={id}
          placeholder={placeholder}
          className="pl-[36px] pr-4 py-2 w-full outline-none"
          {...register}
        />
      </div>
      {errorMessage && (
        <p className="px-2 mt-1 text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
