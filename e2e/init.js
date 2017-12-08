/* eslint-env detox/detox, jasmine, jest */

const detox = require('detox') // eslint-disable-line import/no-extraneous-dependencies

const config = require('../package.json').detox

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

beforeAll(async () => {
  if (typeof device === 'undefined') {
    await detox.init(config)
  }

  // // clear async storage that contains old benchmark results
  // await device.uninstallApp()
  // await device.installApp()

  await device.reloadReactNative()
})

beforeEach(async () => {
  if (typeof device === 'undefined') {
    await detox.init(config)
  }
})

afterAll(async () => {
  // await detox.cleanup()
})
