import IntroBanner from "./IntroBanner";
import CategoryList from "./CategoryList";
import NewProductList from "./NewProductList";
import ServiceList from "./ServiceList";
import FeedbackList from "./FeedbackList";
import BrandList from "./BrandList";

export default function Home() {
  return (
    <>
      <IntroBanner />
      <CategoryList />
      <NewProductList />
      <ServiceList />
      <FeedbackList />
      <BrandList />
    </>
  );
}
