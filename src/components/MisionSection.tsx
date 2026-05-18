import Image from "next/image";

const FOUNDERS = [
  { name: "Daniela Cárdenas", role: "Iniciación Musical", color: "var(--purple)", bio: "Soy la profe de los mil recursos: convierto colores, burbujas, pañuelos y cuentos en experiencias donde la música se vive antes de aprenderse.", photo: "/profes/daniela-cardenas.svg" },
  { name: "Gisselle Torres", role: "Flauta", color: "var(--green)", bio: "Tu profe de flauta que no omite lo gracioso que es equivocarse en clases. Soy Gisselle, ¡si no te ríes pierdes!", photo: "/profes/gisselle-torres.svg" },
];

export function MisionSection() {
  return (
    <>
      {/* Misión / Visión / Objetivo — clean layout */}
      <section className="block alt" id="mision" data-screen-label="Misión / Visión">
        <div className="container">
          <div className="mvo-clean">
            <h2 className="mvo-clean-title">
              <span style={{ color: "var(--orange)", marginRight: 10, display: "inline-block" }}>Nuestro</span>
              <span style={{ color: "var(--red)", display: "inline-block" }}>corazón</span>
            </h2>
            <p className="mvo-clean-sub">Una escuela donde el arte se vive, se siente y se comparte — sin importar la edad.</p>

            <div className="mvo-clean-grid">
              <div className="mvo-item">
                <span className="mvo-label" style={{ color: "var(--orange)" }}>Misión</span>
                <p>Formar personas a través del arte y la música, en un espacio cálido donde cada estudiante encuentre su voz, su ritmo y su forma de expresarse.</p>
              </div>
              <div className="mvo-item">
                <span className="mvo-label" style={{ color: "var(--pink)" }}>Visión</span>
                <p>Ser la escuela de artes referente de la región: un lugar donde niños, jóvenes y adultos descubran que aprender arte puede ser la mejor parte de su semana.</p>
              </div>
              <div className="mvo-item">
                <span className="mvo-label" style={{ color: "var(--blue)" }}>Objetivo</span>
                <p>Ofrecer clases de altísima calidad humana y técnica, con grupos pequeños, profes apasionados y ambientes creativos que despierten la pasión por el arte.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fundadoras — minimalist grid like Profes */}
      <section className="block" id="fundadoras" data-screen-label="Fundadoras">
        <div className="container">
          <div className="founders-clean">
            <h2 className="founders-clean-title">
              <span style={{ color: "var(--purple)", marginRight: 10, display: "inline-block" }}>Quienes</span>
              <span style={{ color: "var(--green)", display: "inline-block" }}>lo empezaron todo</span>
            </h2>

            <div className="founders-clean-grid">
              {FOUNDERS.map((f) => (
                <div className="founder-item" key={f.name}>
                  <div className="founder-photo" style={{ borderColor: f.color }}>
                    <div className="founder-photo-bg" style={{ background: f.color }} />
                    <Image src={f.photo} alt={f.name} fill sizes="180px" />
                  </div>
                  <div className="founder-body">
                    <h3 style={{ color: f.color }}>{f.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
