import coursesData from "@/data/courses.json";

export type CoursePlacement = "main" | "more";

export type Course = {
  id: string;
  label: string;
  placement: CoursePlacement;
  icon: string;
  aliases: string[];
};

export const COURSES = coursesData as Course[];
export const MAIN_COURSES = COURSES.filter((course) => course.placement === "main");
export const MORE_COURSES = COURSES.filter((course) => course.placement === "more");

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const COURSE_BY_ID = new Map(COURSES.map((course) => [course.id, course]));
const COURSE_BY_NORMALIZED_LABEL = new Map(
  COURSES.map((course) => [normalizeSearchText(course.label), course]),
);

export function getCourseById(id: string) {
  return COURSE_BY_ID.get(id);
}

export function getRequiredCourseById(id: string) {
  const course = getCourseById(id);
  if (!course) {
    throw new Error(`Unknown course id: ${id}`);
  }
  return course;
}

export function findCourseByName(value: string) {
  return COURSE_BY_NORMALIZED_LABEL.get(normalizeSearchText(value));
}

export function findCoursesByQuery(value: string) {
  const query = normalizeSearchText(value);
  if (!query) return [];

  const matches = new Map<string, Course>();
  const addCourse = (course: Course) => matches.set(course.id, course);

  COURSES.forEach((course) => {
    if (normalizeSearchText(course.label).includes(query)) {
      addCourse(course);
    }
  });

  COURSES.forEach((course) => {
    if (course.aliases.some((alias) => normalizeSearchText(alias).includes(query))) {
      addCourse(course);
    }
  });

  return Array.from(matches.values());
}

export function courseHref(course: Pick<Course, "label">) {
  return `/profes?curso=${encodeURIComponent(course.label)}`;
}
