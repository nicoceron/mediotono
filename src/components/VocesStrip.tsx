const ITEMS = [
  { word: "Todos los Instrumentos", color: "var(--orange)" },
  { word: "Presencial & Virtual", color: "var(--pink)" },
  { word: "Iniciación Musical", color: "var(--blue)" },
];

function Row({ prefix }: { prefix: string }) {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span className="voces-item" key={`${prefix}-${i}`}>
          <span className="voces-dot" style={{ background: item.color }} />
          <span>{item.word}</span>
        </span>
      ))}
    </>
  );
}

export function VocesStrip() {
  return (
    <div className="voces-strip" aria-hidden="true">
      <div className="voces-track">
        <Row prefix="a" />
        <Row prefix="b" />
      </div>
    </div>
  );
}
