/* eslint-disable react-native/no-color-literals */
// Based on https://snack.expo.io/@notbrent/picker-modal-example

import PropTypes from 'prop-types'
import React from 'react'
import {
  Animated,
  Button,
  Dimensions,
  Picker as IOSPicker,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const { width: WindowWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  toolbarLeft: {
    alignSelf: 'flex-start',
  },
  toolbarCenter: {
    flex: 1,
  },
  toolbarRight: {
    alignSelf: 'flex-end',
  },
})

export default class Picker extends React.Component {
  static defaultProps = {
    initialSelectedKey: null,
    noneItemLabel: 'None',
    showNoneItem: true,
  }

  static propTypes = {
    ...IOSPicker.propTypes,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ).isRequired,
    initialSelectedKey: PropTypes.string,
    noneItemLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    showNoneItem: PropTypes.bool,
  }

  state = {
    animatedValue: new Animated.Value(0),
    isVisible: false,
    selectedKey: this.props.initialSelectedKey,
  }

  open = () => {
    if (this.state.isVisible) {
      return
    }

    this.setState({ isVisible: true }, () => {
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    })
  }

  close = callback => {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ isVisible: false }, callback)
    })
  }

  _handleValueChange = selectedKey => {
    this.setState({ selectedKey })
  }

  _handlePressCancel = () => {
    this.close()
  }

  _handlePressDone = () => {
    const { data, onChange } = this.props

    this.close(() => {
      const selectedItem = data.find(
        item => item.key === this.state.selectedKey,
      )

      onChange(selectedItem ? selectedItem.value : null)
    })
  }

  render = () => {
    if (!this.state.isVisible) return null

    const { animatedValue, selectedKey } = this.state
    const { data, noneItemLabel, showNoneItem, ...props } = this.props
    delete props.initialSelectedKey
    delete props.onChange

    const opacity = animatedValue
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    })

    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={this.state.isVisible ? 'auto' : 'none'}
      >
        <TouchableWithoutFeedback onPress={this._handlePressDone}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }],
          }}
        >
          <View style={styles.toolbar}>
            <View style={styles.toolbarLeft}>
              <Button title="Cancel" onPress={this._handlePressCancel} />
            </View>

            <View style={styles.toolbarCenter} />

            <View style={styles.toolbarRight}>
              <Button title="Done" onPress={this._handlePressDone} />
            </View>
          </View>

          <IOSPicker
            {...props}
            style={[
              { width: WindowWidth, backgroundColor: '#e1e1e1' },
              props.style,
            ]}
            selectedValue={selectedKey}
            onValueChange={this._handleValueChange}
          >
            {showNoneItem && (
              <IOSPicker.Item
                key="picker-no-item"
                label={noneItemLabel}
                value={null}
              />
            )}

            {data.map(({ key, label }) => (
              <IOSPicker.Item
                key={`picker-item-${key}`}
                label={label}
                value={key}
              />
            ))}
          </IOSPicker>
        </Animated.View>
      </View>
    )
  }
}
