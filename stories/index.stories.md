```js script
import { html } from '@open-wc/demoing-storybook';
import '../kemet-flipcard.js';

export default {
  title: 'KemetFlipcard',
  component: 'kemet-flipcard',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# KemetFlipcard

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add kemet-flipcard
```

```js
import 'kemet-flipcard/kemet-flipcard.js';
```

```js preview-story
export const Simple = () => html`
  <kemet-flipcard></kemet-flipcard>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <kemet-flipcard title="Hello World"></kemet-flipcard>
`;
```
