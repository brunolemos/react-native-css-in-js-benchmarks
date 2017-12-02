/* eslint-env jest */

const Platform = {
  OS: 'ios',
  Version: undefined,

  select(objs) {
    return objs[Platform.OS]
  },
}

module.exports = Platform
