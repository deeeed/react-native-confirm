import * as React from 'react';

import { ConfirmProvider, useConfirm } from '@siteed/react-native-confirm';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  const doConfirm = useConfirm();

  React.useEffect(() => {
    console.log(`App mounted`);
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          const result = await doConfirm({ title: 'Are you sure?' });
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

export default WithConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
