import { html, fixture, expect } from '@open-wc/testing';

import '../kemet-flipcard.js';
import '../kemet-flipcard-trigger.js';

describe('KemetFlipcard', () => {
  it('has the correct defaults', async () => {
    const element = await fixture(html`
      <kemet-flipcard></kemet-flipcard>
    `);

    expect(element.axis).to.equal('horizontal');
    expect(element.flipped).to.equal(false);
    expect(element.flipOnHover).to.equal(false);
    expect(element.height).to.equal('auto');
    expect(element.measure).to.equal(false);
  });

  it('flips when a trigger is clicked', async () => {
    const element = await fixture(html`
      <kemet-flipcard>
        <div slot="front">
          <kemet-flipcard-trigger>
            <button>Flip me!</button>
          </kemet-flipcard-trigger>
        </div>
      </kemet-flipcard>
    `);

    element.querySelector('kemet-flipcard-trigger button').click();

    expect(element.flipped).to.equal(true);
  });

  it('measures the card', async () => {
    const element = await fixture(html`
      <kemet-flipcard measure>
        <div slot="front">
          <p>Measure me!</p>
        </div>
        <div slot="back">
          <p>Measure me!</p>
        </div>
      </kemet-flipcard>
    `);

    setTimeout(() => {
      expect(element.height).to.not.equal('auto');
    }, 1);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <kemet-flipcard></kemet-flipcard>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
