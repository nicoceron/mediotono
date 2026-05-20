import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { MAIN_COURSES, MORE_COURSES, courseHref, type Course } from "@/lib/courses";
import { TEACHERS } from "@/lib/teachers";

const COURSE_TEACHER_COUNTS = new Map<string, number>();

for (const teacher of TEACHERS) {
  for (const skillId of teacher.skillIds) {
    COURSE_TEACHER_COUNTS.set(skillId, (COURSE_TEACHER_COUNTS.get(skillId) ?? 0) + 1);
  }
}

function courseCountLabel(course: Course) {
  const count = COURSE_TEACHER_COUNTS.get(course.id) ?? 0;

  if (count === 0) return "Próximamente";
  return `${count} ${count === 1 ? "profe disponible" : "profes disponibles"}`;
}

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

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      className="course-card"
      href={courseHref(course)}
      aria-label={`Ver profes de ${course.label}`}
    >
      <span className="course-icon" aria-hidden="true">
        <Image src={course.icon} alt="" width={64} height={64} />
      </span>
      <div className="course-copy">
        <span className="course-name">{course.label}</span>
        <span className="course-count">{courseCountLabel(course)}</span>
      </div>
      <ChevronRight className="course-arrow" size={24} strokeWidth={2.4} aria-hidden="true" />
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
            <Plus className="courses-more-icon courses-more-icon-plus" size={24} strokeWidth={2.5} aria-hidden="true" />
            <Minus className="courses-more-icon courses-more-icon-minus" size={24} strokeWidth={2.5} aria-hidden="true" />
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
