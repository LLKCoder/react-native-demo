import { StyleSheet } from 'react-native';

import { SafeScreen } from '@/components/SafeScreen';
import { Text, View } from '@/components/Themed';
import { colors, radii, spacing } from '@/theme/tokens';

export default function ProfileScreen() {
  return (
    <SafeScreen style={styles.container}>
      <Text style={styles.title}>我的</Text>
      <View style={styles.profileCard}>
        <Text style={styles.name}>学习者</Text>
        <Text style={styles.meta}>已学习 8 小时 · 完成 4 节课</Text>
      </View>
      <View style={styles.menuGroup}>
        <Text style={styles.menuItem}>收藏课程</Text>
        <Text style={styles.menuItem}>学习记录</Text>
        <Text style={styles.menuItem}>账户设置</Text>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  profileCard: {
    borderRadius: radii.md,
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
  },
  menuGroup: {
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  menuItem: {
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
