import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  style,
  ...props
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height:84,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
});
