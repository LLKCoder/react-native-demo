import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { SafeScreen } from '@/components/SafeScreen';
import { Text, View } from '@/components/Themed';
import { sampleCourses } from '@/lib/placeholder-data';
import { colors, radii, spacing } from '@/theme/tokens';

export default function HomeScreen() {
  const nextCourse = sampleCourses[0];

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>继续你的学习节奏</Text>
        <Text style={styles.subtitle}>今天先完成 React Native 基础课的下一节。</Text>
      </View>

      <Link
        href={{ pathname: '/course/[id]', params: { id: nextCourse.id } }}
        asChild>
        <Pressable style={styles.courseCard}>
          <Text style={styles.cardLabel}>推荐课程</Text>
          <Text style={styles.cardTitle}>{nextCourse.title}</Text>
          <Text style={styles.cardMeta}>
            {nextCourse.lessonCount} 节课 · {nextCourse.duration}
          </Text>
        </Pressable>
      </Link>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  hero: {
    gap: spacing.sm,
    backgroundColor: 'transparent',
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryText,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
  courseCard: {
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
    fontSize: 22,
    fontWeight: '800',
  },
  cardMeta: {
    color: colors.muted,
    fontSize: 14,
  },
});
