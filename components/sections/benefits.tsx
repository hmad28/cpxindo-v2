import { ShieldCheck, Headphones, Truck } from '../icons';

export function Benefits() {
  return (
    <section className="benefits">
      <div>
        <ShieldCheck />
        <span>
          <b>PREMIUM QUALITY</b>
          <small>Material pilihan, quality control ketat.</small>
        </span>
      </div>
      <div>
        <Truck />
        <span>
          <b>NATIONWIDE DELIVERY</b>
          <small>Pengiriman ke seluruh Indonesia.</small>
        </span>
      </div>
      <div>
        <Headphones />
        <span>
          <b>TEAM SUPPORT</b>
          <small>Konsultasi dengan tim CPX.</small>
        </span>
      </div>
    </section>
  );
}