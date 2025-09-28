import CategoriesPage from "./category";
import CategoryHome from "./categoryHome";
import RecommendationListClient from "./recomendation/recomendation";
import BrandListServer from "./brand/brandListClient";


export default function Home() {
  return (
    <div >
            <main className="flex-grow md:px-[40px] "> <CategoriesPage/>
        <CategoryHome/>
        <RecommendationListClient />
       <BrandListServer/>
        </main>
    </div>
  );
}
