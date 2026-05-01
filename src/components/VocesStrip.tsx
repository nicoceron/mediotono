const VOCES = [
  { quote: "Mi hijo de 7 años llega feliz a cada clase de piano. Los profes son una ternura y de verdad le enseñan.", name: "Laura M." },
  { quote: "Llevaba años queriendo aprender guitarra y aquí por fin lo logré. Adultos: vengan sin miedo.", name: "Carlos R." },
  { quote: "El ambiente es súper creativo. Mi hija no quiere que termine el semestre.", name: "Andrea P." },
  { quote: "Los grupos pequeños hacen toda la diferencia. Sentí progreso desde la segunda clase.", name: "Daniela S." },
  { quote: "La mejor decisión que tomamos para nuestros hijos. Recomendada 100%.", name: "María T." },
  { quote: "Yo que pensaba que era tarde para aprender piano… ¡ya toco mis primeras canciones!", name: "Jorge L." },
];

const VOCES_DUPLICATED = [...VOCES, ...VOCES];

export function VocesStrip() {
  return (
    <div className="voces-strip">
      <div className="voces-track">
        {VOCES_DUPLICATED.map((v, i) => (
          <div className="voces-item" key={i}>
            <span className="voces-mark">&ldquo;</span>
            <span className="voces-quote">{v.quote}</span>
            <span className="voces-who">— {v.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}