/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Products } from "../products";
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("../../product-card", () => ({
  ProductCard: ({ product }: any) => <article data-testid="product-card">{product.name}</article>,
}));

jest.mock("../../icons", () => ({
  ArrowLeft: (props: any) => <svg data-testid="arrow-left" {...props} />,
  ArrowRight: (props: any) => <svg data-testid="arrow-right" {...props} />,
}));

const mockProducts = Array.from({ length: 9 }, (_, index) => ({
  id: `product-${index + 1}`,
  name: `Product ${index + 1}`,
  type: "Football Set",
  price: 100000 + index,
  image: "/images/products/test.jpg",
  images: ["/images/products/test.jpg"],
  colors: ["#111"],
  sizes: ["M"],
  description: "Test product",
  suitableFor: ["Football"],
}));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockProducts),
  }) as jest.Mock;
});

describe("Products section", () => {
  it("paginates homepage products", async () => {
    render(<Products />);

    await waitFor(() => expect(screen.getByText("Product 1")).toBeTruthy());

    expect(screen.getAllByTestId("product-card")).toHaveLength(8);
    expect(screen.queryByText("Product 9")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next products page" }));

    expect(screen.getByText("Product 9")).toBeTruthy();
    expect(screen.queryByText("Product 1")).toBeNull();
  });
});

