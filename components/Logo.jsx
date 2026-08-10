export default function Logo({ className = 'logo', href = '/' }) {
  return (
    <a href={href} className={className}>
      <svg className="mark" viewBox="0 0 30 30" aria-hidden="true">
        <line x1="4" y1="26" x2="4" y2="9" />
        <line x1="4" y1="9" x2="15" y2="20" />
        <line x1="15" y1="20" x2="26" y2="9" />
        <line x1="26" y1="9" x2="26" y2="26" />
        <circle className="dot" cx="15" cy="6" r="2.4" />
      </svg>
      Montegritty
    </a>
  );
}
