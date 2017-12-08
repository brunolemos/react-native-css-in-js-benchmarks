import React from 'react'
import { createComponent } from 'react-fela'
import { ScrollView, Text, View, ViewPropTypes } from 'react-native'

import * as colors from '../../../../utils/colors'
import { getCellColor, toPercent } from '../../../../utils/helpers'
import { TablePropTypes } from '../../../../utils/types'
import { wrapRenderer } from '../helpers'

const Table = createComponent(() => ({}), ScrollView)

const Row = createComponent(
  () => ({
    flexDirection: 'row',
  }),
  View,
)

const Cell = createComponent(
  state => ({
    flex: 1,
    padding: 10,
    backgroundColor: getCellColor(state.opacity),
  }),
  View,
)

const CellText = createComponent(
  () => ({
    textAlign: 'center',
    color: colors.white,
  }),
  Text,
)

const TableComponent = ({ table, ...props }) => (
  <Table removeClippedSubviews={false} {...props} style={props.style}>
    {table.map((row, rowIndex) => (
      <Row key={`row-${rowIndex}`}>
        {row.map((value, columnIndex) => (
          <Cell
            key={`row-${rowIndex}-column-${columnIndex}`}
            style={{ opacity: parseFloat(value) }}
          >
            <CellText numberOfLines={1}>{toPercent(value)}</CellText>
          </Cell>
        ))}
      </Row>
    ))}
  </Table>
)

TableComponent.key = 'fela-primitives-table'
TableComponent.title = 'Fela (Primitives)'

TableComponent.propTypes = {
  style: ViewPropTypes.style,
  table: TablePropTypes.isRequired,
}

export default wrapRenderer(TableComponent)
