import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import styles from './styles';
import type { CodeInputProps, CaretProps } from './props';

const CodeInput = forwardRef<TextInput, CodeInputProps>((props, ref) => {
  const {
    autoCapitalize,
    autoFocus,
    activeDigitStyle,
    caretColor,
    caretBlinkRate,
    caretHidden,
    containerStyle,
    digitStyle,
    editable = true,
    keyboardType,
    length,
    onBlur,
    onChangeText,
    onFocus,
    onFullfill,
    onIndexChange,
    onlyNumbers,
    ignore = onlyNumbers ? /\D+/g : undefined,
    onSubmitEditing,
    placeholder,
    placeholderStyle,
    selectionColor,
    secureTextEntry,
    secureTextDelay,
    style,
    returnKeyType,
    value,
  } = props;

  const getInitialArrayValue = useCallback(() => {
    return [...Array(length).keys()].map((index) => {
      return value?.charAt(index) || '';
    });
  }, [value, length]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  const [arrayValue, setArrayValue] = useState(getInitialArrayValue());
  const [lastUpdatedIndex, setLastUpdatedIndex] = useState<number | null>(null);
  // const [updateIndex, setUpdateIndex] = useState(0);

  const innerInputRef = useRef<TextInput>(null);
  const timeout = useRef<NodeJS.Timeout>();

  const inputRef = useMemo(() => {
    return (ref || innerInputRef) as MutableRefObject<TextInput>;
  }, [ref, innerInputRef]);

  const joinedValue = useMemo(() => {
    return arrayValue.join('');
  }, [arrayValue]);

  const fontSize = useMemo(() => {
    return StyleSheet.flatten([styles.text, style]).fontSize;
  }, [style]);

  useEffect(() => {
    const newArrayValue = [...Array(length).keys()].map((index) => {
      return value?.charAt(index) || '';
    });
    if (newArrayValue.join('') !== joinedValue) {
      setArrayValue(newArrayValue);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [value, length]);

  useEffect(() => {
    onIndexChange && onIndexChange(activeIndex);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [activeIndex]);

  useEffect(() => {
    onChangeText && onChangeText(joinedValue);

    if (joinedValue.length === length && onFullfill) {
      onFullfill(joinedValue);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [joinedValue, length]);

  const focusNextDigit = useCallback(() => {
    const nextIndex = activeIndex + 1;
    if (length >= nextIndex + 1) {
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, length]);

  const handleChangeText = useCallback(
    (text: string) => {
      let textPressed = text.replace('•', '');
      if (ignore) {
        textPressed = textPressed.replace(ignore, '');
      }

      setLastUpdatedIndex(activeIndex);
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setLastUpdatedIndex(null);
      }, secureTextDelay || 240);

      setArrayValue((prevArrayValue) =>
        prevArrayValue.map((digit, index) => {
          return index === activeIndex ? textPressed : digit;
        })
      );

      if (textPressed) {
        const nextIndex = activeIndex + 1;
        if (length >= nextIndex + 1) {
          setActiveIndex(nextIndex);
        }
      } else {
        const nextIndex = activeIndex - 1;
        if (nextIndex >= 0 && nextIndex <= length - 1) {
          setActiveIndex(nextIndex);
        }
      }
    },
    [activeIndex, ignore, length, secureTextDelay]
  );

  const handleDigitPress = useCallback(
    (digitIndex: number) => {
      if (!editable) return;

      setActiveIndex(digitIndex);
      inputRef.current?.focus();
    },
    [inputRef]
  );

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        blurOnSubmit={activeIndex === length - 1}
        caretHidden
        keyboardType={keyboardType || 'numeric'}
        maxLength={2}
        onChangeText={handleChangeText}
        onBlur={(e) => {
          setInputFocused(false);
          onBlur && onBlur(e);
        }}
        onFocus={(e) => {
          setInputFocused(true);
          onFocus && onFocus(e);
        }}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={
          activeIndex === length - 1 ? onSubmitEditing : focusNextDigit
        }
        ref={inputRef}
        returnKeyType={returnKeyType || 'next'}
        selectionColor="transparent"
        style={styles.hiddenInput}
        value="•"
      />
      {arrayValue.map((digit, digitIndex) => {
        const active = digitIndex === activeIndex && inputFocused;
        const visible = !secureTextEntry || lastUpdatedIndex === digitIndex;
        return (
          <TouchableOpacity
            activeOpacity={editable ? 0.7 : 1}
            key={`${digitIndex}`}
            onPress={() => {
              handleDigitPress(digitIndex);
            }}
            style={[
              styles.digit,
              digitStyle,
              active ? [styles.digitActive, activeDigitStyle] : undefined,
            ]}
          >
            {!!active && !digit && !caretHidden && (
              <Carret
                style={[
                  styles.carret,
                  digit ? styles.carretLeft : undefined,
                  {
                    backgroundColor: caretColor || selectionColor || '#6495ed',
                    height: (fontSize || 20) + 10,
                  },
                ]}
                blinkRate={caretBlinkRate}
              />
            )}
            {!!active && !!digit && (
              <View
                style={[
                  styles.selection,
                  selectionColor
                    ? { backgroundColor: selectionColor }
                    : undefined,
                ]}
              />
            )}
            <Text
              style={[
                styles.text,
                style,
                !digit && !!placeholder
                  ? [styles.placeholder, placeholderStyle]
                  : undefined,
              ]}
            >
              {digit ? (visible ? digit : '•') : active ? '' : placeholder}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export const Carret = (props: CaretProps) => {
  const { style, blinkRate = 500 } = props;
  const [visible, setVisible] = useState(true);

  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, blinkRate);

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [blinkRate]);

  return <View style={[style, visible ? undefined : styles.hiddenOpacity]} />;
};

export default CodeInput;
