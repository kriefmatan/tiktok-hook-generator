import type { BlockDrillNames, BlockKind, BulletPair, EmphasisKey, SimplePracticeBundle } from "../coachBundle.types";

const block = (
  warmup: readonly string[],
  drill1: readonly string[],
  drill2: readonly string[],
  drill3: readonly string[],
  game: readonly string[]
): BlockDrillNames => ({ warmup, drill1, drill2, drill3, game });

const drills = (
  warmup: readonly string[],
  drill1: readonly string[],
  drill2: readonly string[],
  drill3: readonly string[],
  game: readonly string[]
) => block(warmup, drill1, drill2, drill3, game);

const ES_DRILL_NAMES: Record<EmphasisKey, BlockDrillNames> = {
  rebound: drills(
    ["Líneas de salida tras contacto", "2c2 toque de box-out", "Tiro → rebote → salida"],
    ["2c2 al tiro — primero a 6 rebotes", "3c3 en la pintura — punto por rebote ofensivo", "Cadena cierre-box-out-rebote"],
    ["4c4 — sin salir hasta controlar", "Cascarón + rebote lado débil", "Rebote ofensivo solo tras contacto"],
    ["5c5 — +2 por segunda oportunidad", "Rebotes competitivos a 7", "Últimos 4 min: sin fugas"],
    ["5c5 — rebote y vuelta", "Partido: rebote ofensivo = posesión extra", "Juego real — pelear ambos aros"]
  ),
  shoot: drills(
    ["Mecánica 5 sitios — 5 encestos cada uno", "Triple recepción lista — misma mecánica", "Penetración-pase-esquina — 1 bote máximo"],
    ["Sitios de partido: 4 esquinas, 2 y rotan", "Corte y relleno — pasador mira seguimiento", "Penetración-atraer-pase — skip si la esquina mete dos"],
    ["4c4 — tocar pintura antes del triple", "Cascarón skip al tirador — cierre y contestar", "Bloqueo directo — esquina solo tras toque al bloqueador"],
    ["5c4 serie de pases — 12 encestos", "Triples competitivos — perdedor corre una línea", "Última parada: mejor tirador toma el último triple"],
    ["5c5 — triple abierto solo tras dos pases", "Partido: triple de esquina = +1", "Lee la defensa — tira la abierta"]
  ),
  pnr: drills(
    ["Bloqueo lateral sin defensa — caderas cuadradas", "Bloqueo fantasma — timing sin defensa viva", "2c0 España — marcar al rolador"],
    ["Bloqueo lateral — leer show alto vs drop", "Rechazar y re-bloquear — un solo lado", "4c3 cascarón — rolador o esquina"],
    ["Bloqueo vivo — lado débil sube con la ayuda", "Cambios — slip o re-bloqueo", "3c3 — dos canastas por posesión"],
    ["4c4 — bloqueo cada posesión", "Marcar al rolador — ayuda a 0.5", "Competitivo: 6 paradas o 8 puntos"],
    ["5c5 — llamar el bloqueo pronto", "Partido: solo lado del bloqueo", "Juego — sin bloqueos tardíos"]
  ),
  zone: drills(
    ["Zona — pase a esquina baja", "3c2 sobrecarga esquina — toque pintura", "Skip solo tras toque en esquina"],
    ["4c3 vs 2-3 — un skip por viaje", "Esquina baja viva — corte desde dunker", "Flash al poste alto — esquina o ala"],
    ["4c4 zona — cambio de lado en 3 pases", "Flash medio vs 1-3-1", "Rellenar esquina si colapsan los bases"],
    ["5c4 — tocar pintura antes del triple", "Zona viva — mejor opción en 12 seg", "Competitivo: 7 toques en pintura"],
    ["5c5 — sin triples tempranos vs zona", "Partido: toque en esquina baja obligatorio", "Corred lo trabajado"]
  ),
  turnover: drills(
    ["Pases en pareja — pies antes de recibir", "2 balones manejo cerrado — mirada arriba", "Finta de pase debe mover una mano"],
    ["3c2 — sin botar hasta medio campo", "Cascarón — pases a una mano", "4c4 — pérdida viva = sprint atrás"],
    ["4c4 — dos manos al recibir en pintura", "Escape de trampa — parada y giro", "Pase bajo presión — defensor en cadera"],
    ["5c4 — defensor extra en medio", "Competitivo — pérdida = 2 flexiones equipo", "Último tramo: cero pérdidas vivas"],
    ["5c5 — recepción con marco en pintura", "Partido: pase descuidado = balón rival", "Cuiden cada posesión"]
  ),
  transition: drills(
    ["3 carriles — tocar pintura en ambos extremos", "Carrera de salida — pase al pecho", "Vuelta trote vs sprint — llamar emparejamiento"],
    ["4c4 conversión — canasta o 4 paradas", "Ventaja numérica 3c2 — llenar carriles", "Trailer es el último defensor"],
    ["4c4 — sin tiro hasta segundo defensor", "Rebote vivo salida — reloj 8 seg", "Emparejar en 4 pasos — en voz alta"],
    ["5c5 — anotas y sigues", "Transición competitiva — parada = sprint", "Últimos 3 min: sin fugas"],
    ["5c5 — vuelta o sin contraataque", "Partido: defensa de transición gana", "Hablen emparejamientos — cada balón"]
  ),
  communication: drills(
    ["Nombre-pase-nombre en tejido", "Cierre con voz — lado del balón", "Tres defensivos — solo llamada de cambio"],
    ["3c3 — sin canasta sin dos llamadas", "Cascarón — ayuda y recuperar en voz alta", "4c4 — mismatch antes de trampa"],
    ["4c4 — llamar bloqueo antes del contacto", "Vivo — llamada mala = cambio de posesión", "Transición — número de emparejamiento"],
    ["5c5 — silencio = sprint extra", "Competitivo — quien más habla gana", "Última parada: una voz en balón"],
    ["5c5 — mismas palabras en cada bloqueo", "Partido: sin llamada = pérdida", "Hablen fuerte — mismo lenguaje"]
  ),
  decision: drills(
    ["Línea de lectura — penetrar-pasar o terminar", "2c1 — finalizar sin botar", "Marcador decide — pase o tiro"],
    ["3c3 — pase extra antes del tiro", "4c3 — hombre libre en 2 pases", "Cascarón — penetrar si la ayuda llega tarde"],
    ["4c4 — sin balón héroe en pintura", "Lectura bloqueo — rolador o skip", "Competitivo — mejor decisión gana"],
    ["5c4 — serie penetrar-atraer-pasar", "Vivo — mala lectura = balón rival", "Último tramo: regla de un pase más"],
    ["5c5 — jueguen lo que ven", "Partido: punto por cadena de asistencia", "Rápido — decidir antes del heroísmo"]
  ),
  motion: drills(
    ["Bloqueo hacia abajo — corte pegado, manos listas", "Flex en esquina — pies antes del tiro", "Bloqueo trasero — slip o pop"],
    ["4 abiertos — rellenar tras penetración", "Bloqueos continuos un lado", "3c3 movimiento — canasta en segundo lado"],
    ["4c4 movimiento — no pararse 3 seg", "Vivo — ángulo del bloqueo importa", "Intercambio lado débil en penetración"],
    ["5c5 solo movimiento", "Competitivo — canasta tras bloqueo", "Último bloque: misma acción ambos lados"],
    ["5c5 — corred vuestra movimiento", "Partido: backdoor = +1", "Moverse sin balón — siempre"]
  ),
  pressure: drills(
    ["1c1 campo completo — 3 botes máximo", "Escape trampa en medio — parada", "Negar pase — mano en línea"],
    ["3c3 campo completo — 3 paradas", "Run-and-jump — sin alcanzar", "4c4 presión — trampa solo en banda"],
    ["4c4 — sin penetración al medio", "Presión viva — sprint al tiro", "Cascarón con presión al balón"],
    ["5c5 presión a 7", "Competitivo — romper presión = punto", "Últimos 4 min: presión en cada balón muerto"],
    ["5c5 — vuestra presión", "Partido: robo = punto bonus", "Agresivos — manos arriba"]
  ),
  spacing: drills(
    ["Penetrar-pasar — esquina se queda ancha", "Rellenar detrás — 1 bote y tiro", "Puntos de espacio — 3.5 m entre ellos"],
    ["4 abiertos — penetrar hueco, pase a esquina", "3c3 — no dos jugadores en pintura", "Cascarón skip si colapsa la ayuda"],
    ["4c4 — máximo 2 en pintura", "Vivo — reubicar en penetración", "Subida lado débil si se llena esquina"],
    ["5c5 — pararse en pintura = balón rival", "Competitivo — mejor espacio gana", "Último tramo: no quedarse en pintura"],
    ["5c5 — piso abierto", "Partido: triple de esquina tras penetración", "Anchos — moverse sin balón"]
  ),
  fiveOut: drills(
    ["5 abiertos — pase y corte, rellenar esquina", "Penetración desde arriba — subir esquina", "Entrega en ala — rechazar o seguir"],
    ["4c4 cinco abiertos — sin posteos", "Penetrar-atraer-pasar desde clavo", "3c3 — esquina sigue siendo esquina"],
    ["4c4 — slip si hay ayuda", "Cinco abiertos vivo — penetración un lado", "Competitivo: 8 toques en pintura"],
    ["5c5 sets cinco abiertos", "Partido: triple esquina tras dos pases", "Último bloque: solo penetrar-pasar"],
    ["5c5 — piso extendido", "Corred vuestro cinco abiertos", "Partido: sin recepciones en poste"]
  ),
  fast: drills(
    ["Tejido a bandeja", "Carrera de salida — primero a 5", "Sprint en carriles — balón adelante"],
    ["3c2 contraataque primario", "4c4 — canasta en 8 seg o gana defensa", "Trailer llena esquina opuesta"],
    ["4c4 — sin tiro hasta segundo trailer", "Contraataque vivo — pase adelante", "Competitivo: 6 paradas o 10 puntos"],
    ["5c5 — anotas y sigues", "Partido: contraataque = +1", "Últimos 3 min: empujar cada fallo"],
    ["5c5 — corred vuestro break", "Ritmo — pase adelante", "Partido: sin caminar el balón"]
  ),
  switch: drills(
    ["Cambio 1c1 — hablar pronto", "Grande-pequeño — drill de cambio", "Llamada bloqueo → cambiar o quedarse"],
    ["3c3 — cambiar todo", "4c4 — slip en cambio tardío", "Cascarón — show y cambio"],
    ["4c4 vivo — sin roladores libres", "Blitz de cambio en bloqueo lateral", "Competitivo: 6 paradas"],
    ["5c5 reglas de cambio", "Partido: cazar mismatch tras cambio", "Último bloque: hablar cada bloqueo"],
    ["5c5 — vuestro esquema de cambios", "Jugar los cambios", "Partido: sin roladores abiertos"]
  ),
  generic: drills(
    ["Dos líneas — pase y finalizar", "Cierre-toque-marcar", "Tejido a aro"],
    ["3c3 media pista — una regla", "Cascarón 4c3 — penetrar y pasar", "4c4 — el entrenador pone la restricción"],
    ["4c4 — añadir una lectura defensiva", "Mismo tema, vivo en segundo", "Tramo competitivo a 7"],
    ["5c4 trabajo con ventaja", "5c5 — un foco", "Competitivo — llevar marcador"],
    ["5c5 — llevar el día al partido", "Minutos de juego — vuestro énfasis", "Juego real — una cosa"]
  ),
};

const ES_BLOCK_FRAMES: Record<BlockKind, BulletPair> = {
  warmup: ["Articulaciones y toques suaves con balón", "Estiramiento dinámico — sin filas"],
  drill1: ["Una demo, luego parejas", "Reps lentas — corregir pies primero"],
  drill2: ["Ritmo de partido — puntos o tarea", "Mini competición cada serie"],
  drill3: ["Defensa viva — paradas cortas", "Error = consecuencia ligera"],
  game: ["5c5 — misma regla de hoy", "Nombrar lo que entrenamos"],
};

const ES_SETUP_HOOKS: Record<EmphasisKey, string> = {
  rebound: "Primero el rebote",
  shoot: "Solo tiros abiertos",
  pnr: "Timing del bloqueo",
  zone: "Toque en pintura vs zona",
  turnover: "Cuidar el balón",
  transition: "Volver y luego correr",
  communication: "Hablar en cada acción",
  decision: "Leer, no adivinar",
  motion: "Mover la defensa",
  pressure: "Presión al balón",
  spacing: "Piso ancho",
  fiveOut: "Cinco abiertos",
  fast: "Subir el ritmo",
  switch: "Hablar en cambios",
  generic: "Foco de hoy",
};

export const ES_SIMPLE = {
  locale: "es",
  dir: "ltr",
  formatMinutes: (n: number) => `${n} min`,
  totalTime: "~50 min",
  sectionLabels: ["Calentamiento", "Bloque 1", "Bloque 2", "Bloque 3", "5c5 — regla de hoy"] as const,
  headerFallback: "Entreno",
  setupHooks: ES_SETUP_HOOKS,
  blockFrames: ES_BLOCK_FRAMES,
  drillNames: ES_DRILL_NAMES,
  captions: {
    lines: "Dos filas: pase arriba, sprint por carril.",
    pnr: "Bloqueo lateral — salida, rolador o esquina.",
    shooting: "Tres sitios — misma mecánica en cada recepción.",
    rebound: "Dos buscan contacto antes que el balón.",
    passTriangle: "Cambios rápidos con presión suave en clavo.",
    motion: "Entrada a ala, corte corto vs niego suave.",
    shell: "Penetración desde ala — skip si salta la ayuda.",
    zone: "Esquina baja ocupada, cambio alto vs 2-3.",
    transition: "Sprint atrás — tocar pintura, encontrar hombre.",
    five: "Espacios vivos: cambio de lado y penetración central.",
  },
  bullets: {
    rebound: [
      "Primero el contacto, luego el balón.",
      "Sin salir hasta controlarlo.",
    ],
    shoot: [
      "Mismo punto de recepción — no acelerar tras un fallo.",
      "El pasador mira las manos del tirador.",
    ],
    pnr: [
      "Llamar el bloqueo pronto — pies tarde lo matan.",
      "Lado débil sube una ventana con la ayuda.",
    ],
    zone: [
      "Esquina baja antes de cualquier triple temprano.",
      "Skip solo tras pintura o esquina baja.",
    ],
    turnover: [
      "Recibir en marco — no salvar malos pases con pasos.",
      "La finta de pase debe mover mano o pie.",
    ],
    transition: [
      "Emparejar en cuatro pasos — decir el nombre.",
      "Balón tocado pronto; corredores llenan carriles.",
    ],
    communication: [
      "Voz en lado del balón en cada bloqueo.",
      "Si no lo oyeron, no pasó.",
    ],
    decision: [
      "Un pase más cuando colapsan dos.",
      "Penetrar si la ayuda llega tarde — pasar si está abierto.",
    ],
    motion: [
      "Ángulo del bloqueo — glúteo al defensor.",
      "Corte pegado; manos listas antes de girar.",
    ],
    pressure: [
      "Manos arriba, sin alcanzar — que levanten el balón.",
      "Trampa en banda, no en el medio.",
    ],
    spacing: [
      "Esquina ancha cuando penetra el balón.",
      "Dos en pintura bastan — reubicar.",
    ],
    fiveOut: [
      "Penetrar el hueco — esquina sube, no se mete.",
      "Rellenar tras la penetración.",
    ],
    fast: [
      "Pase adelante — no botar al tráfico.",
      "Primeros tres pasos atrás en un fallo.",
    ],
    switch: [
      "Llamarlo antes del contacto, no después.",
      "Grandes cambian pronto — no perseguir desde atrás.",
    ],
    generic: [
      "Volver a lo de la pizarra.",
      "Paradas cortas — repeticiones antes que charlas.",
    ],
  },
} satisfies SimplePracticeBundle;
