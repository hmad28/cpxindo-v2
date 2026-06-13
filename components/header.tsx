"use client";
import Link from "next/link";
import { useState } from "react";
import { CircleUserRound, Menu, Search, ShoppingBag, X } from "./icons";
import { useCart } from "./cart-provider";

const links=[{label:"New Drops",href:"/products?sort=newest"},{label:"Products",href:"/products"},{label:"Custom Jersey",href:"/custom-jersey"},{label:"About Us",href:"/about"}];
export function Header(){const [open,setOpen]=useState(false);const {count,setOpen:setCartOpen}=useCart();return <>
 <div className="topbar"><span>FREE SHIPPING FOR ORDERS OVER IDR 500K</span><span className="topbar-right">100% ORIGINAL · MADE IN INDONESIA</span></div>
 <header className="header"><button className="icon-btn mobile-only" aria-label="Buka menu" onClick={()=>setOpen(true)}><Menu/></button><Link className="logo" href="/"><span className="logo-mark"/><span>CPX<small>JERSEY</small></span></Link><nav>{links.map(x=><Link key={x.href} href={x.href}>{x.label}</Link>)}</nav><div className="actions"><Link href="/products" aria-label="Cari produk"><Search/></Link><Link href="/account" aria-label="Akun"><CircleUserRound/></Link><button className="bag" aria-label="Buka keranjang" onClick={()=>setCartOpen(true)}><ShoppingBag/>{count>0&&<b>{count}</b>}</button></div></header>
 {open&&<div className="mobile-menu"><button onClick={()=>setOpen(false)} aria-label="Tutup menu"><X/></button>{links.map(x=><Link href={x.href} onClick={()=>setOpen(false)} key={x.href}>{x.label}</Link>)}<Link href="/account" onClick={()=>setOpen(false)}>My Account</Link></div>}
 </>}
