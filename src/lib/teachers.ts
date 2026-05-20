import teachersData from "@/data/teachers.json";
import { getRequiredCourseById, type Course } from "@/lib/courses";

export type Review = {
  id: string;
  author: string;
  instrument?: string;
  quote: string;
};

export type ClassFormat = "Virtual" | "A domicilio";
export type ClassLanguage = "Español" | "Inglés";

type TeacherRecord = {
  slug: string;
  name: string;
  shortName: string;
  skillIds: string[];
  color: string;
  bio: string;
  longBio: string;
  photo: string;
  photoPosition?: string;
  gallery: { src: string; alt: string }[];
  reviews: Review[];
  location: string;
  /** ISO country (default Colombia) */
  country?: string;
  countryFlag?: string;
  isFounder?: boolean;
  founderOrder?: number;
  /** Short trait pills shown on cards / detail page */
  highlights: string[];
  /** How classes are delivered */
  classFormats?: ClassFormat[];
  /** Languages available for classes */
  classLanguages?: ClassLanguage[];
};

export type Teacher = TeacherRecord & {
  skills: Course[];
  /** Derived from canonical skills. Use skillIds in data, never hand-write role labels. */
  role: string;
};

function hydrateTeacher(record: TeacherRecord): Teacher {
  const skills = record.skillIds.map(getRequiredCourseById);

  return {
    ...record,
    skills,
    role: skills.map((skill) => skill.label).join(" · "),
  };
}

export const TEACHERS: Teacher[] = (teachersData as TeacherRecord[]).map(hydrateTeacher);

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return TEACHERS.find((t) => t.slug === slug);
}

/** "Gisselle Torres" → "Gisselle T." */
export function shortDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const first = parts[0];
  const last = parts[parts.length - 1];
  return `${first} ${last[0].toUpperCase()}.`;
}

export type FeaturedQuote = Review & {
  teacherSlug: string;
  teacherName: string;
  teacherShortName: string;
  color: string;
};

export const FEATURED_QUOTES: FeaturedQuote[] = TEACHERS.flatMap((t) =>
  t.reviews.slice(0, 3).map((r) => ({
    ...r,
    teacherSlug: t.slug,
    teacherName: t.name,
    teacherShortName: t.shortName,
    color: t.color,
  })),
);
