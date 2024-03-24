# react-native-confirm

confirm modal for react native

## Installation

```sh
npm install react-native-confirm
```

## Usage

```js
import * as React from 'react';

import { ConfirmProvider, useConfirm } from '@siteed/react-native-confirm';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  const doConfirm = useConfirm();

  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          const result = await doConfirm({ title: "Are you sure?" });
          console.log('result', result);
        }}
        title="Confirm"
      />
      <Text>App</Text>
    </View>
  );
};

const WithConfirm = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};
export default WithLogger
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
