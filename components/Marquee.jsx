import { MARQUEE } from '@/lib/content';

export default function Marquee() {
  return (
    <div className="strip">
      <div className="strip-track">
        {/* two identical groups so the -50% translate loops seamlessly */}
        {[0, 1].map((g) => (
          <div className="strip-group" key={g} aria-hidden={g === 1 ? 'true' : undefined}>
            {MARQUEE.map((item) => <span key={item}>{item}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
