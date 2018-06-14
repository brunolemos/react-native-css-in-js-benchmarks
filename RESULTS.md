# CSS in JS Benchmarks
## for React Native


### Results

#### Sorted by rerender time

Lib | Variation | Mount Time (ms) | Rerender time (ms)
:--- | :--- | :--- | :---
[react-native](https://github.com/facebook/react-native) (v0.55.4) | [inline-only](src/components/benchmarks/react-native/inline-only/index.js) | 177 | 25
[react-native](https://github.com/facebook/react-native) (v0.55.4) | [stylesheet](src/components/benchmarks/react-native/stylesheet/index.js) | 176 | 28
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.21) | [simple](src/components/benchmarks/fela/simple/index.js) | 180 | 32
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.4.0) | [props](src/components/benchmarks/glamorous/props/index.js) | 205 | 36
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.4.0) | [inline](src/components/benchmarks/glamorous/inline/index.js) | 218 | 38
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.21) | [inline](src/components/benchmarks/fela/inline/index.js) | 243 | 39
[glamorous-native](https://github.com/robinpowered/glamorous-native) (v1.4.0) | [simple](src/components/benchmarks/glamorous/simple/index.js) | 222 | 44
[styled-components](https://github.com/styled-components/styled-components) (v3.3.2) | [inline](src/components/benchmarks/styled-components/inline/index.js) | 224 | 47
[fela-native](https://github.com/rofrischmann/fela/tree/master/packages/fela-native) (v5.0.21) | [primitives](src/components/benchmarks/fela/primitives/index.js) | 246 | 57
[styled-components](https://github.com/styled-components/styled-components) (v3.3.2) | [simple](src/components/benchmarks/styled-components/simple/index.js) | 293 | 65
[styled-components](https://github.com/styled-components/styled-components) (v3.3.2) | [decoupled-cell](src/components/benchmarks/styled-components/decoupled-cell/index.js) | 284 | 79
