import Verticals from './Verticals';
import Reveal from './Reveal';

/** Home-page sector band. Compact copy — the depth is on each vertical page. */
export default function Sectors() {
  return (
    <section id="sectors">
      <div className="wrap">
        <Reveal className="shead">
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: 'inline-flex' }}>Who it's for</span>
            <h2>Three sectors, <em>in depth</em></h2>
          </div>
          <p>
            Three where the calls are highest-volume, the literacy gap is widest, and we
            have done the work.
          </p>
        </Reveal>
      </div>
      <Verticals compact />
    </section>
  );
}
