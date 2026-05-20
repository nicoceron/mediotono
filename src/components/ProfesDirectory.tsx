"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CircleX,
  GraduationCap,
  Languages,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Video,
} from "lucide-react";
import { whatsappHref } from "@/lib/contact";
import { COURSES, findCoursesByQuery, normalizeSearchText } from "@/lib/courses";
import type { Teacher } from "@/lib/teachers";
import { shortDisplayName } from "@/lib/teachers";

type FilterState = {
  courseQuery: string;
  keywordQuery: string;
  formatFilter: string;
  languageFilter: string;
  locationFilter: string;
  sortMode: string;
};

const SORT_OPTIONS = [
  { value: "recommended", label: "Recomendados" },
  { value: "reviews", label: "Más reseñas" },
  { value: "name", label: "Nombre A-Z" },
];
const DEFAULT_SORT_MODE = "recommended";

function normalizeSortMode(value: string | null) {
  return SORT_OPTIONS.some((option) => option.value === value) ? value ?? DEFAULT_SORT_MODE : DEFAULT_SORT_MODE;
}

type FilterMenuOption = {
  value: string;
  label: string;
};

function getFirstSuggestedCourseValue(value: string, suggestions: FilterMenuOption[]) {
  return normalizeSearchText(value) ? suggestions[0]?.value ?? "" : "";
}

function FilterMenu({
  label,
  value,
  fallbackLabel,
  options,
  ariaLabel,
  onSelect,
}: {
  label: string;
  value: string;
  fallbackLabel: string;
  options: FilterMenuOption[];
  ariaLabel: string;
  onSelect: (value: string) => void;
}) {
  const activeLabel = options.find((option) => option.value === value)?.label ?? fallbackLabel;

  return (
    <details className="profes-filter-card profes-menu-field">
      <summary className="profes-menu-summary" aria-label={ariaLabel}>
        <span>
          <span className="profes-filter-label">{label}</span>
          <span className="profes-menu-value">{activeLabel}</span>
        </span>
        <ChevronDown
          className="profes-menu-chevron"
          size={20}
          strokeWidth={2.4}
          aria-hidden="true"
        />
      </summary>
      <div
        className="profes-menu-options"
        role="listbox"
        aria-label={ariaLabel}
        data-lenis-prevent="true"
      >
        {options.map((option) => (
          <button
            type="button"
            className={option.value === value ? "profes-menu-option is-selected" : "profes-menu-option"}
            key={option.value || option.label}
            role="option"
            aria-selected={option.value === value}
            onClick={(event) => {
              onSelect(option.value);
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  );
}

function CourseAutocomplete({
  value,
  suggestions,
  onChange,
  onSelect,
  onClear,
}: {
  value: string;
  suggestions: FilterMenuOption[];
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  onClear: () => void;
}) {
  const firstSuggestedValue = getFirstSuggestedCourseValue(value, suggestions);

  return (
    <div className="profes-filter-card profes-course-field">
      <label className="profes-filter-label" htmlFor="profes-course-input">
        Quiero aprender
      </label>
      <span className="profes-course-control">
        <input
          id="profes-course-input"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (firstSuggestedValue) {
                onSelect(firstSuggestedValue);
              }
              event.currentTarget.blur();
            }

            if (event.key === "Escape") {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
          placeholder="Piano, canto, guitarra..."
          aria-label="Filtrar profes por curso"
          aria-controls="profes-course-options"
          aria-haspopup="listbox"
          autoComplete="off"
        />
        {value ? (
          <button
            type="button"
            className="profes-filter-clear"
            onClick={onClear}
            aria-label="Limpiar curso"
          >
            <CircleX size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : (
          <ChevronDown
            className="profes-course-chevron"
            size={20}
            strokeWidth={2.4}
            aria-hidden="true"
          />
        )}
      </span>
      <div
        className="profes-course-options"
        id="profes-course-options"
        role="listbox"
        aria-label="Cursos disponibles"
        data-lenis-prevent="true"
      >
        <button
          type="button"
          className={!value ? "profes-course-option is-selected" : "profes-course-option"}
          role="option"
          aria-selected={!value}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            onSelect("");
            event.currentTarget.closest(".profes-course-field")?.querySelector("input")?.blur();
          }}
        >
          Todos los cursos
        </button>
        {suggestions.map((course) => (
          <button
            type="button"
            className={
              firstSuggestedValue === course.value
                ? "profes-course-option is-selected"
                : "profes-course-option"
            }
            key={course.value}
            role="option"
            aria-selected={firstSuggestedValue === course.value}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              onSelect(course.value);
              event.currentTarget.closest(".profes-course-field")?.querySelector("input")?.blur();
            }}
          >
            {course.label}
          </button>
        ))}
        {suggestions.length === 0 && value && (
          <span className="profes-course-empty">No hay cursos con ese nombre</span>
        )}
      </div>
    </div>
  );
}

function teacherSearchText(teacher: Teacher) {
  return normalizeSearchText(
    [
      teacher.name,
      teacher.shortName,
      teacher.role,
      teacher.skills.flatMap((skill) => [skill.label, ...skill.aliases]).join(" "),
      teacher.bio,
      teacher.longBio,
      teacher.highlights.join(" "),
      teacher.location,
      (teacher.classFormats ?? []).join(" "),
      (teacher.classLanguages ?? []).join(" "),
    ].join(" "),
  );
}

function matchesCourse(teacher: Teacher, rawQuery: string) {
  const query = normalizeSearchText(rawQuery);
  if (!query) return true;

  const matchedCourses = findCoursesByQuery(query);
  return matchedCourses.some((course) => teacher.skillIds.includes(course.id));
}

function matchesTeacher(teacher: Teacher, filters: FilterState) {
  const keyword = normalizeSearchText(filters.keywordQuery);
  const matchesKeyword = !keyword || teacherSearchText(teacher).includes(keyword);
  const matchesFormat =
    !filters.formatFilter || (teacher.classFormats ?? []).some((format) => format === filters.formatFilter);
  const matchesLanguage =
    !filters.languageFilter ||
    (teacher.classLanguages ?? []).some((language) => language === filters.languageFilter);
  const matchesLocation =
    !filters.locationFilter || teacher.location === filters.locationFilter;

  return (
    matchesCourse(teacher, filters.courseQuery) &&
    matchesKeyword &&
    matchesFormat &&
    matchesLanguage &&
    matchesLocation
  );
}

function sortTeachers(teachers: Teacher[], sortMode: string) {
  const sorted = [...teachers];

  if (sortMode === "name") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  if (sortMode === "reviews") {
    return sorted.sort((a, b) => b.reviews.length - a.reviews.length);
  }

  return sorted;
}

export function ProfesDirectory({ teachers }: { teachers: Teacher[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseQuery = searchParams.get("curso") ?? "";
  const keywordQuery = searchParams.get("q") ?? "";
  const formatFilter = searchParams.get("formato") ?? "";
  const languageFilter = searchParams.get("idioma") ?? "";
  const locationFilter = searchParams.get("ubicacion") ?? "";
  const sortMode = normalizeSortMode(searchParams.get("orden"));

  const formatOptions = useMemo(
    () =>
      Array.from(new Set(teachers.flatMap((teacher) => teacher.classFormats ?? []))).sort((a, b) =>
        a.localeCompare(b, "es"),
      ),
    [teachers],
  );
  const languageOptions = useMemo(
    () =>
      Array.from(new Set(teachers.flatMap((teacher) => teacher.classLanguages ?? []))).sort(
        (a, b) => a.localeCompare(b, "es"),
      ),
    [teachers],
  );
  const locationOptions = useMemo(
    () =>
      Array.from(new Set(teachers.map((teacher) => teacher.location).filter(Boolean))).sort(
        (a, b) => a.localeCompare(b, "es"),
      ),
    [teachers],
  );
  const courseSuggestions = useMemo(
    () =>
      (courseQuery ? findCoursesByQuery(courseQuery) : COURSES).map((course) => ({
        value: course.label,
        label: course.label,
      })),
    [courseQuery],
  );
  const formatMenuOptions = useMemo(
    () => [
      { value: "", label: "Cualquier formato" },
      ...formatOptions.map((format) => ({ value: format, label: format })),
    ],
    [formatOptions],
  );
  const locationMenuOptions = useMemo(
    () => [
      { value: "", label: "Cualquier ubicación" },
      ...locationOptions.map((location) => ({ value: location, label: location })),
    ],
    [locationOptions],
  );
  const languageMenuOptions = useMemo(
    () => [
      { value: "", label: "Cualquier idioma" },
      ...languageOptions.map((language) => ({ value: language, label: language })),
    ],
    [languageOptions],
  );

  const filters = useMemo(
    () => ({
      courseQuery,
      keywordQuery,
      formatFilter,
      languageFilter,
      locationFilter,
      sortMode,
    }),
    [courseQuery, keywordQuery, formatFilter, languageFilter, locationFilter, sortMode],
  );

  const filteredTeachers = useMemo(
    () => sortTeachers(teachers.filter((teacher) => matchesTeacher(teacher, filters)), sortMode),
    [teachers, filters, sortMode],
  );
  const requestedCourse = courseQuery.trim() || "la clase que estás buscando";
  const emptyContactHref = whatsappHref(
    `¡Hola! Estoy buscando profe para ${requestedCourse}. ¿Me pueden ayudar?`,
  );
  const hasActiveFilters =
    Boolean(courseQuery.trim()) ||
    Boolean(keywordQuery.trim()) ||
    Boolean(formatFilter) ||
    Boolean(languageFilter) ||
    Boolean(locationFilter) ||
    sortMode !== "recommended";
  const mobileFilterCount = [formatFilter, locationFilter, languageFilter].filter(Boolean).length;

  const updateFilters = (updates: Partial<FilterState>) => {
    const currentParams = new URLSearchParams(
      typeof window === "undefined" ? searchParams.toString() : window.location.search,
    );
    const next = {
      courseQuery: currentParams.get("curso") ?? courseQuery,
      keywordQuery: currentParams.get("q") ?? keywordQuery,
      formatFilter: currentParams.get("formato") ?? formatFilter,
      languageFilter: currentParams.get("idioma") ?? languageFilter,
      locationFilter: currentParams.get("ubicacion") ?? locationFilter,
      sortMode: normalizeSortMode(currentParams.get("orden") ?? sortMode),
      ...updates,
    };

    const params = new URLSearchParams();
    const nextParams = {
      curso: next.courseQuery,
      q: next.keywordQuery,
      formato: next.formatFilter,
      idioma: next.languageFilter,
      ubicacion: next.locationFilter,
      orden: next.sortMode === DEFAULT_SORT_MODE ? "" : normalizeSortMode(next.sortMode),
    };

    for (const [key, value] of Object.entries(nextParams)) {
      if (value.trim()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    window.history.replaceState(null, "", nextUrl);
  };

  const clearFilters = () => {
    updateFilters({
      courseQuery: "",
      keywordQuery: "",
      formatFilter: "",
      languageFilter: "",
      locationFilter: "",
      sortMode: "recommended",
    });
  };

  return (
    <div className="profes-directory">
      <form className="profes-search-panel" role="search" onSubmit={(event) => event.preventDefault()}>
        <div className="profes-filter-row profes-filter-row-main">
          <CourseAutocomplete
            value={courseQuery}
            suggestions={courseSuggestions}
            onChange={(value) => updateFilters({ courseQuery: value })}
            onSelect={(value) => updateFilters({ courseQuery: value })}
            onClear={() => updateFilters({ courseQuery: "" })}
          />

          <div className="profes-desktop-filter">
            <FilterMenu
              label="Formato"
              value={formatFilter}
              fallbackLabel="Cualquier formato"
              options={formatMenuOptions}
              ariaLabel="Filtrar por formato de clase"
              onSelect={(value) => updateFilters({ formatFilter: value })}
            />
          </div>

          <div className="profes-desktop-filter">
            <FilterMenu
              label="Ubicación"
              value={locationFilter}
              fallbackLabel="Cualquier ubicación"
              options={locationMenuOptions}
              ariaLabel="Filtrar por ubicación"
              onSelect={(value) => updateFilters({ locationFilter: value })}
            />
          </div>

          <div className="profes-desktop-filter">
            <FilterMenu
              label="Idioma"
              value={languageFilter}
              fallbackLabel="Cualquier idioma"
              options={languageMenuOptions}
              ariaLabel="Filtrar por idioma de clase"
              onSelect={(value) => updateFilters({ languageFilter: value })}
            />
          </div>
        </div>

        <details className="profes-mobile-filters">
          <summary className="profes-mobile-filter-summary">
            <span>
              <SlidersHorizontal size={18} strokeWidth={2.4} aria-hidden="true" />
              Filtros
              {mobileFilterCount > 0 && (
                <span className="profes-mobile-filter-count">{mobileFilterCount}</span>
              )}
            </span>
            <ChevronDown
              className="profes-mobile-filter-chevron"
              size={20}
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </summary>
          <div className="profes-mobile-filter-panel">
            <FilterMenu
              label="Formato"
              value={formatFilter}
              fallbackLabel="Cualquier formato"
              options={formatMenuOptions}
              ariaLabel="Filtrar por formato de clase"
              onSelect={(value) => updateFilters({ formatFilter: value })}
            />

            <FilterMenu
              label="Ubicación"
              value={locationFilter}
              fallbackLabel="Cualquier ubicación"
              options={locationMenuOptions}
              ariaLabel="Filtrar por ubicación"
              onSelect={(value) => updateFilters({ locationFilter: value })}
            />

            <FilterMenu
              label="Idioma"
              value={languageFilter}
              fallbackLabel="Cualquier idioma"
              options={languageMenuOptions}
              ariaLabel="Filtrar por idioma de clase"
              onSelect={(value) => updateFilters({ languageFilter: value })}
            />
          </div>
        </details>

        <div
          className={
            hasActiveFilters
              ? "profes-filter-row profes-filter-row-secondary has-clear"
              : "profes-filter-row profes-filter-row-secondary"
          }
        >
          <label className="profes-keyword-field">
            <Search size={18} strokeWidth={2.4} aria-hidden="true" />
            <input
              type="search"
              value={keywordQuery}
              onChange={(event) => updateFilters({ keywordQuery: event.target.value })}
              placeholder="Nombre o palabra clave"
              aria-label="Buscar por nombre o palabra clave"
            />
            {keywordQuery && (
              <button
                type="button"
                className="profes-filter-clear"
                onClick={() => updateFilters({ keywordQuery: "" })}
                aria-label="Limpiar búsqueda"
              >
                <CircleX size={18} strokeWidth={2.4} aria-hidden="true" />
              </button>
            )}
          </label>

          <FilterMenu
            label="Orden"
            value={sortMode}
            fallbackLabel="Recomendados"
            options={SORT_OPTIONS}
            ariaLabel="Ordenar profes"
            onSelect={(value) => updateFilters({ sortMode: value })}
          />
          {hasActiveFilters && (
            <button type="button" className="profes-clear-filters" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

      </form>

      {filteredTeachers.length > 0 ? (
        <ul className="profe-list">
          {filteredTeachers.map((teacher) => {
            const instruments = teacher.skills.map((skill) => skill.label);
            const classFormats = teacher.classFormats ?? [];
            const classLanguages = teacher.classLanguages ?? [];
            const hasReviews = teacher.reviews.length > 0;

            return (
              <li key={teacher.slug} className="profe-card-wrap">
                <article
                  className="profe-card"
                  style={{ ["--profe-color" as string]: teacher.color }}
                >
                  <Link
                    href={`/profes/${teacher.slug}`}
                    className="profe-card-photo"
                    style={{ borderColor: teacher.color }}
                    aria-label={`Ver perfil de ${teacher.name}`}
                  >
                    <div
                      className="profe-card-photo-bg"
                      style={{ background: teacher.color }}
                    />
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      fill
                      sizes="168px"
                      style={
                        teacher.photoPosition
                          ? { objectPosition: teacher.photoPosition }
                          : undefined
                      }
                    />
                  </Link>

                  <div className="profe-card-body">
                    <div className="profe-card-head">
                      <Link
                        href={`/profes/${teacher.slug}`}
                        className="profe-card-name"
                      >
                        {shortDisplayName(teacher.name)}
                      </Link>
                      <span className="profe-card-badge">
                        <BadgeCheck size={15} strokeWidth={2.4} aria-hidden="true" />
                        Verificado
                      </span>
                      {teacher.countryFlag && (
                        <span
                          className="profe-card-flag"
                          aria-label={teacher.country}
                          title={teacher.country}
                        >
                          {teacher.countryFlag}
                        </span>
                      )}
                    </div>

                    <ul className="profe-card-meta">
                      <li>
                        <GraduationCap size={15} strokeWidth={2.4} />
                        <span>{instruments.join(" · ")}</span>
                      </li>
                      <li>
                        <MapPin size={15} strokeWidth={2.4} />
                        <span>{teacher.location}</span>
                      </li>
                      <li>
                        <Video size={15} strokeWidth={2.4} />
                        <span>{classFormats.join(" · ")}</span>
                      </li>
                      <li>
                        <Languages size={15} strokeWidth={2.4} />
                        <span>{classLanguages.join(" · ")}</span>
                      </li>
                    </ul>

                    <p className="profe-card-bio">{teacher.longBio}</p>

                    <div className="profe-card-tags" aria-label="Resumen del profe">
                      {instruments.slice(0, 3).map((instrument) => (
                        <span key={instrument}>{instrument}</span>
                      ))}
                      {classLanguages.includes("Inglés") && <span>Bilingüe</span>}
                    </div>
                  </div>

                  <aside className="profe-card-side">
                    <div className="profe-card-stats">
                      <div className="profe-card-stat">
                        <strong>
                          {hasReviews ? (
                            <>
                              <Star
                                size={17}
                                fill="currentColor"
                                strokeWidth={0}
                                style={{ color: teacher.color }}
                                aria-hidden="true"
                              />
                              5.0
                            </>
                          ) : (
                            <>
                              <Sparkles
                                size={17}
                                strokeWidth={2.4}
                                style={{ color: teacher.color }}
                                aria-hidden="true"
                              />
                              Nuevo
                            </>
                          )}
                        </strong>
                        <span>
                          {hasReviews
                            ? `${teacher.reviews.length} ${
                                teacher.reviews.length === 1 ? "reseña" : "reseñas"
                              }`
                            : "perfil de profe"}
                        </span>
                      </div>
                      <div className="profe-card-stat">
                        <strong>{classFormats.length}</strong>
                        <span>formatos</span>
                      </div>
                    </div>

                    <Link
                      href={`/profes/${teacher.slug}`}
                      className="profe-card-cta"
                      style={{ background: teacher.color }}
                    >
                      Ver perfil
                      <ArrowRight size={18} strokeWidth={2.4} />
                    </Link>

                    <Link href={`/profes/${teacher.slug}`} className="profe-card-secondary">
                      Más información
                    </Link>
                  </aside>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="profes-empty">
          <strong>Contáctanos para encontrar un profesor</strong>
          <p>
            Aún no tenemos un profe disponible para {requestedCourse}. Cuéntanos qué necesitas y
            buscamos un profesor que pueda ayudarte.
          </p>
          <a href={emptyContactHref} target="_blank" rel="noopener">
            Contactarnos
            <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
