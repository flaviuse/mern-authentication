# React Async Script Loader

[![Build Status][travis.img]][travis.url] [![npm version][npm.img]][npm.url] [![npm downloads][npm.dl.img]][npm.dl.url] [![Dependencies][deps.img]][deps.url]

**NOTE* - These are the docs for the upcoming `1.0.0` release - for `v0.11.1` documention go to tag here: [0.11.1](https://github.com/dozoisch/react-async-script/tree/v0.11.1)

A React HOC for loading 3rd party scripts asynchronously. This HOC allows you to wrap a component that needs 3rd party resources, like reCAPTCHA or Google Maps, and have them load the script asynchronously.

## Usage

#### Async Script HOC api

`makeAsyncScriptLoader(getScriptUrl, options)(Component)`

- `Component`: The *Component* to wrap.
- `getScriptUrl`: *string* or *function* that returns the full URL of the script tag.
- `options` *(optional)*:
    - `callbackName`: *string* : If the script needs to call a global function when finished loading *(for example: `recaptcha/api.js?onload=callbackName`)*. Please provide the callback name here and it will be autoregistered on `window` for you.
    - `globalName`: *string* : Can provide the name of the global that the script attaches to `window`. Async-script will pass this as a prop to the wrapped component. *(`props[globalName] = window[globalName]`)*
    - `removeOnUnmount`: *boolean* **default=false** : If set to `true` removes the script tag when component unmounts.
    - `scriptId`: *string* : If set, it adds the following id on the script tag.

#### HOC Component props
```js
const AsyncScriptComponent = makeAsyncScriptLoader(URL)(Component);
// ---
<AsyncScriptComponent asyncScriptOnLoad={callAfterScriptLoads} />
```
- `asyncScriptOnLoad`: *function* : called after script finishes loading. *using `script.onload`*


#### Ref and forwardRef

`react-async-script` uses react's `forwardRef` method to pass along the `ref` applied to the wrapped component.

If you pass a `ref` prop you'll have access to your wrapped components instance. See the tests for detailed example.

Simple Example:
```js
const AsyncHoc = makeAsyncScriptLoader(URL)(ComponentNeedsScript);

class DisplayComponent extends React.Component {
  constructor(props) {
    super(props);
    this._internalRef = React.createRef();
  }
  componentDidMount() {
    console.log("ComponentNeedsScript's Instance -", this._internalRef.current);
  }
  render() { return (<AsyncHoc ref={this._internalRef} />)}
}
```

##### Notes on Requirements

At least `React@16.4.1` is required due to `forwardRef` usage internally.


### Example

See https://github.com/dozoisch/react-google-recaptcha

```js
// recaptcha.js
export class ReCAPTCHA extends React.Component {
  componentDidUpdate(prevProps) {
    // recaptcha has loaded via async script
    if (!prevProps.grecaptcha && this.props.grecaptcha) {
      this.props.grecaptcha.render(this._container)
    }
  }
  render() { return (
    <div ref={(r) => this._container = r} />)
  }
}

// recaptcha-wrapper.js
import makeAsyncScriptLoader from "react-async-script";
import { ReCAPTCHA } from "./recaptcha";

const callbackName = "onloadcallback";
const URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
// the name of the global that recaptcha/api.js sets on window ie: window.grecaptcha
const globalName = "grecaptcha";

export default makeAsyncScriptLoader(URL, {
  callbackName: callbackName,
  globalName: globalName,
})(ReCAPTCHA);

// main.js
import ReCAPTCHAWrapper from "./recaptcha-wrapper.js"

const onLoad = () => console.log("script loaded")

React.render(
  <ReCAPTCHAWrapper asyncScriptOnLoad={onLoad} />,
  document.body
);
```

## Migration to 1.0

- Component is now passed as a second function call
- removeOnMount is now removeOnUnmount (typo fixed!)
- exposeFuncs is no longer needed as it's done automatically!

```diff
-export default makeAsyncScriptLoader(ReCAPTCHA, getURL, {
+export default makeAsyncScriptLoader(getURL, {
   callbackName,
   globalName,
-  removeOnMount: initialOptions.removeOnMount || false,
+  removeOnUnmount: initialOptions.removeOnUnmount || false,
-  exposeFuncs: ["getValue", "getWidgetId", "reset", "execute"],
-});
+})(ReCAPTCHA);
```


## Notes

Pre `1.0.0` and - `React < React@16.4.1` support details in [0.11.1](https://github.com/dozoisch/react-async-script/tree/v0.11.1).

---

[travis.img]: https://travis-ci.org/dozoisch/react-async-script.svg?branch=master
[travis.url]: https://travis-ci.org/dozoisch/react-async-script
[npm.img]: https://badge.fury.io/js/react-async-script.svg
[npm.url]: http://badge.fury.io/js/react-async-script
[npm.dl.img]: https://img.shields.io/npm/dm/react-async-script.svg
[npm.dl.url]: https://www.npmjs.com/package/react-async-script
[deps.img]: https://david-dm.org/dozoisch/react-async-script.svg
[deps.url]: https://david-dm.org/dozoisch/react-async-script
