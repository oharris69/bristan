export default async function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;

  const path = new URL(link.href).pathname;
  const resp = await fetch(`${path}.model.json`);
  if (!resp.ok) return;

  const json = await resp.json();

  block.innerHTML = '';
  Object.entries(json).forEach(([key, val]) => {
    if (typeof val === 'string' && !key.startsWith(':')) {
      const p = document.createElement('p');
      p.dataset.field = key;
      p.textContent = val;
      block.appendChild(p);
    }
  });
}