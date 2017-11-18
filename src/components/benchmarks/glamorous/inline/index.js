import React from 'react'
import glamorous from 'glamorous-native'

import { getCellColor, toPercent } from '../../../../utils/helpers'
import { TablePropTypes } from '../../../../utils/types'

const Table = glamorous.scrollView()

const Row = glamorous.view({
  flexDirection: 'row',
})

const Cell = glamorous.view({
  flex: 1,
  padding: 10,
})

const Text = glamorous.text({
  textAlign: 'center',
  color: 'white',
})

const TableComponent = ({ table, ...props }) => (
  <Table removeClippedSubviews={false} {...props}>
    {table.map((row, rowIndex) => (
      <Row key={`row-${rowIndex}`}>
        {row.map((value, columnIndex) => (
          <Cell
            key={`row-${rowIndex}-column-${columnIndex}`}
            opacity={parseFloat(value)}
            style={{ backgroundColor: getCellColor(value) }}
          >
            <Text numberOfLines={1}>{toPercent(value)}</Text>
          </Cell>
        ))}
      </Row>
    ))}
  </Table>
)

TableComponent.key = 'glamorous-inline-table'
TableComponent.title = 'Glamorous (Inline)'

TableComponent.propTypes = {
  table: TablePropTypes.isRequired,
}

export default TableComponent
