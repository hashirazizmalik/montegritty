'use client';

import { useEffect, useState } from 'react';
import { CONTACT } from '@/lib/content';
import WhatsAppIcon from './WhatsAppIcon';

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  // Hold it back until the user is past the hero — it shouldn't compete with the headline.
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`wa-float${show ? ' show' : ''}`}
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp at ${CONTACT.whatsappDisplay}`}
      tabIndex={show ? 0 : -1}
    >
      <WhatsAppIcon />
    </a>
  );
}
