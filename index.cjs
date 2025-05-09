/**
 *  The Web Assembly portion of `react-render-wave` will cause this to fail
 *  but if we circumvent all of the WASM still it should still export, at least
 */
const { RenderWave } = require('react-render-wave')

/**
 *  Provided WASM is circumvented we should log a function
 */
console.log(RenderWave)
