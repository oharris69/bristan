export default function decorate(block) {
  const text = block.querySelector('p');
  const link = block.querySelector('a');

  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'banner-inner';

  if (text) {
    const p = document.createElement('p');
    p.className = 'banner-text';
    p.textContent = text.textContent;
    inner.appendChild(p);
  }

  if (link) {
    link.className = 'banner-link';
    inner.appendChild(link);
  }

  block.appendChild(inner);
}
