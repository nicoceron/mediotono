import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  AudioLines,
  Cable,
  ChevronRight,
  Drum,
  FileMusic,
  Guitar,
  MicVocal,
  Music2,
  Piano,
  Plus,
  Wind,
} from "lucide-react";
import { MAIN_COURSES, MORE_COURSES, courseHref, type Course } from "@/lib/courses";

function SectionHeader({ eyebrow, title, sub, titleColors }: { eyebrow?: string; title: string; sub?: string; titleColors?: string[] }) {
  const words = title.split(" ");
  return (
    <div className="sec-head">
      {eyebrow && <div className="sec-eyebrow">{eyebrow}</div>}
      <h2>
        {titleColors
          ? words.map((w, i) => <span key={i} style={{ color: titleColors[i] || "inherit", marginRight: 12, display: "inline-block" }}>{w}</span>)
          : title}
      </h2>
      {sub && <div className="sec-sub">{sub}</div>}
    </div>
  );
}

const COURSE_ICONS: Record<string, LucideIcon> = {
  cable: Cable,
  drum: Drum,
  "file-music": FileMusic,
  guitar: Guitar,
  mic: MicVocal,
  music: Music2,
  piano: Piano,
  strings: AudioLines,
  wind: Wind,
};

function CourseCard({ course }: { course: Course }) {
  const Icon = COURSE_ICONS[course.icon] ?? Music2;

  return (
    <Link
      className="course-card"
      href={courseHref(course)}
      aria-label={`Ver profes de ${course.label}`}
    >
      <span className="course-icon" aria-hidden="true">
        <Icon size={40} strokeWidth={2.2} />
      </span>
      <span className="course-copy">
        <span className="course-name">{course.label}</span>
      </span>
      <ChevronRight className="course-arrow" size={30} strokeWidth={2.4} aria-hidden="true" />
    </Link>
  );
}

export function CursosSection() {
  return (
    <section className="block courses-section" id="cursos" data-screen-label="Cursos">
      <div className="container">
        <div className="courses-head-strip">
          <SectionHeader title="No aprendas solo. Toca mejor acompañado." />
        </div>
        <div className="courses-grid">
          {MAIN_COURSES.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
        <details className="courses-more">
          <summary>
            <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
            Ver más cursos
          </summary>
          <div className="courses-grid courses-grid-extra">
            {MORE_COURSES.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
