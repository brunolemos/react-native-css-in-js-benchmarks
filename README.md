# CSS in JS Benchmarks
## for React Native


### Results

See [RESULTS.md](RESULTS.md) for the benchmark results.


### Technique

- Big table with random data and dynamic background color opacity
- Multiple implementations for each lib with small variations, e.g. using inline styles or not
- Multiple rerenders are executed per test and the result is their average render time

<img alt="React Native running CSS in JS benchmarks on iOS simulator" src="https://user-images.githubusercontent.com/619186/33778451-cb70f6dc-dc2f-11e7-91b0-ebc78ea2644a.gif" height="600" />

### Libs

- [fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native)
- [glamorous-native](https://github.com/robinpowered/glamorous-native)
- [react-native](https://github.com/facebook/react-native)
- [styled-components](https://github.com/styled-components/styled-components)

Know any other? Please open an [issue](https://github.com/brunolemos/react-native-css-in-js-benchmarks/issues) or, preferrably, a [pull request](https://github.com/brunolemos/react-native-css-in-js-benchmarks/pulls) :)


### Inspiration

The idea and some code pieces are heavily inspired by [A-gambit/CSS-IN-JS-Benchmarks](https://github.com/A-gambit/CSS-IN-JS-Benchmarks), which benchmarks were made for React Web.

### How to run

- Run `git clone git@github.com:brunolemos/react-native-css-in-js-benchmarks.git`
- Run `yarn` or `npm install`

#### Manually
- Run `react-native run-ios`
- Use the app as usual

#### Automatically
- Run `brew tap wix/brew`
- Run `brew install applesimutils`
- Start the iPhone X Simulator
- Run `npm run test:e2e:build`
- Run `npm run test:e2e`

[Detox](https://github.com/wix/detox) will run all benchmarks and show the results at the end.

### Author

Bruno Lemos (follow [@brunolemos](https://twitter.com/brunolemos) on twitter)
