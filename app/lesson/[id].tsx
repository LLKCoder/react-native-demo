import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { getLessonById } from '@/lib/placeholder-data';
import { colors, radii, spacing } from '@/theme/tokens';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id);

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>课时学习</Text>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.meta}>{lesson.duration}</Text>
      <View style={styles.playerPlaceholder}>
        <Text style={styles.playerText}>课程内容区域</Text>
      </View>
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
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  meta: {
    color: colors.muted,
    fontSize: 15,
  },
  playerPlaceholder: {
    alignItems: 'center',
    aspectRatio: 16 / 9,
    backgroundColor: colors.text,
    borderRadius: radii.md,
    justifyContent: 'center',
  },
  playerText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
