/* eslint-env detox/detox, jasmine, jest */

const detox = require('detox') // eslint-disable-line import/no-extraneous-dependencies

const config = require('../package.json').detox

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

jest.mock('Dimensions')
jest.mock('Platform')
jest.mock('Picker')
jest.mock('ScrollView')
jest.mock('StyleSheet')
jest.mock('Text')
jest.mock('View')
jest.mock('ViewPropTypes')

beforeAll(async () => {
  if (typeof device === 'undefined') {
    await detox.init(config)
  }

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
