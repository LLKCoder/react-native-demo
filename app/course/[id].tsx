import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { getCourseById, sampleLessons } from '@/lib/placeholder-data';
import { colors, radii, spacing } from '@/theme/tokens';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = getCourseById(id);
  const firstLesson = sampleLessons[0];

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>课程详情</Text>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          {course.lessonCount} 节课 · {course.duration}
        </Text>
      </View>

      <Link
        href={{ pathname: '/lesson/[id]', params: { id: firstLesson.id } }}
        asChild>
        <Pressable style={styles.primaryAction}>
          <Text style={styles.primaryText}>开始学习</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  kicker: {
    color: colors.primaryText,
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    borderRadius: radii.md,
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
  },
  infoText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  primaryAction: {
    alignItems: 'center',
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
  },
  primaryText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
});
