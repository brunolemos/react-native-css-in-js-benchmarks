import PropTypes from 'prop-types'
import React from 'react'

import {
  avg,
  canUsePerformanceTool,
  clearMarksAndMeasures,
  endMeasurement,
  generateTable,
  startMeasurement,
} from '../../utils/helpers'

export default class Benchmark extends React.PureComponent {
  static propTypes = {
    TableComponent: PropTypes.func.isRequired,
    onGenerateTable: PropTypes.func,
    onGetMountTime: PropTypes.func.isRequired,
    onGetRenderTime: PropTypes.func.isRequired,
  }

  /* eslint-disable react/sort-comp */
  generateNewTable = callback => {
    const table = generateTable()

    if (this.mounted) this.setState({ table }, callback)

    if (this.props.onGenerateTable) this.props.onGenerateTable(table)

    return table
  }
  /* eslint-enable react/sort-comp */

  state = {
    table: this.generateNewTable(),
  }

  componentWillMount() {
    this.mounted = true

    if (!canUsePerformanceTool(true)) return

    clearMarksAndMeasures()
    startMeasurement()
  }

  componentDidMount() {
    if (!canUsePerformanceTool(false)) {
      if (this.props.onGetMountTime) this.props.onGetMountTime(0)
      if (this.props.onGetRenderTime) this.props.onGetRenderTime(0)
      return
    }

    endMeasurement(undefined, duration => {
      clearMarksAndMeasures()
      if (this.props.onGetMountTime) this.props.onGetMountTime(duration)

      this.runRenderTest()
    })
  }

  componentWillUnmount() {
    this.mounted = false

    if (!canUsePerformanceTool(false)) return

    clearMarksAndMeasures()
  }

  mounted = false

  runRenderTest = async (runCount = 10) => {
    if (!canUsePerformanceTool(true)) {
      if (this.props.onGetRenderTime) this.props.onGetRenderTime(0)
      return 0
    }

    clearMarksAndMeasures()

    const durations = []
    for (let i = 0; i < runCount; i++) {
      // eslint-disable-next-line no-await-in-loop, no-loop-func
      const duration = await new Promise(resolve => {
        setTimeout(() => {
          startMeasurement({ suffix: `${i}` })

          this.generateNewTable(() => {
            setTimeout(() => {
              endMeasurement({ clear: true, suffix: `${i}` }, resolve)
            }, 0)
          })
        })
      })

      durations.push(duration)
    }

    const duration = avg(durations)
    clearMarksAndMeasures()

    if (this.props.onGetRenderTime) this.props.onGetRenderTime(duration)

    return duration
  }

  render() {
    const { table } = this.state
    const { TableComponent } = this.props

    return <TableComponent table={table} />
  }
}
