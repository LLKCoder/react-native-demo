import { colors } from '@/theme/tokens';

const tintColorLight = colors.primary;
const tintColorDark = colors.primary;

export default {
  light: {
    text: colors.text,
    background: colors.background,
    tint: tintColorLight,
    tabIconDefault: colors.tabInactive,
    tabIconSelected: tintColorLight,
    surface: colors.surface,
    surfaceWarm: colors.surfaceWarm,
    primaryText: colors.primaryText,
    muted: colors.muted,
    border: colors.border,
  },
  dark: {
    text: colors.darkText,
    background: colors.darkBackground,
    tint: tintColorDark,
    tabIconDefault: colors.darkMuted,
    tabIconSelected: tintColorDark,
    surface: colors.darkSurface,
    surfaceWarm: colors.darkSurfaceWarm,
    primaryText: colors.primary,
    muted: colors.darkMuted,
    border: colors.darkBorder,
  },
};
