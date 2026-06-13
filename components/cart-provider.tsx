"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem={productId:string;slug:string;name:string;price:number;image:string;size:string;quantity:number};
type CartContextValue={items:CartItem[];count:number;subtotal:number;addItem:(item:CartItem)=>void;updateQuantity:(key:string,quantity:number)=>void;removeItem:(key:string)=>void;clear:()=>void;open:boolean;setOpen:(open:boolean)=>void};
const CartContext=createContext<CartContextValue|null>(null);
const storageKey="cpx-cart-v1";
export function itemKey(item:Pick<CartItem,"productId"|"size">){return `${item.productId}-${item.size}`}
export function CartProvider({children}:{children:React.ReactNode}){
 const [items,setItems]=useState<CartItem[]>([]);const [open,setOpen]=useState(false);const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{try{const stored=localStorage.getItem(storageKey);if(stored)setItems(JSON.parse(stored));}catch{}setHydrated(true)},[]);
 useEffect(()=>{if(hydrated)localStorage.setItem(storageKey,JSON.stringify(items))},[items,hydrated]);
 const addItem=useCallback((item:CartItem)=>{setItems(current=>{const key=itemKey(item);const exists=current.find(i=>itemKey(i)===key);return exists?current.map(i=>itemKey(i)===key?{...i,quantity:Math.min(i.quantity+item.quantity,10)}:i):[...current,item]});setOpen(true)},[]);
 const updateQuantity=useCallback((key:string,quantity:number)=>setItems(c=>quantity<1?c.filter(i=>itemKey(i)!==key):c.map(i=>itemKey(i)===key?{...i,quantity:Math.min(quantity,10)}:i)),[]);
 const removeItem=useCallback((key:string)=>setItems(c=>c.filter(i=>itemKey(i)!==key)),[]);
 const clear=useCallback(()=>setItems([]),[]);
 const value=useMemo(()=>({items,count:items.reduce((n,i)=>n+i.quantity,0),subtotal:items.reduce((n,i)=>n+i.price*i.quantity,0),addItem,updateQuantity,removeItem,clear,open,setOpen}),[items,addItem,updateQuantity,removeItem,clear,open]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){const value=useContext(CartContext);if(!value)throw new Error("useCart must be used inside CartProvider");return value}
