import PropTypes from 'prop-types'
import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { getTableSize, getUniqueSize } from '../utils/helpers'

import Benchmark from './common/Benchmark'
import MessageRow from './common/MessageRow'

// benchmarks
// import StyledComponentsDecoupleCellTable from './benchmarks/styled-components/decouple-cell'
// import StyledComponentsInlineTable from './benchmarks/styled-components/inline'
import StyledComponentsSimpleTable from './benchmarks/styled-components/simple'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 21,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
  },
  table: {},
  buttonContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: '#7CB342',
    padding: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
})

export default class App extends React.PureComponent {
  static propTypes = {
    TableComponent: PropTypes.func,
  }

  state = {
    TableComponent: this.props.TableComponent || StyledComponentsSimpleTable,
    mountTime: null,
    renderTime: null,
    table: [],
  }

  getBenchmarkRef = benchmark => {
    if (benchmark) this.benchmark = benchmark
    return benchmark
  }

  benchmark = null

  handleGenerateTable = table => this.setState({ table })
  handleGetMountTime = mountTime => this.setState({ mountTime })
  handleGetRenderTime = renderTime => this.setState({ renderTime })

  handlePress = () => {
    this.setState({ renderTime: null }, () => {
      this.benchmark.generateNewTable(() => {
        this.benchmark.runRenderTest()
      })
    })
  }

  render() {
    const { TableComponent, mountTime, renderTime, table } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <MessageRow backgroundColor="#FFFFFF" bold color="#000000">
            {(TableComponent.title || 'No Title').toUpperCase()}
          </MessageRow>

          <MessageRow
            backgroundColor="#ECEFF1"
            color="#78909C"
          >{`${getUniqueSize(table)} unique cells in ${getTableSize(
            table,
          )}`}</MessageRow>

          <View style={styles.tableContainer}>
            <Benchmark
              ref={this.getBenchmarkRef}
              TableComponent={TableComponent}
              onGenerateTable={this.handleGenerateTable}
              onGetMountTime={this.handleGetMountTime}
              onGetRenderTime={this.handleGetRenderTime}
              style={styles.table}
            />
          </View>

          <MessageRow containerStyle={{ flexDirection: 'row' }}>
            <MessageRow containerStyle={{ flex: 1 }}>{`Mount time: ${(
              mountTime || 0
            ).toFixed(2)}ms`}</MessageRow>
            <MessageRow containerStyle={{ flex: 1 }}>{`Rerender time: ${
              renderTime === null ? '...' : `${(renderTime || 0).toFixed(2)}ms`
            }`}</MessageRow>
          </MessageRow>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={renderTime === null}
              onPress={this.handlePress}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {renderTime === null ? 'Running...' : 'Run again'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
