# simple-google-autocomplete

###### Vue, Vuetify

### Package installation

```
yarn add simple-google-autocomplete && rm -r node_modules/simple-google-autocomplete/dist/node_modules
```

##### package.json for auto-depoy (CI/CD):

for vue-cli:

```
"scripts": {
  ...
  "serve": "yarn add simple-google-autocomplete && rm -r node_modules/simple-google-autocomplete/node_modules && vue-cli-service serve",
  "build": "yarn add simple-google-autocomplete && rm -r node_modules/simple-google-autocomplete/node_modules && vue-cli-service build",
  ...
}
```

### Start package

```js
import 'simple-google-autocomplete/dist/simple-google-autocomplete.css'
/* ... other imports here */
const { SimpleGoogleAutocomplete } = require('simple-google-autocomplete').default
```

##### mounted hook

```js
mounted () {
  window.addEventListener('address-selected', this.catchEvent)
}
```

##### beforeDestroy hook

```js
beforeDestroy () {
  ...
  window.removeEventListener('address-selected', this.catchEvent)
}
```

##### Catch event

You can change the name of this method (`catchEvent`) to your own

```js
methods: {
  /* your own methods here */,
  catchEvent (event) {
    const { address, addressComponents, url, coordinates } = event.detail
    ... /* your code will be here */
  }
}
```

And then insert this package to your component template:

```html
<DgtekGoogleAutocomplete />
```
