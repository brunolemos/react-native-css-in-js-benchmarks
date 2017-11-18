import React from 'react'
import { ScrollView, Text, View, ViewPropTypes } from 'react-native'

import * as colors from '../../../../utils/colors'
import { getCellColor, toPercent } from '../../../../utils/helpers'
import { TablePropTypes } from '../../../../utils/types'

const TableComponent = ({ table, ...props }) => (
  <ScrollView removeClippedSubviews={false} {...props} style={props.style}>
    {table.map((row, rowIndex) => (
      <View
        key={`row-${rowIndex}`}
        style={{
          flexDirection: 'row',
        }}
      >
        {row.map((value, columnIndex) => (
          <View
            key={`row-${rowIndex}-column-${columnIndex}`}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: getCellColor(parseFloat(value)),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textAlign: 'center',
                color: colors.white,
              }}
            >
              {toPercent(value)}
            </Text>
          </View>
        ))}
      </View>
    ))}
  </ScrollView>
)

TableComponent.key = 'react-native-inline-only-table'
TableComponent.title = 'React Native (Inline Only)'

TableComponent.propTypes = {
  style: ViewPropTypes.style,
  table: TablePropTypes.isRequired,
}

export default TableComponent
