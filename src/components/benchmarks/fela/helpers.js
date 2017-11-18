/* eslint-disable import/prefer-default-export */

import PropTypes from 'prop-types'
import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { createRenderer } from 'fela-native'
import { Provider } from 'react-fela'

const renderer = createRenderer()

export const wrapRenderer = Component => {
  // eslint-disable-next-line no-param-reassign
  Component.contextTypes = {
    ...(Component.contextTypes || {}),
    renderer: PropTypes.object,
  }

  const FelaWrapper = props => (
    <Provider renderer={renderer}>
      <Component {...props} />
    </Provider>
  )

  return hoistStatics(FelaWrapper, Component)
}
