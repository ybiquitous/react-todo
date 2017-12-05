import './scripts/index'

/* eslint-disable no-console */
if ('serviceWorker' in navigator) {
  // eslint-disable-next-line compat/compat
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      console.info(
        'ServiceWorker registration successful with scope:',
        registration.scope,
      )
    })
    .catch(err => {
      console.error('ServiceWorker registration failed:', err)
    })
}
/* eslint-enable no-console */
