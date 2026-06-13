'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from './header';
import { ProductCard, Product } from './product-card';
import { ArrowRight, Check, ChevronDown, Facebook, Headphones, Instagram, ShieldCheck, Star, Truck, Youtube, Zap } from './icons';

const products: Product[] = [
 {name:'Ravelle Home 2025',type:'Football Jersey',price:'IDR 189.000',image:'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',tag:'BEST SELLER',colors:['#e3262e','#151515','#f4f1e8']},
 {name:'Velocity Court Pro',type:'Basketball Jersey',price:'IDR 219.000',image:'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=85',tag:'NEW',colors:['#151515','#df2028']},
 {name:'Apex Training Tee',type:'Performance Tee',price:'IDR 149.000',image:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',colors:['#cf2029','#151515','#7f8b90']},
 {name:'Core Match Shorts',type:'Football Shorts',price:'IDR 129.000',image:'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85',tag:'LIMITED',colors:['#111','#e22b33']}
];

export function Home() {
 const [sport,setSport]=useState('Football');
 const [email,setEmail]=useState('');
 const [joined,setJoined]=useState(false);
 return <main id="top">
  <Header />
  <section className="hero">
   <Image src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=2200&q=90" alt="Tim sepak bola CPX" fill priority sizes="100vw" />
   <div className="hero-overlay" />
   <div className="hero-content"><div className="eyebrow"><span /> BUILT FOR THE BOLD</div><h1>WEAR<br/>YOUR <em>PRIDE.</em></h1><p>Jersey bukan cuma seragam. Ini identitas, energi,<br/>dan cerita tim yang kamu bawa ke lapangan.</p><div className="hero-buttons"><a href="#custom" className="btn red">CUSTOM YOUR JERSEY <ArrowRight /></a><a href="#products" className="btn glass">SHOP COLLECTION</a></div></div>
   <div className="hero-index"><b>01</b><span><i/></span><small>04</small></div>
   <div className="trust"><div><b>500+</b><span>TEAMS TRUST US</span></div><div><b>50K+</b><span>JERSEYS PRODUCED</span></div><div><b>4.9</b><span><Star fill="currentColor"/> CUSTOMER RATING</span></div></div>
  </section>

  <section className="marquee"><div>ENGINEERED TO PERFORM <b>✦</b> DESIGNED TO INSPIRE <b>✦</b> MADE IN INDONESIA <b>✦</b> ENGINEERED TO PERFORM <b>✦</b> DESIGNED TO INSPIRE</div></section>

  <section className="section products" id="products"><div className="section-head"><div><span className="kicker">LATEST COLLECTION</span><h2>GEAR UP. <em>STAND OUT.</em></h2></div><a href="#all">VIEW ALL PRODUCTS <ArrowRight/></a></div>
   <div className="filters">{['Football','Futsal','Basketball','Running'].map(s=><button className={sport===s?'active':''} onClick={()=>setSport(s)} key={s}>{s}</button>)}</div>
   <div className="product-grid">{products.map(p=><ProductCard product={p} key={p.name}/>)}</div>
  </section>

  <section className="custom" id="custom"><div className="custom-photo"><Image src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=90" fill sizes="50vw" alt="Custom jersey production"/><div className="fabric-chip"><Zap/><span><b>DRY-X™ FABRIC</b><small>Stay cool. Play harder.</small></span></div></div><div className="custom-copy"><span className="kicker light">MAKE IT YOURS</span><h2>YOUR TEAM.<br/>YOUR RULES.</h2><p>Dari ide pertama sampai jersey siap tanding, tim desain kami bantu wujudkan identitas tim kamu dengan detail yang presisi.</p><div className="steps">{[['01','Pilih Model','Tentukan model, warna, dan material favoritmu.'],['02','Kirim Desain','Punya desain sendiri? Kirim. Belum? Kami bantu.'],['03','Review & Produce','Approve mockup, lalu kami mulai produksi.'],['04','Ready to Win','Jersey dikirim. Saatnya bawa timmu menang.']].map(([n,t,d],i)=><div className={i===0?'open':''} key={n}><b>{n}</b><span><strong>{t}</strong>{i===0&&<small>{d}</small>}</span>{i===0?<Check/>:<ChevronDown/>}</div>)}</div><a className="btn white" href="#start">START CUSTOMIZING <ArrowRight/></a></div></section>

  <section className="section story" id="story"><div className="story-title"><span className="kicker">MORE THAN A JERSEY</span><h2>MADE FOR THOSE<br/>WHO <em>NEVER SETTLE.</em></h2></div><div className="story-text"><p>Kami percaya jersey terbaik lahir dari kombinasi desain yang berani, material yang tepat, dan pengerjaan tanpa kompromi.</p><a href="#about">DISCOVER OUR STORY <ArrowRight/></a></div></section>

  <section className="teams" id="teams"><div className="team-card wide"><Image src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1400&q=85" fill sizes="60vw" alt="Football team"/><div><span>FOOTBALL</span><h3>PLAY AS ONE.</h3><a>EXPLORE COLLECTION <ArrowRight/></a></div></div><div className="team-card"><Image src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85" fill sizes="40vw" alt="Basketball team"/><div><span>BASKETBALL</span><h3>OWN THE COURT.</h3><a>EXPLORE COLLECTION <ArrowRight/></a></div></div></section>

  <section className="benefits"><div><ShieldCheck/><span><b>PREMIUM QUALITY</b><small>Material pilihan, quality control ketat.</small></span></div><div><Truck/><span><b>NATIONWIDE DELIVERY</b><small>Pengiriman ke seluruh Indonesia.</small></span></div><div><Headphones/><span><b>TEAM SUPPORT</b><small>Konsultasi dengan tim CPX.</small></span></div></section>

  <section className="newsletter"><span className="kicker light">JOIN THE SQUAD</span><h2>GET 10% OFF<br/>YOUR FIRST ORDER.</h2><p>Be the first to know about new drops, exclusive offers, and team stories.</p>{joined?<div className="success"><Check/> Welcome to the squad!</div>:<form onSubmit={e=>{e.preventDefault();if(email)setJoined(true)}}><input type="email" placeholder="Enter your email address" value={email} onChange={e=>setEmail(e.target.value)} required/><button aria-label="Subscribe"><ArrowRight/></button></form>}<small>By subscribing, you agree to our Privacy Policy.</small></section>

  <footer><div className="footer-top"><div><a className="logo footer-logo" href="#top"><span className="logo-mark">C</span><span>CPX<small>JERSEY</small></span></a><p>Wear your pride. Play your game.<br/>Made with passion in Indonesia.</p><div className="social"><Instagram/><Youtube/><Facebook/></div></div><div><b>SHOP</b><a>New Drops</a><a>Jersey</a><a>Training</a><a>Accessories</a><a>Sale</a></div><div><b>CUSTOM</b><a>How It Works</a><a>Custom Football</a><a>Custom Futsal</a><a>Custom Basketball</a><a>Size Guide</a></div><div><b>SUPPORT</b><a>Contact Us</a><a>Shipping</a><a>Returns</a><a>FAQ</a><a>Track Order</a></div><div><b>COMPANY</b><a>About CPX</a><a>Our Technology</a><a>Careers</a><a>Journal</a></div></div><div className="footer-bottom"><span>© 2026 CPX JERSEY. ALL RIGHTS RESERVED.</span><span>PRIVACY POLICY &nbsp; TERMS & CONDITIONS</span><span>PROUDLY MADE IN INDONESIA 🇮🇩</span></div></footer>
 </main>
}
