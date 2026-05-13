export type Course = {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  duration: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  duration: string;
};
