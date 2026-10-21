// Dane firmy i nawigacja — jedno miejsce do edycji.
// Wartości oznaczone TODO wymagają potwierdzenia przed publikacją.

export const site = {
  name: 'Duonaut',
  tagline: 'Navigate the new',
  description:
    'Budujemy organizacje, które pracują ze sztuczną inteligencją — z dojrzałym zarządzaniem i w rytmie ciągłego rozwoju, tak żeby umiejętnie wykorzystywały rozwój technologiczny.',
  locale: 'pl_PL',
  // TODO: potwierdzić adres e-mail, telefon i profil LinkedIn.
  email: 'kontakt@duonaut.com',
  phone: null as string | null,
  linkedin: 'https://www.linkedin.com/company/duonaut',
  // TODO: potwierdzić dokładne brzmienie statusu partnerskiego.
  partner: 'Partner Microsoft',
  // TODO: link do kalendarza samodzielnej rezerwacji (opcjonalnie, np. Cal.com / Microsoft Bookings).
  bookingUrl: null as string | null,
  responseTime: 'Odpowiadamy zwykle w ciągu jednego dnia roboczego.',
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: 'Podejście', href: '/podejscie' },
  {
    label: 'Droga',
    href: '/droga',
    children: [
      { label: 'Kompetencje', href: '/droga#kompetencja' },
      { label: 'Implementacja', href: '/droga#implementacja' },
      { label: 'Ewolucja', href: '/droga#ewolucja' },
    ],
  },
  { label: 'Warsztat', href: '/warsztat' },
  { label: 'Zespół', href: '/zespol' },
];

export const cta = { label: 'Umów rozmowę', href: '/kontakt' } as const;
