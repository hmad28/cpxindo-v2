import { OrderSuccess } from "@/components/order-success";
export default async function SuccessPage({searchParams}:{searchParams:Promise<{order?:string}>}){const {order}=await searchParams;return <OrderSuccess orderNumber={order}/>}
