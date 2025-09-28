export type Product = {
  id:   string;    
  name: string;
  price: number;
  description?: string;
  stock: number;
  category: {
    id?: string ;
    name: string;
    image: string;
  };
  categoryId: number;
  categoryImage?: string ;
  imageUrl: string;
};