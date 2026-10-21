// Trzy etapy Drogi (Service Journey). Kolejność ma znaczenie.

export type StageId = 'kompetencja' | 'implementacja' | 'ewolucja';

export type Stage = {
  id: StageId;
  numeral: 'I' | 'II' | 'III';
  name: string;
  goal: string;
  summary: string;
};

export const stages: Stage[] = [
  {
    id: 'kompetencja',
    numeral: 'I',
    name: 'Kompetencje',
    goal: 'Organizacja rozumie, do czego naprawdę służy sztuczna inteligencja, potrafi z niej korzystać bezpiecznie i przestaje się jej bać.',
    summary:
      'Kompetencje są fundamentem działania każdej organizacji, a umiejętność pracy z nową technologią nigdy wcześniej nie miała takiego znaczenia. Budujemy je równolegle na poziomie strategicznym, taktycznym i operacyjnym, tak żeby zarząd, kadra kierownicza i zespoły mówiły o sztucznej inteligencji wspólnym językiem.',
  },
  {
    id: 'implementacja',
    numeral: 'II',
    name: 'Implementacja',
    goal: 'Organizacja realnie pracuje ze sztuczną inteligencją — w skali, w sposób zarządzony i udokumentowany.',
    summary:
      'Diagnoza i pomiar, fundament ładu, gotowość danych, architektura środowiska, pilot z twardym wynikiem, wdrożenie produkcyjne. Celem nie jest zbiór rozwiązań, tylko firma działająca ze sztuczną inteligencją całościowo.',
  },
  {
    id: 'ewolucja',
    numeral: 'III',
    name: 'Ewolucja',
    goal: 'Organizacja nadąża za technologią, która zmienia się szybciej, niż ktokolwiek potrafi się nauczyć.',
    summary:
      'Technologia zmienia się szybciej, niż organizacja potrafi się uczyć. Utrzymujemy rozwiązania, utrzymujemy wiedzę i regularnie doadaptowujemy ekosystem do tego, co pojawia się na rynku.',
  },
];

export const stageById = Object.fromEntries(stages.map((s) => [s.id, s])) as Record<
  StageId,
  Stage
>;
