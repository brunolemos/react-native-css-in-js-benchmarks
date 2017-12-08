import React from 'react'
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import * as colors from '../utils/colors'
import Benchmark from './common/Benchmark'
import Button from './common/Button'
import MessageRow, { styles as messageRowStyles } from './common/MessageRow'
import Picker from './common/Picker'
import { benchmarks } from './benchmarks'
import { getTableSize, getUniqueSize } from '../utils/helpers'

export const benchmarksPickerData = benchmarks.map(benchmark => ({
  key: benchmark.key,
  label: benchmark.title,
  value: { TableComponent: benchmark },
}))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({ android: 0, ios: 21 }),
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
  },
  tableLoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {},
  buttonsContainer: {
    padding: 10,
  },
})

const mountTimeKey = 'mountTime'
const renderTimeKey = 'renderTime'

export default class App extends React.PureComponent {
  state = {
    TableComponent: null,
    loading: false,
    mountTime: null,
    renderTime: null,
    results: {},
    running: false,
    table: [],
  }

  async componentWillMount() {
    const results = await this.rehydrateResults()
    this.setState(state => ({
      results: results || state.results,
    }))
  }

  componentDidMount() {
    if (this.picker) this.picker.open()
  }

  getBenchmarkRef = benchmark => {
    if (benchmark) this.benchmark = benchmark
    return benchmark
  }

  getPickerRef = picker => {
    if (picker) this.picker = picker
    return picker
  }

  benchmark = null
  picker = null

  handleGenerateTable = table => this.setState({ table })

  handleGetMountTime = mountTime => this.saveResults(mountTimeKey, mountTime)

  handleGetRenderTime = renderTime =>
    this.saveResults(renderTimeKey, renderTime, { running: false })

  handleRunButtonPress = () => {
    this.setState({ running: true }, () => {
      setTimeout(() => {
        this.benchmark.runRenderTest()
      }, 0)
    })
  }

  handleChangeLibButtonPress = () => {
    this.picker.open()
  }

  handleLibChange = lib => {
    const isValid = Boolean(lib && lib.TableComponent)

    this.setState(
      {
        TableComponent: null,
        loading: isValid,
        mountTime: null,
        renderTime: null,
        running: isValid,
      },
      () => {
        if (!isValid) return

        setTimeout(() => {
          this.setState({ TableComponent: lib.TableComponent, loading: false })
        }, 0)
      },
    )
  }

  rehydrateResults = async () => {
    const results = await AsyncStorage.getItem('results')
    return (results && JSON.parse(results)) || this.state.results || {}
  }

  clearResults = async () => {
    this.setState({ results: {} })
    return AsyncStorage.setItem('results', '{}')
  }

  persistResults = async () =>
    AsyncStorage.setItem('results', JSON.stringify(this.state.results || {}))

  saveResults = (key, value, otherState = {}) => {
    this.setState(state => {
      const results = { ...(state.results || {}) }
      const libResults = { ...(results[state.TableComponent.key] || {}) }

      libResults[key] = value
      results[state.TableComponent.key] = libResults

      return { [key]: value, results, ...otherState }
    }, this.persistResults)
  }

  handleShowResultsButtonPress = () => {
    const results = []

    Object.entries(this.state.results).forEach(([key, libResults]) => {
      const mountTime = Math.round(libResults[mountTimeKey] || 0)
      const renderTime = Math.round(libResults[renderTimeKey] || 0)

      results.push({ key, mountTime, renderTime })
    })

    const orderedResults = results
      .sort((a, b) => a.renderTime - b.renderTime)
      .map(result => `${result.key}: ${result.mountTime}, ${result.renderTime}`)

    const resultsStr = `[LIB]: [MOUNT TIME], [RENDER TIME]\n${orderedResults.join(
      '\n',
    )}`

    Alert.alert('Results', resultsStr, [
      { text: 'OK', onPress: () => {} },
      { text: 'Reset', onPress: this.clearResults, style: 'destructive' },
    ])
  }

  render() {
    const {
      TableComponent,
      loading,
      mountTime,
      renderTime,
      results,
      running,
      table,
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <View style={styles.innerContainer}>
          <MessageRow backgroundColor={colors.white} bold color={colors.black}>
            {(TableComponent
              ? TableComponent.title
              : 'CSS in JS Benchmarks'
            ).toUpperCase()}
          </MessageRow>

          {TableComponent && (
            <MessageRow>
              <Text style={messageRowStyles.text}>
                <Text testID="uniqueTableCellsText">{`${getUniqueSize(
                  table,
                )}`}</Text>
                {' unique cells in '}
                <Text testID="totalTableCellsText">{`${getTableSize(
                  table,
                )}`}</Text>
              </Text>
            </MessageRow>
          )}

          <View style={styles.tableContainer}>
            {loading ? (
              <View style={styles.tableLoadingContainer}>
                <ActivityIndicator color={colors.purple} />
              </View>
            ) : !TableComponent ? null : (
              <Benchmark
                ref={this.getBenchmarkRef}
                key={`benchmark-${TableComponent.key}`}
                TableComponent={TableComponent}
                onGenerateTable={this.handleGenerateTable}
                onGetMountTime={this.handleGetMountTime}
                onGetRenderTime={this.handleGetRenderTime}
                style={styles.table}
              />
            )}
          </View>

          <MessageRow containerStyle={{ flexDirection: 'row' }}>
            <MessageRow containerStyle={{ flex: 1 }}>
              <Text style={messageRowStyles.text}>
                Mount time:{' '}
                <Text testID="mountTimeText">{`${Math.round(
                  mountTime || 0,
                )}ms`}</Text>
              </Text>
            </MessageRow>

            <MessageRow containerStyle={{ flex: 1 }}>
              <Text style={messageRowStyles.text}>
                Rerender time:{' '}
                <Text testID="rerenderTimeText">{`${Math.round(
                  renderTime || 0,
                )}ms`}</Text>
              </Text>
            </MessageRow>
          </MessageRow>

          {Boolean(renderTime > 0 && !running && !loading) && (
            <View testID="benchmarkHasFinishedRunning" />
          )}

          <View style={styles.buttonsContainer}>
            <Button
              containerStyle={{ marginBottom: 10 }}
              disabled={!TableComponent}
              loading={running && !loading}
              onPress={this.handleRunButtonPress}
              testID="runButton"
            >
              Run again
            </Button>

            <Button
              containerStyle={{ marginBottom: 10 }}
              dark
              disabled={running || loading || !Object.keys(results).length}
              onPress={this.handleShowResultsButtonPress}
              outline
              testID="showResultsButton"
            >
              Show Results
            </Button>

            {Platform.OS === 'ios' && (
              <Button
                dark
                onPress={this.handleChangeLibButtonPress}
                outline
                testID="changeCSSLibButton"
              >
                {TableComponent
                  ? 'Change CSS in JS lib'
                  : 'Select CSS in JS lib'}
              </Button>
            )}

            <Picker
              ref={this.getPickerRef}
              data={benchmarksPickerData}
              initialSelectedKey={null}
              onChange={this.handleLibChange}
              testID="libsPicker"
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
