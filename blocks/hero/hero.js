import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // ── Row 0: image ──
  const imageRow = rows[0];
  const picture = imageRow?.querySelector('picture');
  if (picture) {
    block.prepend(picture);
    imageRow.remove();
  }

  // ── Row 1: text (heading + body) ──
  const textRow = rows[1];
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  if (textRow) {
    const inner = textRow.querySelector(':scope > div') || textRow;
    [...inner.childNodes].forEach((node) => contentDiv.appendChild(node.cloneNode(true)));
    textRow.remove();
  }

  // ── Rows 2+: CTA links ──
  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'hero-ctas';

  [...block.children].forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const btn = document.createElement('a');
      btn.href = link.href;
      btn.textContent = link.textContent.trim();
      btn.className = row.querySelector('strong') ? 'hero-btn-primary' : 'hero-btn-secondary';
      ctaWrap.appendChild(btn);
      row.remove();
    }
  });

  if (ctaWrap.children.length) {
    contentDiv.appendChild(ctaWrap);
  }

  moveInstrumentation(block, contentDiv);
  block.appendChild(contentDiv);
}
