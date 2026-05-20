import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      className="course-card"
      href={courseHref(course)}
      aria-label={`Ver profes de ${course.label}`}
    >
      <span className="course-icon" aria-hidden="true">
        <Image src={course.icon} alt="" width={72} height={72} />
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
            <Image
              className="courses-more-icon"
              src="/course-icons/10_ver_mas_cursos.svg"
              alt=""
              width={28}
              height={28}
            />
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
