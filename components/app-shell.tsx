import { CartProvider } from "./cart-provider";import { CartDrawer } from "./cart-drawer";
export function AppShell({children}:{children:React.ReactNode}){return <CartProvider>{children}<CartDrawer/></CartProvider>}
