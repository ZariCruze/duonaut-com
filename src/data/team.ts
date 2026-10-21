// Zespół. Biogramy jednakowym formatem i podobnej długości.
// photo: po dostarczeniu zdjęć w jednolitej konwencji dodać plik do src/assets/team/ i podpiąć import.

import type { ImageMetadata } from 'astro';

export type Person = {
  name: string;
  role: string;
  /** Jedno zdanie: za co odpowiada (strona główna). */
  responsibility: string;
  /** Biogram zawodowy (strona /zespol). */
  bio: string[];
  photo?: ImageMetadata;
};

export const team: Person[] = [
  {
    name: 'Michał Zaremba',
    role: 'Założyciel',
    responsibility: 'Odpowiada za metodę, diagnozę procesową, ład wdrożeniowy i jakość.',
    bio: [
      'Osiemnaście lat w zarządzaniu usługami IT i optymalizacji procesów. Były dyrektor infrastruktury IT w grupie ubezpieczeniowej Generali, gdzie kierował czterdziestoosobowym zespołem inżynierów odpowiadającym za infrastrukturę całej grupy w Polsce. Wcześniej Ericsson i T-Mobile, następnie automatyzacja procesów klasy RPA dla dużych organizacji.',
      'ITIL Expert i certyfikowany trener ITIL, Lean Six Sigma, certyfikacje Microsoft.',
    ],
  },
  {
    name: 'Wojciech Rogman',
    role: 'Automatyzacja inteligentna',
    responsibility:
      'Projektuje systemy wieloagentowe w Copilot Studio i Azure AI Foundry z egzekwowaniem reguł ładu korporacyjnego.',
    bio: [
      'Blisko dziesięć lat w RPA i automatyzacji procesów biznesowych, między innymi w Accenture, Santanderze, DSV, T-Mobile i Dentons. Starszy konsultant Microsoft AI i automatyzacji w międzynarodowej firmie doradczej.',
      'Projektuje systemy wieloagentowe w Copilot Studio i Azure AI Foundry z egzekwowaniem reguł ładu korporacyjnego. Głębia technologiczna w stosie Microsoft — obszarze, który dla wielu organizacji jest naturalnym punktem wejścia w sztuczną inteligencję.',
    ],
  },
];

export const staffingPrinciple =
  'Do każdego projektu dobieramy ekspertów, którzy robili to wcześniej. Nie pracujemy z osobami, które uczą się na kliencie.';
