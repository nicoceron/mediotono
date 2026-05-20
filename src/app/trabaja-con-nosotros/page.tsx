import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, GraduationCap, Languages, MapPin, Music2, Upload } from "lucide-react";
import { Footer } from "@/components/Footer";

const JOB_DETAILS = [
  {
    label: "Cargo",
    value: "Profesor/a de música",
    icon: BriefcaseBusiness,
  },
  {
    label: "Modalidad",
    value: "Presencial y virtual",
    icon: Music2,
  },
  {
    label: "Ubicación",
    value: "Bogotá y alrededores",
    icon: MapPin,
  },
  {
    label: "Área",
    value: "Pedagogía musical",
    icon: GraduationCap,
  },
];

export const metadata = {
  title: "Profesor/a de música",
  description: "Formulario de aplicación para profesores de música en A medio tono.",
};

export default function TrabajaConNosotrosPage() {
  return (
    <>
      <section className="job-application-page" data-screen-label="Aplicación profesor">
        <div className="job-application-shell">
          <header className="job-application-top">
            <Link className="job-back-link" href="/" aria-label="Volver al inicio">
              <ArrowLeft aria-hidden="true" size={22} strokeWidth={2.6} />
            </Link>
            <Image
              src="/logo-nav-947b682d.svg"
              alt="A medio tono"
              width={1205}
              height={300}
              priority
              className="job-logo"
            />
          </header>

          <div className="job-application-title">
            <h1>Profesor/a de música</h1>
          </div>

          <div className="job-application-layout">
            <aside className="job-summary" aria-label="Resumen del cargo">
              {JOB_DETAILS.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div className="job-summary-item" key={detail.label}>
                    <Icon aria-hidden="true" size={22} strokeWidth={2.4} />
                    <div>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  </div>
                );
              })}
              <div className="job-summary-note">
                <Languages aria-hidden="true" size={22} strokeWidth={2.4} />
                <p>Valoramos profes con escucha, energía pedagógica y ganas de acompañar distintos niveles.</p>
              </div>
            </aside>

            <div className="job-form-panel">
              <div className="job-alert">
                <strong>Aplicación para profesores</strong>
                <span>Completa tus datos y adjunta tu CV en PDF, DOC o DOCX.</span>
              </div>

              <form className="job-form" encType="multipart/form-data">
                <section className="job-form-section" aria-labelledby="general-info-title">
                  <h2 id="general-info-title">Información general</h2>

                  <label className="job-field">
                    <span>Nombre*</span>
                    <input name="nombre" type="text" placeholder="Tu nombre completo" required />
                  </label>

                  <div className="job-form-grid">
                    <label className="job-field">
                      <span>Correo electrónico*</span>
                      <input name="correo" type="email" placeholder="hola@ejemplo.com" required />
                    </label>

                    <label className="job-field">
                      <span>WhatsApp*</span>
                      <input name="whatsapp" type="tel" placeholder="+57 300 000 0000" required />
                    </label>
                  </div>

                  <label className="job-field">
                    <span>Instrumento que interpreta*</span>
                    <input name="instrumento" type="text" placeholder="Ej. Piano, violín, guitarra, canto..." required />
                  </label>

                  <div className="job-form-grid">
                    <fieldset className="job-choice">
                      <legend>Experiencia en pedagogía musical*</legend>
                      <label>
                        <input type="radio" name="pedagogia_musical" value="si" required />
                        <span>Sí</span>
                      </label>
                      <label>
                        <input type="radio" name="pedagogia_musical" value="no" />
                        <span>No</span>
                      </label>
                    </fieldset>

                    <fieldset className="job-choice">
                      <legend>Experiencia en formación preuniversitaria*</legend>
                      <label>
                        <input type="radio" name="formacion_preuniversitaria" value="si" required />
                        <span>Sí</span>
                      </label>
                      <label>
                        <input type="radio" name="formacion_preuniversitaria" value="no" />
                        <span>No</span>
                      </label>
                    </fieldset>
                  </div>

                  <label className="job-field">
                    <span>Lugar de residencia*</span>
                    <input name="residencia" type="text" placeholder="Ciudad y localidad" required />
                  </label>

                  <label className="job-field">
                    <span>Idiomas que maneja*</span>
                    <textarea name="idiomas" placeholder="Ej. Español nativo, inglés B2..." rows={4} required />
                  </label>
                </section>

                <section className="job-form-section" aria-labelledby="cv-title">
                  <h2 id="cv-title">CV</h2>
                  <label className="job-upload">
                    <Upload aria-hidden="true" size={30} strokeWidth={2.4} />
                    <span>Subir CV</span>
                    <small>PDF, DOC o DOCX</small>
                    <input name="cv" type="file" accept=".pdf,.doc,.docx" required />
                  </label>
                </section>

                <button className="job-submit" type="submit">
                  Enviar aplicación
                  <ArrowRight aria-hidden="true" size={22} strokeWidth={2.7} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
