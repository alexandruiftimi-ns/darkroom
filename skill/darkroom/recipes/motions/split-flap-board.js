/* Dark Motions · Split-flap board (T11) · module
   An airport-style board: each tile flickers through random letters before landing on the next word.
   Use: travel, events, "now showing", rotating value words
   Markup: put the snippet in demo.html#split-flap-board inside <div data-dm="split-flap-board">…</div>.
   Tokens: --dm-a, --dm-b, --dm-c (accents), --dm-ink, --dm-bg, --dm-muted, --dm-dur (1 = normal speed). Set them from the bible. */
import { motion } from './dm-kit.js';

motion('split-flap-board', function (r, k) {
    const words = ['ARRIVE', 'DEPART', 'ONTIME', 'BOARDS', 'LONDON'], A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const board = r.querySelector('.board'), cells = [];
    for (let i = 0; i < 6; i++) { const c = document.createElement('span'); c.className = 'cell'; c.textContent = words[0][i]; board.append(c); cells.push(c); }
    let w = 0;
    k.every(2800, () => {
      w = (w + 1) % words.length; const target = words[w];
      cells.forEach((c, i) => {
        let n = 4 + i * 2;
        const step = () => {
          c.classList.remove('flip'); void c.offsetWidth; c.classList.add('flip');
          c.textContent = n-- > 0 ? A[Math.floor(Math.random() * 26)] : target[i];
          if (n >= 0) k.later(70, step);
        };
        k.later(i * 60, step);
      });
    });
  });
