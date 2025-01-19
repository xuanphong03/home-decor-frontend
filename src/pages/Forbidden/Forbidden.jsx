import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-[200px] mb-2 font-bold leading-tight">403</h1>
      <p className="text-3xl mb-2 text-secondary font-semibold tracking-wide">
        Forbidden
      </p>
      <p className="text-secondary">
        Bạn không có quyền truy cập vào trang này{" "}
        <Link to="/" className="underline text-primary">
          Trang chủ
        </Link>
      </p>
    </div>
  );
}
