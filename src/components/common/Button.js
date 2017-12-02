import PropTypes from 'prop-types'
import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native'

import * as colors from '../../utils/colors'

const styles = StyleSheet.create({
  container: {},
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  text: {
    minHeight: 20,
    textAlign: 'center',
  },
})

const Button = ({
  backgroundColor,
  bold,
  children,
  color,
  containerStyle,
  dark,
  disabled,
  loading,
  onPress,
  outline,
  textStyle,
  touchableStyle,
  ...props
}) => {
  const _textColor = outline ? color : dark ? colors.white : colors.black
  const _disabled = loading || disabled || !onPress

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { opacity: _disabled ? 0.5 : 1 },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={_disabled}
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor:
              backgroundColor || (outline ? colors.transparent : color),
            borderColor: outline ? color : colors.transparent,
          },
          touchableStyle,
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator animating color={_textColor} />
        ) : typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              { color: _textColor },
              textStyle,
              bold && { fontWeight: 'bold' },
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </View>
  )
}

Button.defaultProps = {
  color: colors.purple,
  dark: true,
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  color: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  outline: PropTypes.bool,
  textStyle: (Text.propTypes || {}).style,
  touchableStyle: ViewPropTypes.style,
}

export default Button
