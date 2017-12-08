/* eslint-env detox/detox, jest */

import { benchmarksPickerData } from '../src/components/App'

const getPickerItemElement = index => element(by.text(benchmarksPickerData[index].label)).atIndex(1)

describe('App', () => {
  it('should close the initially opened picker', async () => {
    await element(by.text('Cancel')).tap()
    await expect(element(by.text('Cancel'))).toBeNotVisible()
  })

  it('should have a run button', async () => {
    await expect(element(by.id('runButton'))).toBeVisible()
  })

  it('should not have a table component initially', async () => {
    await expect(element(by.id('benchmarkTable'))).toBeNotVisible()
  })

  it('should have a button to change css lib', async () => {
    await expect(element(by.id('changeCSSLibButton'))).toBeVisible()
  })

  it('should not show css in js libs before tap', async () => {
    await expect(getPickerItemElement(0)).toNotExist()
  })

  it('should show css in js libs after tap', async () => {
    await element(by.id('changeCSSLibButton')).tap()
    await expect(getPickerItemElement(0)).toBeVisible()
  })

  benchmarksPickerData.forEach((benchmarkPickerData, index) => {
    it(`should run benchmark for ${benchmarkPickerData.label}`, async () => {
      await device.reloadReactNative()

      // Tap on each picker item until we get to the one we want.
      // This is an workaround for detox not supporting scrollTo on a Picker component.
      // Follow issue: https://github.com/wix/detox/issues/308
      // eslint-disable-next-line no-await-in-loop
      for (let i = 0; i <= index; i++) await getPickerItemElement(i).tap()

      await element(by.text('Done')).tap()

      await waitFor(element(by.id('benchmarkHasFinishedRunning')))
        .toExist()
        .withTimeout(30000)
    })
  })

  // TODO: Get the results from the app and update RESULTS.md file automatically.
  // Currently not support by detox.
  // Follow issue: https://github.com/brunolemos/react-native-css-in-js-benchmarks
  it('should show the results', async () => {
    await element(by.id('showResultsButton')).tap()
  })
})
