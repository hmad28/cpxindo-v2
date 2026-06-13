"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./cart-provider";
import { Check } from "./icons";

export function OrderSuccess({ orderNumber }: { orderNumber?: string }) {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main className="success-page">
      <div>
        <span><Check /></span>
        <small>ORDER RECEIVED</small>
        <h1>THANK YOU.</h1>
        <p>
          Pesanan <b>{orderNumber}</b> berhasil dibuat. Tim CPX akan
          menghubungi kamu untuk konfirmasi pembayaran.
        </p>
        <Link href="/account" className="btn red">VIEW MY ORDERS</Link>
        <Link href="/products">Continue shopping</Link>
      </div>
    </main>
  );
}
