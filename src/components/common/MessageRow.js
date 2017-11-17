import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#ECEFF1',
  },
  text: {
    color: '#78909C',
    textAlign: 'center',
    fontSize: 12,
  },
})

const MessageRow = ({
  backgroundColor,
  bold,
  children,
  color,
  containerStyle,
  textStyle,
}) => (
  <View
    style={[
      styles.container,
      containerStyle,
      backgroundColor && { backgroundColor },
    ]}
  >
    {typeof children === 'string' ? (
      <Text
        style={[
          styles.text,
          textStyle,
          bold && { fontWeight: 'bold' },
          color && { color },
        ]}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
)

MessageRow.propTypes = {
  backgroundColor: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  color: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
}

export default MessageRow
