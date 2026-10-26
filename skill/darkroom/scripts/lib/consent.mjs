// Consent banners cover the design and add their own fonts. Only a recognised consent surface is touched, and only
// its reject / necessary-only control is clicked (accepting changes what loads, so it needs allowAccept).
// Nothing else on the page is ever clicked. Returns { action: 'rejected'|'accepted'|'unrecognized'|'none', via }.

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

export async function dismissConsent(page, { allowAccept = false } = {}) {
  for (const sel of ['#onetrust-reject-all-handler', '#CybotCookiebotDialogBodyButtonDecline', '#didomi-notice-disagree-button']) {
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
    if (!res.found) continue;
    sawBanner = true;
    const rejectBtn = frame.locator('[data-dr-consent=rejected]').first();
    if (await rejectBtn.count()) { await rejectBtn.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(400); return { action: 'rejected', via: 'consent dialog' }; }
    const acceptBtn = frame.locator('[data-dr-consent=accepted]').first();
    if (allowAccept && await acceptBtn.count()) { await acceptBtn.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(400); return { action: 'accepted', via: 'consent dialog' }; }
  }
  return { action: sawBanner ? 'unrecognized' : 'none' };
}
