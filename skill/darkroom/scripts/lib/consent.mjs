// Consent banners cover the design and add their own fonts. Only a recognised consent surface is touched, and only
// its reject / necessary-only control is clicked (accepting changes what loads, so it needs allowAccept).
// Then a newsletter / promo modal covering the page is closed with its own close control (never a submit or sign-up).
// Nothing else on the page is ever clicked. Returns { action: 'rejected'|'accepted'|'unrecognized'|'none', via, overlay? }.

const REJECT_RE = /^\s*(reject( all)?|decline( all)?|refuse|deny( all)?|(use )?(only )?(strictly )?(necessary|essential)( cookies)?( only)?|continue without (accepting|cookies)|rechazar( todo)?|ablehnen|nur notwendige|alle ablehnen|refuser|tout refuser|rifiuta|rifiuta tutto)\s*$/i;
const ACCEPT_RE = /^\s*(accept( all)?( cookies)?|agree|allow all|aceptar|akzeptieren|alle akzeptieren|accepter|accetta)\s*$/i;

// Runs inside the page/frame: finds the smallest visible consent-looking container and tags its reject/accept control.
function findConsentButtons({ rejectSrc, acceptSrc }) {
  const reject = new RegExp(rejectSrc, 'i');
  const accept = new RegExp(acceptSrc, 'i');
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const sel = '[role=dialog],[aria-modal=true],dialog[open],[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[id*=gdpr i],[class*=gdpr i],[id*=cmp i],[aria-label*=cookie i],[aria-label*=consent i]';
  const talk = /cookie|consent|privacy|tracking|partners|gdpr|datenschutz|confidentialit/i;
  const ctl = 'button,[role=button],a,input[type=button],input[type=submit]';
  const boxes = [...document.querySelectorAll(sel)].filter((el) => vis(el) && talk.test(el.innerText || '') && el.querySelector(ctl));
  document.querySelectorAll('[data-dr-consent]').forEach((e) => e.removeAttribute('data-dr-consent'));
  if (!boxes.length) return { found: false };
  boxes.sort((a, b) => (a.innerText || '').length - (b.innerText || '').length);
  const ctrls = [...boxes[0].querySelectorAll(ctl)].filter(vis);
  const txt = (c) => (c.innerText || c.value || c.getAttribute('aria-label') || '').trim();
  const r = ctrls.find((c) => reject.test(txt(c)));
  const a = ctrls.find((c) => accept.test(txt(c)));
  if (r) r.setAttribute('data-dr-consent', 'rejected');
  if (a) a.setAttribute('data-dr-consent', 'accepted');
  return { found: true, reject: !!r, accept: !!a };
}

// Reject buttons of common consent tools. Playwright locators pierce open shadow roots (Usercentrics renders in one).
const KNOWN_REJECT = ['#onetrust-reject-all-handler', '#CybotCookiebotDialogBodyButtonDecline', '#didomi-notice-disagree-button',
  '[data-testid="uc-deny-all-button"]', '.cky-btn-reject', '#cookiescript_reject', '.cmplz-deny', '#wt-cli-reject-btn',
  '.iubenda-cs-reject-btn', '[data-cookiefirst-action="reject"]', '.osano-cm-denyAll', '#truste-consent-required', '.fc-cta-do-not-consent'];
const CLOSE_RE = /^\s*(close|×|✕|x|no,? thanks|not now|maybe later|dismiss|skip|schließen|fermer|cerrar|chiudi)\s*$/i;

// A newsletter / promo modal over the page (not consent): a visible dialog or a fixed layer covering >= 30 % of the
// viewport. Only its own close control is tagged; nothing that submits, signs up or navigates.
function findOverlayClose({ closeSrc }) {
  const close = new RegExp(closeSrc, 'i');
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity) > 0.05 && r.width > 0 && r.height > 0; };
  document.querySelectorAll('[data-dr-close]').forEach((e) => e.removeAttribute('data-dr-close'));
  const layers = [...document.querySelectorAll('[role=dialog],[aria-modal=true],dialog[open],body *')].filter((el) => {
    if (!vis(el)) return false;
    if (el.matches('[role=dialog],[aria-modal=true],dialog[open]')) return true;
    const s = getComputedStyle(el); if (s.position !== 'fixed') return false;
    const r = el.getBoundingClientRect(); return r.width * r.height >= 0.3 * innerWidth * innerHeight && !el.matches('header, nav, [role=banner], [role=navigation]');
  });
  for (const layer of layers) {
    const btn = [...layer.querySelectorAll('button,[role=button],a[href="#"],a:not([href])')].find((c) => vis(c) && c.type !== 'submit' && close.test((c.getAttribute('aria-label') || c.innerText || c.title || '').trim()));
    if (btn) { btn.setAttribute('data-dr-close', ''); return { found: true }; }
  }
  return { found: false };
}

export async function dismissConsent(page, { allowAccept = false } = {}) {
  const res = await rejectConsent(page, { allowAccept });
  // then any newsletter / promo modal that would cover every frame
  for (const frame of [page.mainFrame()]) {
    const o = await frame.evaluate(findOverlayClose, { closeSrc: CLOSE_RE.source }).catch(() => null);
    if (!o?.found) continue;
    await frame.locator('[data-dr-close]').first().click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(300);
    return { ...res, overlay: 'closed' };
  }
  return res;
}

async function rejectConsent(page, { allowAccept = false } = {}) {
  for (const sel of KNOWN_REJECT) {
    const el = page.locator(sel).first();
    if (await el.isVisible().catch(() => false)) {
      await el.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(400);
      return { action: 'rejected', via: sel };
    }
  }
  let sawBanner = false;
  for (const frame of page.frames()) {
    const res = await frame.evaluate(findConsentButtons, { rejectSrc: REJECT_RE.source, acceptSrc: ACCEPT_RE.source }).catch(() => ({ found: false }));
    if (!res?.found) continue; // some frames return undefined (e.g. a page that patches globals)
    sawBanner = true;
    const rejectBtn = frame.locator('[data-dr-consent=rejected]').first();
    if (await rejectBtn.count()) { await rejectBtn.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(400); return { action: 'rejected', via: 'consent dialog' }; }
    const acceptBtn = frame.locator('[data-dr-consent=accepted]').first();
    if (allowAccept && await acceptBtn.count()) { await acceptBtn.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(400); return { action: 'accepted', via: 'consent dialog' }; }
  }
  return { action: sawBanner ? 'unrecognized' : 'none' };
}
