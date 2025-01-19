import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-[200px] mb-2 font-bold leading-tight">404</h1>
      <p className="text-3xl mb-2 text-secondary font-semibold tracking-wide">
        Not Found
      </p>
      <p className="text-secondary">
        Trang này không tồn tại{" "}
        <Link to="/" className="underline text-primary">
          Trang chủ
        </Link>
      </p>
    </div>
  );
}
