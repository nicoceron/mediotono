"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  CircleX,
  GraduationCap,
  House,
  Languages,
  MapPin,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Video,
  X,
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
};

type FilterMenuOption = {
  value: string;
  label: string;
};

const CLASS_FORMAT_VALUES = new Set(["Virtual", "A domicilio"]);

function getFirstSuggestedCourseValue(value: string, suggestions: FilterMenuOption[]) {
  return normalizeSearchText(value) ? suggestions[0]?.value ?? "" : "";
}

function splitBioLead(text: string) {
  const trimmed = text.trim();
  const firstSentence = trimmed.match(/^(.+?[.!?])\s+(.+)$/u);

  if (!firstSentence) {
    return { lead: trimmed, rest: "" };
  }

  return { lead: firstSentence[1], rest: firstSentence[2] };
}

function classFormatIcon(format: string) {
  return format === "A domicilio" ? House : Video;
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
        {!value && (
          <button
            type="button"
            className="profes-course-option is-selected"
            role="option"
            aria-selected="true"
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              onSelect("");
              event.currentTarget.closest(".profes-course-field")?.querySelector("input")?.blur();
            }}
          >
            Todos los cursos
          </button>
        )}
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

export function ProfesDirectory({ teachers }: { teachers: Teacher[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseQuery = searchParams.get("curso") ?? "";
  const keywordQuery = searchParams.get("q") ?? "";
  const rawFormatFilter = searchParams.get("formato") ?? "";
  const formatFilter = CLASS_FORMAT_VALUES.has(rawFormatFilter) ? rawFormatFilter : "";
  const languageFilter = searchParams.get("idioma") ?? "";
  const locationFilter = searchParams.get("ubicacion") ?? "";

  useEffect(() => {
    if (!searchParams.has("orden") && (!rawFormatFilter || rawFormatFilter === formatFilter)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete("orden");
    if (rawFormatFilter && rawFormatFilter !== formatFilter) {
      params.delete("formato");
    }
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [formatFilter, pathname, rawFormatFilter, searchParams]);

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
    }),
    [courseQuery, keywordQuery, formatFilter, languageFilter, locationFilter],
  );

  const filteredTeachers = useMemo(
    () => teachers.filter((teacher) => matchesTeacher(teacher, filters)),
    [teachers, filters],
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
    Boolean(locationFilter);
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
      ...updates,
    };

    const params = new URLSearchParams();
    const nextParams = {
      curso: next.courseQuery,
      q: next.keywordQuery,
      formato: next.formatFilter,
      idioma: next.languageFilter,
      ubicacion: next.locationFilter,
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
    });
  };
  const clearMobileSheetFilters = () => {
    updateFilters({
      formatFilter: "",
      languageFilter: "",
      locationFilter: "",
    });
  };
  const closeMobileFilterSheet = (element: HTMLElement) => {
    element.closest(".profes-mobile-filters")?.removeAttribute("open");
  };

  return (
    <div className="profes-directory">
      <form className="profes-search-panel" role="search" onSubmit={(event) => event.preventDefault()}>
        <div
          className={
            mobileFilterCount > 0
              ? "profes-filter-row profes-filter-row-main has-mobile-filter-count"
              : "profes-filter-row profes-filter-row-main"
          }
        >
          <CourseAutocomplete
            value={courseQuery}
            suggestions={courseSuggestions}
            onChange={(value) => updateFilters({ courseQuery: value })}
            onSelect={(value) => updateFilters({ courseQuery: value })}
            onClear={() => updateFilters({ courseQuery: "" })}
          />

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
            <div className="profes-mobile-filter-panel" data-lenis-prevent="true">
              <div className="profes-mobile-filter-sheet-head">
                <button
                  type="button"
                  className="profes-mobile-filter-sheet-clear"
                  onClick={clearMobileSheetFilters}
                  disabled={mobileFilterCount === 0}
                >
                  Limpiar
                </button>
                <strong className="profes-mobile-filter-sheet-title">Filtros</strong>
                <button
                  type="button"
                  className="profes-mobile-filter-sheet-close"
                  onClick={(event) => closeMobileFilterSheet(event.currentTarget)}
                  aria-label="Cerrar filtros"
                >
                  <X size={28} strokeWidth={2.6} aria-hidden="true" />
                </button>
              </div>

              <div className="profes-mobile-filter-sheet-body" data-lenis-prevent="true">
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

              <div className="profes-mobile-filter-sheet-foot">
                <button
                  type="button"
                  className="profes-mobile-filter-sheet-submit"
                  onClick={(event) => closeMobileFilterSheet(event.currentTarget)}
                >
                  Ver {filteredTeachers.length} profes
                </button>
              </div>
            </div>
          </details>

          <details className="profes-mobile-keyword">
            <summary className="profes-mobile-keyword-summary" aria-label="Buscar por nombre o palabra clave">
              <Search size={20} strokeWidth={2.4} aria-hidden="true" />
            </summary>
            <div className="profes-mobile-keyword-panel">
              <label className="profes-keyword-field">
                <Search size={18} strokeWidth={2.4} aria-hidden="true" />
                <input
                  type="search"
                  value={keywordQuery}
                  onChange={(event) => updateFilters({ keywordQuery: event.target.value })}
                  placeholder="Buscar profe"
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
            </div>
          </details>

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
              placeholder="Buscar profe"
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
            const teacherContactHref = whatsappHref(
              `¡Hola! Quiero más información sobre las clases con ${teacher.name}.`,
            );
            const bio = splitBioLead(teacher.longBio);

            return (
              <li key={teacher.slug} className="profe-card-wrap">
                <article
                  className="profe-card"
                  style={{ ["--profe-color" as string]: teacher.color }}
                >
                  <Link
                    href={`/profes/${teacher.slug}`}
                    className="profe-card-click-target"
                    aria-label={`Ver perfil de ${teacher.name}`}
                  >
                    <span className="visually-hidden">Ver perfil de {teacher.name}</span>
                  </Link>

                  <div
                    className="profe-card-photo"
                    style={{ borderColor: teacher.color }}
                  >
                    <div
                      className="profe-card-photo-bg"
                      style={{ background: teacher.color }}
                    />
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 380px) 96px, (max-width: 560px) 118px, (max-width: 920px) 160px, 180px"
                      style={
                        teacher.photoPosition
                          ? { objectPosition: teacher.photoPosition }
                          : undefined
                      }
                    />
                  </div>

                  <div className="profe-card-body">
                    <div className="profe-card-head">
                      <span className="profe-card-name">
                        {shortDisplayName(teacher.name)}
                      </span>
                      <span
                        className="profe-card-badge"
                        aria-label="Profesor verificado"
                        title="Profesor verificado"
                      >
                        <BadgeCheck size={17} strokeWidth={2.4} aria-hidden="true" />
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
                      <li className="profe-card-meta-primary">
                        <GraduationCap size={15} strokeWidth={2.4} />
                        <ul className="profe-card-instrument-list" aria-label="Cursos que imparte">
                          {instruments.map((instrument) => (
                            <li key={instrument}>
                              <strong>{instrument}</strong>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <Languages size={15} strokeWidth={2.4} />
                        <span>{classLanguages.join(" · ")}</span>
                      </li>
                    </ul>

                    <p className="profe-card-bio">
                      <strong>{bio.lead}</strong>
                      {bio.rest && <span> {bio.rest}</span>}
                    </p>
                  </div>

                  <div className="profe-card-actions">
                    <a
                      href={teacherContactHref}
                      className="profe-card-chat"
                      target="_blank"
                      rel="noopener"
                      aria-label={`Escribir por WhatsApp sobre ${teacher.name}`}
                    >
                      <MessageCircle size={22} strokeWidth={2.4} aria-hidden="true" />
                      <span className="profe-card-chat-label">WhatsApp</span>
                    </a>
                    <ul className="profe-card-action-details" aria-label="Detalles de clase">
                      <li>
                        <MapPin size={20} strokeWidth={2.4} aria-hidden="true" />
                        <span>{teacher.location}</span>
                      </li>
                      {classFormats.map((format) => {
                        const FormatIcon = classFormatIcon(format);

                        return (
                          <li key={format}>
                            <FormatIcon size={20} strokeWidth={2.4} aria-hidden="true" />
                            <span>{format}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
