'use client';
import { useState } from 'react';
import { ArrowRight, Check } from '../icons';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <section className="newsletter">
      <span className="kicker light">JOIN THE SQUAD</span>
      <h2>GET 10% OFF<br />YOUR FIRST ORDER.</h2>
      <p>Be the first to know about new drops, exclusive offers, and team stories.</p>
      {joined ? (
        <div className="success">
          <Check /> Welcome to the squad!
        </div>
      ) : (
        <form onSubmit={e => {
          e.preventDefault();
          if (!email) return;
          const stored = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
          stored.push(email);
          localStorage.setItem('newsletter_emails', JSON.stringify(stored));
          setJoined(true);
        }}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button aria-label="Subscribe">
            <ArrowRight />
          </button>
        </form>
      )}
      <small>By subscribing, you agree to our Privacy Policy.</small>
    </section>
  );
}