import Image from "next/image";

const ICONS = [
  "/voces-icon-1.png",
  "/voces-icon-2.png",
  "/voces-icon-3.png",
  "/voces-icon-4.png",
];

const WORDS = [
  "Mejores profesores",
  "Remoto y presencial",
  "Piano",
  "Guitarra",
  "Violín",
  "Canto",
  "Flauta",
  "Batería",
  "✦ Inscripciones abiertas ✦",
];

function Row({ prefix }: { prefix: string }) {
  const nodes: React.ReactNode[] = [];
  WORDS.forEach((word, i) => {
    if (i > 0) {
      nodes.push(
        <Image
          className="voces-icon"
          src={ICONS[(i - 1) % ICONS.length]}
          alt=""
          width={40}
          height={40}
          key={`${prefix}-icon-${i}`}
        />
      );
    }
    nodes.push(
      <span key={`${prefix}-word-${i}`}>{word}</span>
    );
  });
  return <>{nodes}</>;
}

export function VocesStrip() {
  return (
    <div className="voces-strip" aria-hidden="true">
      <div className="voces-track">
        <Row prefix="a" /><Row prefix="b" />
      </div>
    </div>
  );
}