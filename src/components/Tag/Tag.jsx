import { tag_types } from "@/constants/tag-types";
import "./Tag.scss";

export default function Tag({ type }) {
  return (
    <span
      className={`tag ${type === tag_types.HOT ? "tag-hot" : ""} 
      ${type === tag_types.SALE ? "tag-sale" : ""}`}
    >
      {type === tag_types.HOT && <span>HOT</span>}
      {type === tag_types.SALE && <span>SALE</span>}
    </span>
  );
}
