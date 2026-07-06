import { Home } from '@/components/home';
import { getStorefrontData } from '@/lib/storefront';

export default async function Page() {
  const data = await getStorefrontData();
  return <Home data={data} />;
}
