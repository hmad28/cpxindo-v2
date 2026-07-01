'use client';
import Image from 'next/image';
import { ArrowRight } from '../icons';

export function Teams() {
  return (
    <section className="teams" id="teams">
      <div className="team-card wide">
        <Image
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1400&q=85"
          fill
          sizes="60vw"
          alt="Football team"
        />
        <div>
          <span>FOOTBALL</span>
          <h3>PLAY AS ONE.</h3>
          <a href="/products">EXPLORE COLLECTION <ArrowRight /></a>
        </div>
      </div>
      <div className="team-card">
        <Image
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85"
          fill
          sizes="40vw"
          alt="Basketball team"
        />
        <div>
          <span>BASKETBALL</span>
          <h3>OWN THE COURT.</h3>
          <a href="/products">EXPLORE COLLECTION <ArrowRight /></a>
        </div>
      </div>
    </section>
  );
}