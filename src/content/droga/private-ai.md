---
title: "Prywatne środowisko AI"
stage: implementacja
order: 4
summary: "Projekt architektury i ładu dla organizacji, które nie mogą przetwarzać danych poza kontrolowanym przez siebie obszarem."
description: "Prywatne środowisko AI dla organizacji z danymi wrażliwymi: dobór poziomu suwerenności, architektura, brama dostępowa i niezależność od dostawcy modeli."
lead: "Część organizacji nie może korzystać z publicznych usług AI. Nie znaczy to, że nie mogą pracować ze sztuczną inteligencją — znaczy, że potrzebują innej architektury."
facts:
  - label: "Dla kogo"
    value: "Organizacje pracujące na danych wrażliwych"
  - label: "Poziom domyślny"
    value: "Model w chmurze organizacji, w uzgodnionym regionie"
  - label: "Zasada doboru"
    value: "Najniższy poziom, który spełnia wymagania procesu"
next: wdrozenia
---

## Problem

Rynkowa oferta sztucznej inteligencji opiera się w dużej mierze na usługach publicznych. Dla instytucji finansowych, ubezpieczycieli, ochrony zdrowia, przemysłu i energetyki, administracji oraz podmiotów objętych tajemnicą branżową lub wymogami umownymi klientów końcowych jest więc w dużej mierze niedostępna.

To nie znaczy, że te organizacje nie mogą pracować ze sztuczną inteligencją. Znaczy, że potrzebują innej architektury i kogoś, kto potrafi ją zaprojektować i utrzymać. Nie budujemy rozwiązań, w których dane organizacji wychodzą poza kontrolowany przez nią obszar bez jej świadomej, udokumentowanej zgody.

## Skala suwerenności

Suwerenność nie jest stanem zero-jedynkowym i nie każdy proces wymaga tego samego poziomu. Dobór poziomu do zastosowania jest jedną z podstawowych decyzji architektonicznych, które podejmujemy razem z organizacją. Często różne procesy w tej samej firmie wymagają różnych poziomów.

### Poziom 1 — usługa publiczna z umową

Model dostawcy, dane chronione zapisami kontraktowymi. Szybkie, tanie i w zupełności wystarczające dla zastosowań nieobjętych tajemnicą przedsiębiorstwa.

### Poziom 2 — model w chmurze organizacji

Model uruchomiony w subskrypcji organizacji — w Azure, GCP albo AWS — w uzgodnionym regionie przetwarzania i pod jej kontrolą dostępową. To jest nasz poziom domyślny.

### Poziom 3 — modele otwarte w infrastrukturze organizacji

Własny sprzęt albo prywatna chmura. Pełna kontrola nad wagami modelu, brak transmisji na zewnątrz i pełna kontrola nad cyklem życia rozwiązania.

### Poziom 4 — własne środowisko AI organizacji

Modele, warstwa wiedzy firmowej, agenci, brama dostępowa, monitoring i rozliczanie kosztów, działające jako wewnętrzna usługa z katalogiem i poziomami wsparcia — na tych samych zasadach co każda inna usługa IT w organizacji.

> Zasada doboru jest prosta: najniższy poziom, który spełnia wymagania danego procesu.

Podnoszenie poziomu bez potrzeby jest marnowaniem pieniędzy organizacji. Obniżanie go poniżej wymagań jest przenoszeniem na nią ryzyka, którego nie zaakceptowała. Nie przyjmujemy prowizji od dostawców technologii, więc rekomendacja wynika wyłącznie z wymagań procesu, a nie z tego, która opcja jest najdroższa.

## Co obejmuje środowisko

Tam, gdzie wymagania prowadzą do poziomu trzeciego lub czwartego, projektujemy środowisko, jego architekturę i zasady, na których będzie działać. Zakres obejmuje:

- **dobór modeli** do zastosowań, wymagań jakościowych i ekonomii eksploatacji,
- **architekturę uruchomieniową** — gdzie i w jaki sposób modele działają,
- **warstwę wiedzy firmowej** — sposób, w jaki rozwiązania sięgają do dokumentów i danych organizacji,
- **bramę dostępową** z uwierzytelnianiem i rejestrowaniem użycia,
- **monitoring kosztów i wydajności**,
- **zasady eksploatacji** — kto zarządza środowiskiem, jak przebiega zmiana, jak wygląda cykl życia modeli.

Środowisko jest od początku projektowane jako usługa wewnętrzna: z właścicielem, katalogiem, poziomem wsparcia i zarządzaniem zmianą. Bez tego nawet najlepiej zaprojektowana architektura staje się kolejnym systemem, którego nikt nie potrafi utrzymać.

## Niezależność od dostawcy

Dyskusja o bezpieczeństwie sztucznej inteligencji niemal zawsze kończy się na wycieku danych. Dla rozwiązania pracującego na produkcji poważniejsze bywa co innego: dostawca wycofuje model, zmienia jego zachowanie, podnosi cenę albo zmienia warunki przetwarzania — a proces oparty na tym modelu przestaje działać tak, jak działał wczoraj.

Projektujemy rozwiązania tak, żeby wymiana modelu była operacją, a nie przebudową. Dla procesów krytycznych oznacza to warstwę pośrednią między aplikacją a modelem oraz wcześniejsze ustalenie, co jest planem zapasowym. Organizacja, która ma własne środowisko, kontroluje ten moment sama.

## Co zostaje u organizacji

Środowisko, jego dokumentacja i kompetencja zespołu, który potrafi z niego korzystać i nim zarządzać. Dokumentujemy wszystko tak, aby zespół organizacji mógł przejąć środowisko w całości. Zostawiamy zdolność, nie zależność.

Ma to znaczenie wykraczające poza bezpieczeństwo. Im większą część powtarzalnej pracy organizacja powierza sztucznej inteligencji, tym ważniejsze jest, kto kontroluje system, na którym ta praca się opiera. Trudno oddać procesy w ręce systemu, nad którym nie ma się kontroli.
