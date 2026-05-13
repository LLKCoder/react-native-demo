import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { SafeScreen } from '@/components/SafeScreen';
import { Text, View } from '@/components/Themed';
import { sampleLessons } from '@/lib/placeholder-data';
import { colors, radii, spacing } from '@/theme/tokens';

export default function StudyScreen() {
  const nextLesson = sampleLessons[0];

  return (
    <SafeScreen style={styles.container}>
      <Text style={styles.title}>学习</Text>
      <View style={styles.progressCard}>
        <Text style={styles.progressValue}>32%</Text>
        <Text style={styles.progressText}>本周学习进度</Text>
      </View>

      <Link
        href={{ pathname: '/lesson/[id]', params: { id: nextLesson.id } }}
        asChild>
        <Pressable style={styles.lessonCard}>
          <Text style={styles.cardLabel}>下一节</Text>
          <Text style={styles.cardTitle}>{nextLesson.title}</Text>
          <Text style={styles.cardMeta}>{nextLesson.duration}</Text>
        </Pressable>
      </Link>
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
  progressCard: {
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  progressValue: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
  },
  progressText: {
    color: colors.muted,
    fontSize: 15,
  },
  lessonCard: {
    borderRadius: radii.md,
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardLabel: {
    color: colors.primaryText,
    fontSize: 13,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  cardMeta: {
    color: colors.muted,
    fontSize: 14,
  },
});
