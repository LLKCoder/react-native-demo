import type { Course, Lesson } from '@/types/course';

export const sampleCourses: Course[] = [
  {
    id: 'rn-foundations',
    title: 'React Native 基础',
    description: '掌握组件、样式、导航和跨端开发的核心概念。',
    lessonCount: 12,
    duration: '3 小时 20 分钟',
  },
  {
    id: 'learning-ux',
    title: '移动学习体验设计',
    description: '围绕学习路径、进度反馈和课程消费体验搭建产品骨架。',
    lessonCount: 8,
    duration: '2 小时 10 分钟',
  },
];

export const sampleLessons: Lesson[] = [
  {
    id: 'rn-components',
    courseId: 'rn-foundations',
    title: '组件与页面结构',
    duration: '18 分钟',
  },
  {
    id: 'rn-navigation',
    courseId: 'rn-foundations',
    title: '路由与底部导航',
    duration: '22 分钟',
  },
];

export function getCourseById(id?: string) {
  return sampleCourses.find((course) => course.id === id) ?? sampleCourses[0];
}

export function getLessonById(id?: string) {
  return sampleLessons.find((lesson) => lesson.id === id) ?? sampleLessons[0];
}
