import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/Themed';
import { sampleCourses } from '@/lib/placeholder-data';
import { colors, radii, spacing } from '@/theme/tokens';

export default function CoursesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + spacing.lg,
          paddingBottom: insets.bottom + 88,
        },
      ]}>
      <Text style={styles.title}>课程</Text>
      {sampleCourses.map((course) => (
        <Link
          key={course.id}
          href={{ pathname: '/course/[id]', params: { id: course.id } }}
          asChild>
          <Pressable style={styles.card}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>
            <Text style={styles.meta}>
              {course.lessonCount} 节课 · {course.duration}
            </Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  courseTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  meta: {
    color: colors.primaryText,
    fontSize: 13,
    fontWeight: '700',
  },
});
