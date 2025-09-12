import BrandListClient from './brandListClient';
import { getBrands } from '../api/brand/route'; 

export default async function BrandListServer() {
  const brands = await getBrands(); 

  return <BrandListClient brands={brands ?? []} />;
}