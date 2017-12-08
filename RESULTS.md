# CSS in JS Benchmarks
## for React Native


### Results

#### Sorted by rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 279 | 85
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [simple](src/components/benchmarks/fela/simple/index.js) | 299 | 100
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [inline-only](src/components/benchmarks/react-native/inline-only/index.js) | 323 | 102
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [inline](src/components/benchmarks/fela/inline/index.js) | 382 | 110
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 364 | 127
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 394 | 140
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 399 | 151
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 424 | 181
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 491 | 200
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 483 | 232
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [primitives](src/components/benchmarks/fela/primitives/index.js) | 776 | 347
