# CSS in JS Benchmarks
## for React Native


### Results

See [RESULTS.MD](RESULTS.MD) for the benchmark results.


### Technique

- Big table with random data and dynamic background color opacity
- Multiple implementations for each lib with small variations, e.g. using inline styles or not
- Multiple rerenders are executed per test and the result is their average render time

<img alt="React Native running CSS in JS benchmarks on iOS simulator" src="https://user-images.githubusercontent.com/619186/32977849-f75936a6-cc1c-11e7-92fc-10d31e0c4b67.gif" height="600" />

### Libs

- [styled-components](https://github.com/styled-components/styled-components)
- [glamorous-native](https://github.com/robinpowered/glamorous-native)
- [fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native)

Know any other? Please open an [issue](https://github.com/brunolemos/react-native-css-in-js-benchmarks/issues) or, preferrably, a [pull request](https://github.com/brunolemos/react-native-css-in-js-benchmarks/pulls) :)


### Inspiration

The idea and some code pieces are heavily inspired by [A-gambit/CSS-IN-JS-Benchmarks](https://github.com/A-gambit/CSS-IN-JS-Benchmarks), which benchmarks were made for React Web.


### Author

Bruno Lemos ([@brunolemos](https://twitter.com/brunolemos) on twitter)
