import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "./tokens";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  password = false,
  error,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textDisabled}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  label: {
    color: Colors.textBody,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.lineHeight,
    fontFamily: Typography.fontBody,
  },
  input: {
    height: 56,
    backgroundColor: Colors.bgSecondarySolid,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.lg,
    color: Colors.textBody,
    fontSize: Typography.body.fontSize,
    fontFamily: Typography.fontBody,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  inputFocused: {
    borderColor: Colors.accentPrimarySolid,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.micro.fontSize,
    lineHeight: Typography.micro.lineHeight,
    fontFamily: Typography.fontBody,
  },
});
