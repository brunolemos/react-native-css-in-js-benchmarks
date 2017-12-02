/* eslint-env jest */

const Dimensions = {
  get: jest.fn().mockReturnValue({
    width: 375,
    height: 667,
    fontScale: 1,
    scale: 2,
  }),
}

module.exports = Dimensions
