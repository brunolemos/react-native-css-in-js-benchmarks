/* eslint-env detox/detox, jest */

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should find a component', async () => {
    await expect(element(by.id('runButtonContainer'))).toBeVisible()
  })
})
