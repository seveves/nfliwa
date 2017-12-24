let scripts = [ '/client/bundle.js' ];

let newBrowser = (
  'fetch' in window &&
  'Promise' in window &&
  'assign' in Object &&
  'keys' in Object
);

if (!newBrowser) {
  scripts.unshift('/client/polyfills.js');
}

scripts.forEach((src) => {
  const scriptEl = document.createElement('script');
  scriptEl.src = src;
  scriptEl.async = false;
  document.head.appendChild(scriptEl);
});
