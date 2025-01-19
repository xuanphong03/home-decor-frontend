import "./ProductDescription.scss";
export default function ProductDescription({ description }) {
  return (
    <div
      className="product-desc text-[15px] text-[#777777]"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  );
}
