import { html, css, LitElement } from 'lit-element';

export class KemetFlipcard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
        perspective: 1000px;
      }

      section {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      .front,
      .back {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
      }

      .front {
        background-color: var(--kemet-flipcard-front-background, #fafafa);
      }

      .back {
        background-color: var(--kemet-flipcard-back-background, #fafafa)
      }

      :host([axis="horizontal"]) .back {
        transform: rotateY(180deg);
      }

      :host([flipped][axis="horizontal"]) section {
        transform: rotateY(180deg);
      }

      :host([axis="vertical"]) .back {
        transform: rotateX(180deg);
      }

      :host([flipped][axis="vertical"]) section {
        transform: rotateX(180deg);
      }

      :host([flip-on-hover]) section {
        cursor: pointer;
      }

      ::slotted([slot="front"]),
      ::slotted([slot="back"]) {
        display: inline-block;
        margin: auto;
        position: relative;
      }
    `;
  }

  static get properties() {
    return {
      axis: {
        type: String,
        reflect: true,
      },

      flipped: {
        type: Boolean,
        reflect: true,
      },

      flipOnHover: {
        type: Boolean,
        attribute: 'flip-on-hover'
      },

      height: {
        type: String
      },

      measure: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();

    // managed properties
    this.axis = 'horizontal';
    this.flipped = false;
    this.flipOnHover = false;
    this.height = 'auto';
    this.measure = false;

    this.addEventListener('kemet-flipcard-flipped', () => {
      this.flipped = !this.flipped;
    });
  }

  firstUpdated() {
    this.frontChildren = this.shadowRoot.querySelector('[name="front"]').assignedNodes({flatten: true});
    this.backChildren = this.shadowRoot.querySelector('[name="back"]').assignedNodes({flatten: true});
    this.triggers = this.shadowRoot.querySelectorAll('kemet-flipcard-trigger');

    [this.frontElement] = this.frontChildren;
    [this.backElement] = this.backChildren;

    this.determineHeight();
    window.addEventListener('resize', this.determineHeight.bind(this));
  }

  render() {
    return html`
      <section
        tabindex="0"
        part="wrapper"
        @blur=${() => { if (this.flipOnHover) this.flipped = false }}
        @focus=${() => { if (this.flipOnHover) this.flipped = true }}
        @mouseover=${() => { if (this.flipOnHover) this.flipped = true }}
        @mouseout=${() => { if (this.flipOnHover) this.flipped = false }}>
        <div id="front" class="front" part="front">
          <slot name="front"></slot>
        </div>
        <div id="back" class="back" part="back">
          <slot name="back"></slot>
        </div>
      </section>
    `;
  }

  determineHeight() {
    // setTimeout is need to simulate a DOM repaint
    // without the repaint, offsetHeight on Custom Elements = 0
    // so this is needed for 'measure' to work correctly

    setTimeout(() => {
      if (this.measure) {
        if (this.frontElement.offsetHeight > this.backElement.offsetHeight) {
          this.height = `${this.frontElement.offsetHeight}px`;
        } else {
          this.height = `${this.backElement.offsetHeight}px`;
        }

        this.style.height = this.height;
      }
    }, 0);
  }
}
