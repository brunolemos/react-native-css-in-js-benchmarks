# CSS in JS Benchmarks
## for React Native


### Results

#### Sorted by rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[react-native](https://github.com/facebook/react-native) (v0.55.4) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 180 | 27
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.21) | [simple](src/components/benchmarks/fela/simple/index.js) | 204 | 33
[react-native](https://github.com/facebook/react-native) (v0.55.4) | [inline-only](src/components/benchmarks/react-native/inline-only/index.js) | 211 | 34
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.4.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 232 | 36
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.21) | [inline](src/components/benchmarks/fela/inline/index.js) | 203 | 40
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.4.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 209 | 46
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.4.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 226 | 49
[styled-components](https://github.com/styled-components/styled-components) (v3.3.2) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 229 | 52
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.21) | [primitives](src/components/benchmarks/fela/primitives/index.js) | 272 | 64
[styled-components](https://github.com/styled-components/styled-components) (v3.3.2) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 320 | 89
[styled-components](https://github.com/styled-components/styled-components) (v3.3.2) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 330 | 115
