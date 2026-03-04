/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#85A889'; // Sage Green
const tintColorDark = '#85A889'; // Same tint for dark mode, or use light green #E8EFE9

export const Colors = {
  light: {
    text: '#2D3748',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    tint: tintColorLight,
    icon: '#718096',
    border: '#E2E8F0',
    accent: '#D4AF37', // Gold
    tabIconDefault: '#CBD5E0',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F7FAFC',
    background: '#121212',
    surface: '#1E1E1E',
    tint: tintColorDark,
    icon: '#A0AEC0',
    border: '#2D3748',
    accent: '#D4AF37', // Gold
    tabIconDefault: '#4A5568',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
