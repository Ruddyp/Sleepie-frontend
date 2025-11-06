export const Colors = {
  // Backgrounds
  bgPrimary: ["#0B1A33", "#0F2045"], // gradient
  bgPrimarySolid: "#0B1A33",
  bgSecondary: ["#13264F", "#18305A"], // gradient
  bgSecondarySolid: "#13264F",
  bgTertiary: ["#1C325F", "#234074"], // gradient
  bgTertiarySolid: "#1C325F",
  bgSleepieBlue1: "#1064DB",
  bgSleepieBlue2: "#00A0F7",

  // Text
  textTitle: "#F5FAFF",
  textBody: "#D6E2F3",
  textSecondary: "#A8B4D1",
  textDisabled: "#3A4B72",
  textSleepieYellow: "#FFD66B",
  // Accent
  accentPrimary: ["#4A8BFF", "#1EC8FF"], // gradient
  accentPrimarySolid: "#4A8BFF",
  accentSecondarySolid: "#1EC8FF",
  accentGlow: "rgba(255, 255, 255, 0.05)",
  audioWave: "rgba(0, 160, 247, 0.3)",

  // States
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#0EA5E9",
  white: "#FFFFFF",

  // Utilities
  transparent: "transparent",
  borderSubtle: "rgba(255, 255, 255, 0.05)",
};

export const Typography = {
  // Font Families
  fontHeading: "Plus Jakarta Sans",
  fontBody: "Inter",

  // Sizes & Line Heights
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
  },
  h2: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "700",
  },
  h3: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600",
  },
  h4: {
    fontSize: 19,
    lineHeight: 28,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  micro: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  ultramicro: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "400",
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
  maximale: 60,
};

export const BorderRadius = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 40,
  round: 9999,
};

export const Shadows = {
  soft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 8,
  },
  bold: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 15,
  },
  focus: {
    shadowColor: "#4E8AFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const Sizes = {
  buttonSmall: 48,
  buttonDefault: 56,
  buttonLarge: 64,
  inputHeight: 56,
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
};
