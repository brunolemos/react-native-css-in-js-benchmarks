/* eslint-env detox/detox, jasmine */

const detox = require('detox') // eslint-disable-line import/no-extraneous-dependencies

const config = require('../package.json').detox

// Set the default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

beforeEach(async () => {
  if (typeof device === 'undefined') {
    await detox.init(config)
  }

  await device.reloadReactNative()
})

afterAll(async () => {
  await detox.cleanup()
})
