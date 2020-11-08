import * as React from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import CodeInput from 'react-native-code-input';

export default function App() {
  const outsideRef = React.useRef<TextInput>(null);
  const [codigo1, setCodigo1] = React.useState('12');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <CodeInput
        length={5}
        value={codigo1}
        containerStyle={styles.inputContainer}
        onChangeText={setCodigo1}
      />

      <CodeInput
        length={5}
        ref={outsideRef}
        value={codigo1}
        containerStyle={styles.inputContainer}
        secureTextEntry
        onChangeText={setCodigo1}
        digitStyle={styles.passwordDigit}
      />

      <CodeInput
        length={5}
        containerStyle={styles.inputContainer}
        value={codigo1}
        digitStyle={styles.veryCustomized}
        selectionColor="transparent"
        caretColor="#666"
        caretBlinkRate={220}
        onChangeText={setCodigo1}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusButton: {
    marginTop: 30,
    padding: 20,
    borderRadius: 6,
    backgroundColor: '#f4abc4',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 18,
  },
  passwordDigit: {
    borderRadius: 6,
    borderWidth: 2,
  },
  veryCustomized: {
    width: 52,
    height: 52,
    marginHorizontal: 2,
    borderWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 26,
    backgroundColor: '#cecece',
  },
});
