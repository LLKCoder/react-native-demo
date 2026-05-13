import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View, type ViewProps } from '@/components/Themed';
import { spacing } from '@/theme/tokens';

type SafeScreenProps = ViewProps & {
  bottomInset?: number;
};

export function SafeScreen({ bottomInset = 88, style, ...props }: SafeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.lg,
          paddingBottom: insets.bottom + bottomInset,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
});
