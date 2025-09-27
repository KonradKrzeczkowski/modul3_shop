import CategoriesPage from "./category";
import CategoryHome from "./categoryHome";
import RecommendationListServer from "./recomendation/recomendationServer";
import BrandListServer from "./brand/brand";


export default function Home() {
  return (
    <div >
            <main className="flex-grow md:px-[40px] "> <CategoriesPage/>
        <CategoryHome/>
        <RecommendationListServer />
       <BrandListServer/>
        </main>
    </div>
  );
}
