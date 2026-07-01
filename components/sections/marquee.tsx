export function Marquee() {
  const phrase = "ENGINEERED TO PERFORM ✦ DESIGNED TO INSPIRE ✦ MADE IN INDONESIA ✦ CPX JERSEY ✦ ";
  const repeatedText = phrase.repeat(6);
  
  return (
    <section className="marquee">
      <div className="marquee-track">
        <span className="marquee-content">{repeatedText}</span>
        <span className="marquee-content" aria-hidden="true">{repeatedText}</span>
      </div>
    </section>
  );
}