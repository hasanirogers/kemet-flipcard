import { LitElement, html, css } from 'lit-element';

export class KemetFlipcardTrigger extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          cursor: pointer;
        }
      `
    ];
  }

  constructor() {
    super();

    this.keyCodes = {
      ENTER: 13,
      SPACE: 32
    };
  }

  render() {
    // eslint-disable-next-line no-unused-expressions
    return html `
      <slot @click=${() => this.trigger()} @keypress=${(event) => this.handleKeyup(event)}></slot>
    `;
  }

  trigger() {
    this.dispatchEvent(new CustomEvent('kemet-flipcard-flipped', {
      bubbles: true,
      composed: true,
      detail: this,
    }))
  }

  handleKeyup(event) {
    event.preventDefault();

    if (event.keyCode === this.keyCodes.ENTER) {
      this.trigger();
    }
  }
}
