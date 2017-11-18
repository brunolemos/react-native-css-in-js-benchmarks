import { Alert, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const columnsThatFitDevice = Math.floor(windowWidth / 70)

export function avg(arr) {
  return arr.reduce((total, n) => total + n, 0) / arr.length
}

const precision = 2
export function toPercent(value, fractionDigits = precision) {
  return `${(value * 100).toFixed(fractionDigits).toString()}%`
}

export function generateTable(size = 1000) {
  const columns = columnsThatFitDevice
  const rows = Math.ceil(size / columns)

  const table = []
  for (let row = 0; row < rows; row++) {
    table[row] = ['1.0000']
    for (let column = 1; column < columns; column++) {
      const next =
        table[row][column - 1] - Math.random() * table[row][column - 1] / 10
      table[row].push(next.toFixed(precision + 2))
    }
  }

  return table
}

export function getTableSize(table) {
  if (!table || !table[0]) return 0
  return table.length * table[0].length
}

export function getUniqueSize(table) {
  const set = new Set()
  table.forEach(row => row.forEach(x => set.add(x)))
  return set.size
}

export function getCellColor(opacity = 1) {
  return `rgba(51, 105, 30, ${opacity})`
}

export function canUsePerformanceTool(alert = false) {
  if (typeof performance === 'undefined') {
    if (alert)
      Alert.alert(
        'Missing UserTiming API',
        'Performance tools not available. Please try enabling Remote JS Debugging to be able to run the benchmarks.',
      )
    return false
  }

  return true
}

export function getMeasurementDuration(
  { name = 'measurementResult', prefix = '', suffix = '' },
  onlyLastMeasure = false,
) {
  if (!canUsePerformanceTool()) return 0

  const measureName = `${prefix}${name}${suffix}`

  if (onlyLastMeasure)
    return (
      performance.getEntriesByName(measureName, 'measure').reverse()[0] || {}
    ).duration

  return avg(
    performance
      .getEntriesByName(measureName, 'measure')
      .map(measure => measure.duration),
  )
}

export function clearMarksAndMeasures({ prefix = '', suffix = '' } = {}) {
  if (!canUsePerformanceTool()) return

  performance.clearMarks(`${prefix}startMeasurement${suffix}`)
  performance.clearMarks(`${prefix}endMeasurement${suffix}`)
  performance.clearMeasures(`${prefix}measurementResult${suffix}`)
}

export function startMeasurement({ prefix = '', suffix = '' } = {}) {
  if (!canUsePerformanceTool()) return

  performance.mark(`${prefix}startMeasurement${suffix}`)
}

export function endMeasurement(
  { clear = false, prefix = '', suffix = '' } = {},
  callback,
) {
  if (!canUsePerformanceTool()) {
    if (callback) callback(0)
    return
  }

  performance.mark(`${prefix}endMeasurement${suffix}`)
  performance.measure(
    `${prefix}measurementResult${suffix}`,
    `${prefix}startMeasurement${suffix}`,
    `${prefix}endMeasurement${suffix}`,
  )

  const duration = getMeasurementDuration(
    { name: 'measurementResult', prefix, suffix },
    true,
  )

  if (clear) clearMarksAndMeasures({ prefix, suffix })

  if (callback) callback(duration)
}
