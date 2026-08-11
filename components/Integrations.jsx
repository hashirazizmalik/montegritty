import { ALSO, INTEGRATIONS } from '@/lib/integrations';
import Reveal from './Reveal';

/**
 * What the agent plugs into.
 *
 * Rendered monochrome on purpose: a row of full-colour brand logos would fight
 * the rest of the page and read as a badge wall. In ink they read as a list of
 * facts, and colour stays reserved for our own accent.
 *
 * Careful with the copy here. These are routes an agent can reach through MCP
 * and n8n, not sixteen finished, supported connectors — do not let this drift
 * into implying a certified integration catalogue we would have to honour.
 */
export default function Integrations() {
  return (
    <section id="integrations">
      <div className="wrap">
        <Reveal className="int">
          <div className="int-head">
            <span className="eyebrow">Connects to what you run</span>
            <h2>It plugs into the rest of <em>your stack</em></h2>
            <p>
              An agent that cannot reach your systems is a recording. Ours connect through
              MCP and n8n, so anything with an API or an existing automation node is
              reachable — these are the ones we are asked for most.
            </p>
          </div>

          <ul className="int-grid">
            {INTEGRATIONS.map((brand) => (
              <li className="int-item" key={brand.slug}>
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
                  <path d={brand.path} />
                </svg>
                <span>{brand.name}</span>
              </li>
            ))}
          </ul>

          <p className="int-also">
            <span>Also</span>
            {ALSO.join(' · ')} — and anything else that exposes an API.
          </p>

          <p className="int-note">
            Connector documentation is on the way. Until then, tell us the system and we
            will confirm the route before you commit to anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
