/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Header } from "../header";
import { CartProvider } from "@/lib/cart-context";

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

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ shopName: "CPX JERSEY" }),
  }) as jest.Mock;
});

describe("Header", () => {
  it("renders the CPX logo image from public assets", async () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );

    const logo = screen.getByAltText("CPX Sport Wear Premium logo") as HTMLImageElement;
    expect(logo.getAttribute("src")).toBe("/images/logo/icon_cpx.jpeg");

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("/api/cms"));
  });

  it("opens cart drawer from the bag button", async () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("/api/cms"));

    fireEvent.click(screen.getByLabelText("Open cart"));

    expect(screen.getByRole("dialog", { name: "Shopping cart" })).toBeTruthy();
    expect(screen.getByText("YOUR CART")).toBeTruthy();
  });
  it("opens wishlist drawer and does not show visitor account access", async () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("/api/cms"));

    expect(screen.queryByLabelText("Admin Panel")).toBeNull();

    fireEvent.click(screen.getByLabelText("Open wishlist"));

    expect(screen.getByRole("dialog", { name: "Wishlist" })).toBeTruthy();
    expect(screen.getByText("WISHLIST")).toBeTruthy();
  });
});

