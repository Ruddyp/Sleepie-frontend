import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "./tokens";
import { Ionicons } from "@expo/vector-icons";


export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = "default",
  autoCapitalize = "sentences",
  maxLength,
}) {
  const [focused, setFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const isPassword = secureTextEntry !== false;



  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <TextInput
          style={[styles.input, focused && styles.inputFocused, error && styles.inputError]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Ionicons
              name={!hidePassword ? "eye-off" : "eye"}
              size={22}
              color={Colors.textBody}
            />
          </TouchableOpacity>
        )}
      </View>
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
    backgroundColor: Colors.bgTertiarySolid,
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
  icon: {
    position: "absolute",
    top: "30%",
    left: "85%"
  }
});
