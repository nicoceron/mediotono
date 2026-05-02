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

const TEACHERS = [
  { name: "Sergio Ramírez", role: "Piano y Canto", color: "var(--orange)", bio: "Soy profe de los datos curiosos y los ejemplos aún más curiosos, busco la mejor manera de enseñarte desde tus gustos e intereses. Me llamo Sergio y aprenderás música de maneras que no te imaginas.", photo: "/profes/sergio-ramirez.svg" },
  { name: "Sara Alfonso", role: "Piano", color: "var(--pink)", bio: "Soy Sara, pianista que no tiene tan buenos chistes, pero aprendemos divirtiéndonos. \"Music is medicine\"", photo: "/profes/sara-alfonso.svg" },
  { name: "Valentina Fernández", role: "Violín y Cuerdas", color: "var(--blue)", bio: "Soy Valentina, la violinista del color y con nuestros violines pintaremos de sonido nuestro corazón. Aquí todo se vale, el error, las risas, los chistes, pues una sonrisa dibujada es lo más bello de la educación.", photo: "/profes/valentina-fernandez.svg" },
  { name: "Gisselle Torres", role: "Flauta", color: "var(--green)", bio: "Tu profe de flauta que no omite lo gracioso que es equivocarse en clases. Soy Gisselle, ¡si no te ríes pierdes!", photo: "/profes/gisselle-torres.svg" },
  { name: "Daniela Cárdenas", role: "Iniciación Musical", color: "var(--purple)", bio: "Soy la profe de los mil recursos: convierto colores, burbujas, pañuelos y cuentos en experiencias donde la música se vive antes de aprenderse.", photo: "/profes/daniela-cardenas.svg" },
];

export function ProfesSection() {
  return (
    <section className="block" id="profes" data-screen-label="Profesores">
      <div className="container">
        <SectionHeader
          eyebrow="Las personas detrás"
          title="Nuestros profes"
          titleColors={["var(--blue)", "var(--green)"]}
          sub="Apasionados por lo que hacen y, sobre todo, por enseñarlo."
        />
        <div className="teachers-grid">
          {TEACHERS.map((t, i) => (
            <div className="teacher-card" key={i}>
              <div className="teacher-photo">
                <div className="bg" style={{ background: t.color, opacity: 0.55 }}></div>
                <img src={t.photo} alt={t.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit", zIndex: 1 }} />
              </div>
              <h3 style={{ color: t.color }}>{t.name}</h3>
              <div className="role">{t.role}</div>
              <p className="bio">{t.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}