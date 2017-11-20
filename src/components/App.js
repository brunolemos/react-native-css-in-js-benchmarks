import React from 'react'
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import * as colors from '../utils/colors'
import { getTableSize, getUniqueSize } from '../utils/helpers'

import Benchmark from './common/Benchmark'
import Button from './common/Button'
import MessageRow from './common/MessageRow'
import Picker from './common/Picker'

// benchmarks
import FelaInlineTable from './benchmarks/fela/inline'
import FelaSimpleTable from './benchmarks/fela/simple'
import GlamorousInlineTable from './benchmarks/glamorous/inline'
import GlamorousPropsTable from './benchmarks/glamorous/props'
import GlamorousSimpleTable from './benchmarks/glamorous/simple'
import ReactNativeInlineOnlyTable from './benchmarks/react-native/inline-only'
import ReactNativeStyleSheetTable from './benchmarks/react-native/stylesheet'
import StyledComponentsDecoupledCellTable from './benchmarks/styled-components/decoupled-cell'
import StyledComponentsInlineTable from './benchmarks/styled-components/inline'
import StyledComponentsSimpleTable from './benchmarks/styled-components/simple'

const benchmarks = [
  FelaInlineTable,
  FelaSimpleTable,
  GlamorousInlineTable,
  GlamorousPropsTable,
  GlamorousSimpleTable,
  ReactNativeInlineOnlyTable,
  ReactNativeStyleSheetTable,
  StyledComponentsDecoupledCellTable,
  StyledComponentsInlineTable,
  StyledComponentsSimpleTable,
].map(benchmark => ({
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
            <MessageRow>{`${getUniqueSize(
              table,
            )} unique cells in ${getTableSize(table)}`}</MessageRow>
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
            <MessageRow containerStyle={{ flex: 1 }}>{`Mount time: ${(
              mountTime || 0
            ).toFixed(2)}ms`}</MessageRow>

            <MessageRow containerStyle={{ flex: 1 }}>{`Rerender time: ${`${(
              renderTime || 0
            ).toFixed(2)}ms`}`}</MessageRow>
          </MessageRow>

          <View style={styles.buttonsContainer} testID="runButtonContainer">
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
              data={benchmarks}
              initialSelectedKey={null}
              onChange={this.handleLibChange}
            />
          </View>
        </View>
      </View>
    )
  }
}
