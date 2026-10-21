# duonaut.com

Strona firmowa Duonaut — *Navigate the new*.

- **Astro 7**: strona statyczna plus jedna funkcja serwerowa (`/api/contact`)
- **Hosting**: Vercel (`@astrojs/vercel`), kod na GitHubie
- **Formularz kontaktowy**: Resend
- **Źródła**: architektura informacji v6, strategia v6, system wizualny v2, brand kit, koncept *Landing v2*. Materiały źródłowe leżą lokalnie w `input/` i nie trafiają do repozytorium.

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:4321 (Astro 7 uruchamia serwer w tle: astro dev stop / logs)
npm run build      # build produkcyjny → dist/ oraz .vercel/output/
npm run check      # sprawdzenie typów
```

Wymagany Node ≥ 22.12. Na Vercelu funkcja działa na Node 24 (`.nvmrc`).

## Wdrożenie

1. Utwórz repozytorium na GitHubie i wypchnij gałąź `main`.
2. W Vercelu: **Add New → Project → Import** tego repozytorium. Framework Astro zostanie wykryty automatycznie.
3. **Settings → Environment Variables** (Production i Preview):

   | Zmienna | Przykład |
   |---|---|
   | `RESEND_API_KEY` | `re_…` |
   | `CONTACT_TO_EMAIL` | `kontakt@duonaut.com` (można podać kilka, po przecinku) |
   | `CONTACT_FROM_EMAIL` | `Duonaut — formularz <formularz@duonaut.com>` |

4. W Resend: **Domains → Add domain** `duonaut.com` i dodaj rekordy DNS (SPF/DKIM). Bez zweryfikowanej domeny Resend nie wyśle wiadomości z adresu `@duonaut.com`.
5. Podłącz domenę w Vercelu (**Settings → Domains**).

Bez zmiennych środowiskowych strona działa normalnie, a formularz zwraca komunikat „chwilowo niedostępny” i podaje adres e-mail.

## Struktura

```
src/
  config/site.ts          dane kontaktowe, nawigacja, CTA  ← tu zmieniamy e-mail, telefon, LinkedIn
  data/                   etapy Drogi, zobowiązania, zespół
  content/droga/*.md      12 podstron usług (Markdown + frontmatter)
  content/warsztat/*.md   karty systemów (REQLOOP, AWA)
  components/home/        11 sekcji strony głównej (rytm rejestrów głośny/cichy z architektury)
  components/             nagłówek, stopka, PageHero, Invitation, SceneLayer (interakcja kompasu)
  pages/                  routing; api/contact.ts — wysyłka przez Resend
  styles/global.css       tokeny systemu wizualnego v2
scripts/build-brand-assets.mjs   generuje og.jpg i favicon.ico (uruchamiany ręcznie)
public/media/sea-loop.mp4        wideo hero (skompresowane z 12,2 MB do 0,76 MB)
```

**Nowa usługa na Drodze**: dodaj plik `src/content/droga/<slug>.md` z polami `title`, `stage`, `order`, `summary`, `description`, `lead`, opcjonalnie `facts` i `next`. Strona, lista na `/droga`, sekcja na stronie głównej i sitemap zaktualizują się same.

## Wydajność — co jest zrobione

- Cały CSS jest wbudowany w `<head>`. Jost i IBM Plex Mono serwujemy z własnego serwera przez Astro Fonts API (z preloadem i metrykami fallbacku).
- Wideo hero ładuje się dopiero po zdarzeniu `load`, tylko na ekranach od 900 px, bez `prefers-reduced-motion` i bez trybu oszczędzania danych. Poza ekranem jest wstrzymywane. Na mobile zostaje statyczna klatka (AVIF).
- Obrazy przechodzą przez `astro:assets` (AVIF/WebP, `srcset`).
- JavaScript to tylko menu mobilne, formularz i interakcja kompasu. Ta ostatnia działa wyłącznie przy myszce i ładuje się w `requestIdleCallback`.
- Lighthouse (mobile, lokalnie): Performance 99, Accessibility 100, Best Practices 100, SEO 100, CLS 0.
- SEO: canonical, Open Graph, sitemap, robots.txt, JSON-LD (Organization, WebSite, BreadcrumbList, Service, Person).

## Do uzupełnienia przed publikacją

- [ ] `src/config/site.ts`: adres e-mail, telefon, URL LinkedIn, dokładne brzmienie statusu partnerskiego Microsoft, opcjonalnie link do kalendarza.
- [ ] `src/pages/polityka-prywatnosci.astro`: dane administratora (nazwa, adres, NIP, KRS) i weryfikacja prawna tekstu.
- [ ] Zdjęcia zespołu w jednolitej konwencji: `src/assets/team/` → pole `photo` w `src/data/team.ts`.
- [ ] Nagrania działania REQLOOP i AWA na danych zanonimizowanych (miejsce oznaczone w `src/pages/warsztat/[slug].astro`).
- [ ] Domena produkcyjna, jeśli inna niż `duonaut.com`: `astro.config.mjs` (`SITE_URL`) i `public/robots.txt`.
- [ ] Przegląd treści podstron Drogi (`src/content/droga/`) — napisane na podstawie strategii v6.
