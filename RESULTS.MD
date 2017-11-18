# CSS in JS Benchmarks
## for React Native


### Results

#### Sorted by rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 136.00 | 68.10
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [inline](src/components/benchmarks/fela/inline/index.js) | 181.00 | 83.30
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [simple](src/components/benchmarks/fela/simple/index.js) | 202.00 | 87.14
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 251.00 | 111.90
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 279.00 | 121.62
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 296.00 | 128.52
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 328.00 | 140.24
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 351.00 | 154.04
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 369.00 | 178.84


#### Sorted by lib name and rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [inline](src/components/benchmarks/fela/inline/index.js) | 181.00 | 83.30
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [simple](src/components/benchmarks/fela/simple/index.js) | 202.00 | 87.14
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 251.00 | 111.90
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 279.00 | 121.62
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 296.00 | 128.52
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 136.00 | 68.10
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 328.00 | 140.24
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 351.00 | 154.04
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 369.00 | 178.84
