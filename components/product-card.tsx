'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Heart } from './icons';

export type Product = { name:string; type:string; price:string; image:string; tag?:string; colors:string[] };
export function ProductCard({ product }: {product: Product}) {
 const [liked,setLiked]=useState(false);
 return <article className="product-card">
   <div className="product-image">{product.tag && <span className="tag">{product.tag}</span>}<button onClick={()=>setLiked(!liked)} className={`heart ${liked?'liked':''}`} aria-label="Wishlist"><Heart fill={liked?'currentColor':'none'}/></button><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 85vw, 25vw" /></div>
   <div className="product-meta"><div><p>{product.type}</p><h3>{product.name}</h3></div><strong>{product.price}</strong></div>
   <div className="colors">{product.colors.map(c=><i key={c} style={{background:c}} />)}<span>{product.colors.length} colors</span></div>
 </article>
}
