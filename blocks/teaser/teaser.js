import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageCell, textCell] = [...block.children].map((row) => row.firstElementChild);

  const picture = imageCell?.querySelector('picture');
  const text = textCell?.querySelector('h1,h2,h3,h4,h5,h6,p');
  const cta = textCell?.querySelector('a');

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'teaser-wrapper';

  if (picture) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'teaser-image';
    imgDiv.append(picture);
    wrapper.append(imgDiv);
  }

  const contentDiv = document.createElement('div');
  contentDiv.className = 'teaser-content';

  if (text) contentDiv.append(text);
  if (cta) {
    cta.className = 'teaser-cta';
    contentDiv.append(cta);
  }

  wrapper.append(contentDiv);
  moveInstrumentation(block, wrapper);
  block.append(wrapper);
}
