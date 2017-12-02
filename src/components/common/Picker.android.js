/* eslint-disable react-native/no-color-literals */
// Based on https://snack.expo.io/@notbrent/picker-modal-example

import PropTypes from 'prop-types'
import React from 'react'
import { Picker as AndroidPicker } from 'react-native'

export default class Picker extends React.Component {
  static defaultProps = {
    noneItemLabel: 'None',
    showNoneItem: true,
  }

  static propTypes = {
    ...AndroidPicker.propTypes,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ).isRequired,
    noneItemLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    showNoneItem: PropTypes.bool,
  }

  state = {
    selectedKey: null,
  }

  open = () => {
    // TODO: Find out a way to implement this
    console.debug('Picker.open is an iOS only method.')
  }

  close = () => {
    // TODO: Find out a way to implement this
    console.debug('Picker.close is an iOS only method.')
  }

  _handleValueChange = selectedKey => {
    const { data, onChange } = this.props

    this.setState({ selectedKey }, () => {
      const selectedItem = data.find(item => item.key === selectedKey)
      onChange(selectedItem ? selectedItem.value : null)
    })
  }

  render = () => {
    const { selectedKey } = this.state
    const { data, noneItemLabel, showNoneItem, ...props } = this.props
    delete props.initialSelectedKey
    delete props.onChange

    return (
      <AndroidPicker
        mode="dialog"
        {...props}
        selectedValue={selectedKey}
        onValueChange={this._handleValueChange}
      >
        {showNoneItem && (
          <AndroidPicker.Item
            key="picker-no-item"
            label={noneItemLabel}
            value={null}
          />
        )}

        {data.map(({ key, label }) => (
          <AndroidPicker.Item
            key={`picker-item-${key}`}
            label={label}
            value={key}
            accessibilityLabel={label}
          />
        ))}
      </AndroidPicker>
    )
  }
}
