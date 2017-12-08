# CSS in JS Benchmarks
## for React Native


### Results

#### Sorted by rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 330.00 | 108.90
[react-native](https://github.com/facebook/react-native) (v0.50.3) | [inline-only](src/components/benchmarks/react-native/inline-only/index.js) | 373.00 | 119.90
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [simple](src/components/benchmarks/fela/simple/index.js) | 383.00 | 131.30
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [inline](src/components/benchmarks/fela/inline/index.js) | 438.00 | 134.20
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 493.00 | 173.40
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 530.00 | 182.40
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.2.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 465.00 | 187.30
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 562.00 | 230.10
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.13) | [primitives](src/components/benchmarks/fela/primitives/index.js) | 561.00 | 245.50
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 669.00 | 270.40
[styled-components](https://github.com/styled-components/styled-components) (v2.2.3) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 678.00 | 309.90
