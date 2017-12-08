# CSS in JS Benchmarks
## for React Native


### Results

#### Sorted by rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [inline-only](src/components/benchmarks/react-native/inline-only/index.js) | 268 | 84
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 258 | 85
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [simple](src/components/benchmarks/fela/simple/index.js) | 305 | 102
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [inline](src/components/benchmarks/fela/inline/index.js) | 320 | 113
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 485 | 138
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 450 | 138
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 378 | 150
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 386 | 150
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [primitives](src/components/benchmarks/fela/primitives/index.js) | 404 | 196
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 532 | 202
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 467 | 210
