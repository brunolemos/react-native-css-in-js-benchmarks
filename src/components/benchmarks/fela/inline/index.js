import React from 'react'
import { ScrollView, Text, View, ViewPropTypes } from 'react-native'
import { StyleSheet } from 'fela-tools'

import * as colors from '../../../../utils/colors'
import { getCellColor, toPercent } from '../../../../utils/helpers'
import { TablePropTypes } from '../../../../utils/types'
import { wrapRenderer } from '../helpers'

const rules = StyleSheet.create({
  table: {},
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  },
})

const TableComponent = ({ table, ...props }, { renderer }) => (
  <ScrollView
    removeClippedSubviews={false}
    {...props}
    style={renderer.renderRule(rules.table, props.style)}
  >
    {table.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={renderer.renderRule(rules.row)}>
        {row.map((value, columnIndex) => (
          <View
            key={`row-${rowIndex}-column-${columnIndex}`}
            style={[
              renderer.renderRule(rules.cell),
              {
                backgroundColor: getCellColor(parseFloat(value)),
              },
            ]}
          >
            <Text numberOfLines={1} style={renderer.renderRule(rules.text)}>
              {toPercent(value)}
            </Text>
          </View>
        ))}
      </View>
    ))}
  </ScrollView>
)

TableComponent.key = 'fela-inline-table'
TableComponent.title = 'Fela (Inline)'

TableComponent.propTypes = {
  style: ViewPropTypes.style,
  table: TablePropTypes.isRequired,
}

export default wrapRenderer(TableComponent)
