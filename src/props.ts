import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface CodeInputProps
  extends Pick<
    TextInputProps,
    | 'autoCapitalize'
    | 'autoFocus'
    | 'caretHidden'
    | 'editable'
    | 'keyboardType'
    | 'onBlur'
    | 'onChangeText'
    | 'onFocus'
    | 'onSubmitEditing'
    | 'placeholder'
    | 'selectionColor'
    | 'secureTextEntry'
    | 'returnKeyType'
    | 'value'
  > {
  /**
   * Custom style for the active digit input
   */
  activeDigitStyle?: StyleProp<ViewStyle>;

  /**
   * Custom color for the cursor
   */
  caretColor?: string;

  /**
   * Caret blink rate in milliseconds. Defaults to 500
   */
  caretBlinkRate?: number;

  /**
   * Custom style for the View container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for each digit input
   */
  digitStyle?: StyleProp<ViewStyle>;

  /**
   * Ignore character or RegExp
   */
  ignore?: string | RegExp;

  /**
   * The length of the code -> number of digits
   */
  length: number;

  /**
   * Callback called when fulfilled the code
   * @code the full code as string
   */
  onFullfill?(code: string): void;

  /**
   * Callback called when active digit index change
   * @activeIndex index of active digit
   */
  onIndexChange?(activeIndex: number): void;

  /**
   * Use default value in `ignore` to ignore not numeric inputs
   */
  onlyNumbers?: boolean;

  /**
   * Custom style for the placeholder
   */
  placeholderStyle?: StyleProp<TextStyle>;

  /**
   * Delay for secure text entry. Defaults to 240
   */
  secureTextDelay?: number;

  /**
   * Style for the text, use `digitSyle` to customize the digit input
   */
  style?: StyleProp<Omit<TextStyle, 'margin'>>;
}

export interface CaretProps extends ViewProps {
  /**
   * Caret blink rate in milliseconds. Defaults to 500
   */
  blinkRate?: number;
}
