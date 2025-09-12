import { getRecommendedProducts } from "../api/recomendation/route";
import RecommendationListClient from "./recomendation";

export default async function RecommendationListServer() {
  const recommendedProducts = await getRecommendedProducts();


  return (
    <RecommendationListClient recommendedProducts={recommendedProducts ?? []} />
  );
}