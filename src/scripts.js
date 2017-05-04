import './scripts/index'

/* eslint-disable no-console */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js') // eslint-disable-line compat/compat
    .then((registration) => {
      console.info('ServiceWorker registration successful with scope:', registration.scope)
    })
    .catch((err) => {
      console.error('ServiceWorker registration failed:', err)
    })
}
/* eslint-enable no-console */
