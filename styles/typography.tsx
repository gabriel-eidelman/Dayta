// src/styles/typography.ts

import { StyleSheet, Dimensions, Platform } from "react-native";
import scheme from "@/utils/colorScheme"; // your color theme

// Get screen dimensions
const { width } = Dimensions.get("window");

// Set scale factors based on screen width
let scale = 1;
if (width < 360) scale = 0.85;         // Small phones
else if (width > 480) scale = 1.15;     // Tablets or big phones

// Define base font sizes
const baseFontSizes = {
  h1: 28,
  h2: 24,
  h3: 20,
  body: 16,
  small: 14,
  caption: 12,
};

// Create your text styles
const font_styles = StyleSheet.create({
  headerStyle: {
    fontSize: (width / 12) * scale,  // your original logic, improved
    fontFamily: 'Inter',
    color: scheme.strongDarkGray,
  },
  
  h1: {
    fontSize: baseFontSizes.h1 * scale,
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: scheme.strongDarkGray,
  },
  
  h2: {
    fontSize: baseFontSizes.h2 * scale,
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    color: scheme.strongDarkGray,
  },
  
  h3: {
    fontSize: baseFontSizes.h3 * scale,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: scheme.strongDarkGray,
  },

  body: {
    fontSize: baseFontSizes.body * scale,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: scheme.mutedDarkGray,
  },

  smallText: {
    fontSize: baseFontSizes.small * scale,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: scheme.mutedDarkGray,
  },

  caption: {
    fontSize: baseFontSizes.caption * scale,
    fontFamily: 'Inter',
    fontWeight: '300',
    color: scheme.mutedDarkGray,
  },
});

export default font_styles;
