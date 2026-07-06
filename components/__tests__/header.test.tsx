/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../header";
import { CartProvider } from "@/lib/cart-context";
import type { CMSSettings } from "@/lib/db";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority: _priority, ...imgProps } = props;
    return <img {...imgProps} alt={props.alt || ""} />;
  },
}));

jest.mock("../icons", () => ({
  CircleUserRound: (props: any) => <svg data-testid="account" {...props} />,
  Heart: (props: any) => <svg data-testid="heart" {...props} />,
  Menu: (props: any) => <svg data-testid="menu" {...props} />,
  Search: (props: any) => <svg data-testid="search" {...props} />,
  ShoppingBag: (props: any) => <svg data-testid="bag" {...props} />,
  CreditCard: (props: any) => <svg data-testid="credit-card" {...props} />,
  Minus: (props: any) => <svg data-testid="minus" {...props} />,
  Plus: (props: any) => <svg data-testid="plus" {...props} />,
  Trash2: (props: any) => <svg data-testid="trash" {...props} />,
  X: (props: any) => <svg data-testid="x-icon" {...props} />,
}));

jest.mock("@/lib/db", () => ({
  getStoredWishlist: () => [],
  getStoredAdmins: () => ["085172003667"],
}));

const cms: CMSSettings = {
  shopName: "CPX JERSEY",
  slogan: "Bikin jersey tim yang kelihatan beda.",
  address: "Bandung",
  mapsUrl: "",
  instagramUrl: "https://www.instagram.com/cpx.sportswear/",
  tiktokUrl: "https://www.tiktok.com/@cpx.sportswear",
  shopeeUrl: "https://shopee.co.id/cpxonline",
  tokopediaUrl: "https://www.tokopedia.com/abaholot",
  lazadaUrl: "https://www.lazada.co.id/shop/tojerbike",
  aboutTitle: "ABOUT CPX",
  aboutDesc1: "About 1",
  aboutDesc2: "About 2",
  customImage: "/images/cpx_product.png",
  customFabricChipTitle: "DRY-X FABRIC",
  customFabricChipDesc: "Stay cool.",
  customTitle: "YOUR TEAM YOUR RULES",
  customSubtitle: "Custom subtitle",
};

const renderHeader = () => render(
  <CartProvider>
    <Header initialCms={cms} />
  </CartProvider>
);

describe("Header", () => {
  it("renders the CPX logo image from public assets without fetching CMS on the client", () => {
    global.fetch = jest.fn() as jest.Mock;
    renderHeader();

    const logo = screen.getByAltText("CPX Sport Wear Premium logo") as HTMLImageElement;
    expect(logo.getAttribute("src")).toBe("/images/logo/icon_cpx.jpeg");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("opens cart drawer from the bag button", () => {
    renderHeader();

    fireEvent.click(screen.getByLabelText("Open cart"));

    expect(screen.getByRole("dialog", { name: "Shopping cart" })).toBeTruthy();
    expect(screen.getByText("YOUR CART")).toBeTruthy();
  });

  it("opens wishlist drawer and does not show visitor account access", () => {
    renderHeader();

    expect(screen.queryByLabelText("Admin Panel")).toBeNull();

    fireEvent.click(screen.getByLabelText("Open wishlist"));

    expect(screen.getByRole("dialog", { name: "Wishlist" })).toBeTruthy();
    expect(screen.getByText("WISHLIST")).toBeTruthy();
  });
});
