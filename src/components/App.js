import React from 'react'
import {
  ActivityIndicator,
  Platform,
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

export default class App extends React.PureComponent {
  state = {
    TableComponent: null,
    loading: false,
    mountTime: null,
    renderTime: null,
    running: false,
    table: [],
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

  handleGetMountTime = mountTime => this.setState({ mountTime })

  handleGetRenderTime = renderTime =>
    this.setState({ renderTime, running: false })

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

  render() {
    const {
      TableComponent,
      loading,
      mountTime,
      renderTime,
      running,
      table,
    } = this.state

    return (
      <View style={styles.container}>
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
                <Text testID="mountTimeText">{`${(mountTime || 0).toFixed(
                  2,
                )}ms`}</Text>
              </Text>
            </MessageRow>

            <MessageRow containerStyle={{ flex: 1 }}>
              <Text style={messageRowStyles.text}>
                Rerender time:{' '}
                <Text testID="rerenderTimeText">{`${(renderTime || 0).toFixed(
                  2,
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
      </View>
    )
  }
}
