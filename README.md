# dgtek-google-autocomplete

###### Vue, Vuetify

### Package installation

```
yarn add dgtek-google-autocomplete && rm -r node_modules/dgtek-google-autocomplete/dist/node_modules
```

##### package.json for auto-depoy (CI/CD):

for vue-cli:

```
"scripts": {
  ...
  "serve": "yarn add dgtek-google-autocomplete && rm -r node_modules/dgtek-google-autocomplete/node_modules && vue-cli-service serve",
  "build": "yarn add dgtek-google-autocomplete && rm -r node_modules/dgtek-google-autocomplete/node_modules && vue-cli-service build",
  ...
}
```

### Start package

```js
import 'dgtek-google-autocomplete/dist/dgtek-google-autocomplete.css'
/* ... other imports here */
const { DgtekGoogleAutocomplete } = require('dgtek-google-autocomplete').default
```

### Set API host

```js
window.dispatchEvent(new CustomEvent('set-api-host', {
  detail: {
    host: 'https://example.com' /* API host url must be here */
  }
}))
```

You should wait for Google maps script has been loaded in your component

##### data

```js
data: () => ({
  mapIsReady: false,
  /* ... other variables here */
})
```

##### Catch event

You can change the name of this method (`catchEvent`) to your own

```js
methods: {
  /* your own methods here */,
  catchEvent () {
    const { address, addressComponents, status, url, coordinates, buildingId, error } = event.detail
    ... /* your code will be here */
  }
}
```
<sup>During checking the address, a number of requests will be made to remote server.</sup><br>
<sup>Every request can fail.</sup><br>
<sup>`error` field value should be `null` otherwise this field contains error message</sup>

##### mounted hook

```js
mounted () {
  function waitForGoogleMapsScript () {
    if (!window.google) window.requestAnimationFrame(waitForGoogleMapsScript.bind(this))
    else this.mapIsReady = true
  }

  window.requestAnimationFrame(waitForGoogleMapsScript.bind(this))

  window.addEventListener('new-address-data', this.catchEvent)
}
```

##### beforeDestroy hook

```js
beforeDestroy () {
  ...
  window.removeEventListener('new-address-data', this.catchEvent)
}
```

And then insert this package to your component template:

```html
<DgtekGoogleAutocomplete v-if="mapIsReady" />
```
