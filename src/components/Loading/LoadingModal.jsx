import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative">
        <span className="text-6xl text-white ">
          <AiOutlineLoading className="animate-spin" />
        </span>
      </div>
    </div>
  );
}
