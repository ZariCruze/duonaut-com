import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from 'astro:env/server';
import { Resend } from 'resend';

// Funkcja serwerowa (Vercel). Reszta serwisu jest statyczna.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { message: 5000, email: 254, organization: 200 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

type Result = { ok: true } | { ok: false; error: string; field?: string };

function respond(request: Request, result: Result, status: number) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify(result), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  // Fallback bez JavaScriptu: przekierowanie po POST.
  const target = result.ok ? '/kontakt/dziekujemy' : '/kontakt?status=blad#formularz';
  return new Response(null, { status: 303, headers: { location: target } });
}

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, string> = {};
  try {
    const type = request.headers.get('content-type') || '';
    if (type.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v)]));
    }
  } catch {
    return respond(request, { ok: false, error: 'Nieprawidłowe dane formularza.' }, 400);
  }

  // Pułapka na boty: pole niewidoczne dla ludzi musi pozostać puste.
  if (data.website) return respond(request, { ok: true }, 200);

  const message = (data.message || '').trim();
  const email = (data.email || '').trim();
  const organization = (data.organization || '').trim();

  if (!message || message.length > LIMITS.message) {
    return respond(request, { ok: false, error: 'Napisz, w czym możemy pomóc.', field: 'message' }, 422);
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return respond(request, { ok: false, error: 'Podaj poprawny adres e-mail.', field: 'email' }, 422);
  }
  if (organization.length > LIMITS.organization) {
    return respond(request, { ok: false, error: 'Nazwa organizacji jest zbyt długa.', field: 'organization' }, 422);
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('[contact] Brak konfiguracji: RESEND_API_KEY, CONTACT_TO_EMAIL lub CONTACT_FROM_EMAIL.');
    return respond(request, { ok: false, error: 'Formularz jest chwilowo niedostępny. Napisz do nas bezpośrednio.' }, 503);
  }

  const subject = `Zapytanie ze strony — ${organization || email}`;
  const text = [`Organizacja: ${organization || '—'}`, `E-mail: ${email}`, '', message].join('\n');
  const html = `<p><strong>Organizacja:</strong> ${escapeHtml(organization || '—')}<br><strong>E-mail:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error('[contact] Błąd wysyłki Resend:', err);
    return respond(request, { ok: false, error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz do nas bezpośrednio.' }, 502);
  }

  return respond(request, { ok: true }, 200);
};
