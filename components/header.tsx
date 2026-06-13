'use client';
import { useState } from 'react';
import { CircleUserRound, Heart, Menu, Search, ShoppingBag, X } from './icons';

const links = ['New Drops', 'Products', 'Custom Jersey', 'Teams', 'About Us'];
export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topbar"><span>FREE SHIPPING FOR ORDERS OVER IDR 500K</span><span className="topbar-right">100% ORIGINAL · MADE IN INDONESIA</span></div>
    <header className="header">
      <button className="icon-btn mobile-only" aria-label="Menu" onClick={() => setOpen(true)}><Menu /></button>
      <a className="logo" href="#top" aria-label="CPX home"><span className="logo-mark">C</span><span>CPX<small>JERSEY</small></span></a>
      <nav>{links.map(x => <a key={x} href={x === 'Custom Jersey' ? '#custom' : x === 'Products' || x === 'New Drops' ? '#products' : x === 'About Us' ? '#story' : '#teams'}>{x}</a>)}</nav>
      <div className="actions"><button aria-label="Search"><Search /></button><button aria-label="Wishlist" className="desktop-icon"><Heart /></button><button aria-label="Account" className="desktop-icon"><CircleUserRound /></button><button className="bag" aria-label="Cart"><ShoppingBag /><b>2</b></button></div>
    </header>
    {open && <div className="mobile-menu"><button onClick={() => setOpen(false)}><X /></button>{links.map(x=><a href="#products" onClick={()=>setOpen(false)} key={x}>{x}</a>)}<a href="#login">Sign In</a></div>}
  </>;
}
