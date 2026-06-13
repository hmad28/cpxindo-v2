import { Home } from "@/components/home";import { getProducts } from "@/lib/products";
export default async function Page(){const products=await getProducts({featured:true});return <Home products={products.slice(0,4)}/>}
