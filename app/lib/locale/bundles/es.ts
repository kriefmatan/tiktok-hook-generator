import type { SimplePracticeBundle } from "../coachBundle.types";

export const ES_SIMPLE = {
  locale: "es",
  dir: "ltr",
  formatMinutes: (n: number) => `${n} min`,
  totalTime: "~50 min",
  sectionLabels: ["Calentamiento", "Bloque 1", "Bloque 2", "Bloque 3", "5c5 — énfasis de hoy"] as const,
  headerFallback: "Entreno",
  captions: {
    lines: "Dos filas: pase arriba, carril de sprint.",
    pnr: "Bloqueo directo: salida del bloqueo, pase al bloqueador.",
    shooting: "Recepción para tiro desde tres sitios — misma mecánica.",
    rebound: "Dos a rebote buscan contacto antes que el balón.",
    passTriangle: "Cambios de lado rápidos con presión suave en la esquina.",
    motion: "Entrada a esquina, corte superficial con niego suave.",
    shell: "Penetración desde esquina, pase largo si salta la ayuda.",
    zone: "Lateral de zona ocupado, cambio de lado alto frente a 2-3.",
    transition: "Carrileros al volver — tocar pintura y emparejar.",
    five: "Espacios vivos: cambio de lado y penetración central.",
  },
  titlesWarmup: [
    "Entrada suave",
    "Manos y pies despiertos",
    "Ritmo bajo, pases firmes",
    "Arranque simple",
    "Calentamiento corto y claro",
    "Poca carga al inicio",
  ],
  titlesDrill1: [
    "Primer bloque — tu tema",
    "Media pista — idea central",
    "Ventana corta, una regla",
    "Construir el hábito",
    "Pocos jugadores, mensaje claro",
    "Solo una regla",
  ],
  titlesDrill2: [
    "Segundo bloque — más presión",
    "Misma idea, lectura viva",
    "Subir un punto el dial",
    "Mantener el hilo",
    "Añadir una lectura defensiva",
    "Acumular la restricción",
  ],
  titlesDrill3: [
    "Tercer bloque — ritmo de partido",
    "Reloj corto, decisiones reales",
    "Tramo competitivo",
    "Con marcador y estándar",
    "Cerrar el hilo",
    "Una parada — una corrección",
  ],
  titlesGame: [
    "5c5 — llevar el día al partido",
    "Vivo — el énfasis de hoy",
    "Juego real",
    "Pista completa o media — lo que toque",
    "Minutos de juego, un foco",
    "Terminar con lo importante hoy",
  ],
  bullets: {
    rebound: [
      "Primero el contacto, luego el balón.",
      "Sin salir al contraataque antes de controlar el rebote.",
    ],
    shoot: [
      "Mismo punto de recepción siempre — sin acelerar tras un fallo.",
      "Los ojos del pasador en las manos del tirador.",
    ],
    pnr: [
      "Nombrar el bloqueo pronto; pies tarde rompen el timing.",
      "El lado débil sube una ventana cuando aparece ayuda.",
    ],
    zone: [
      "Tocar lateral de zona antes de un triple temprano.",
      "Pase largo solo tras pintura o lateral de zona.",
    ],
    turnover: [
      "Recepción dentro del marco — sin salvar con pasos.",
      "La finta de pase debe mover una mano o un pie.",
    ],
    transition: [
      "Emparejar en cuatro pasos — en voz alta.",
      "Balón tocado pronto; corredores llenan carriles.",
    ],
    generic: [
      "Volver a lo que escribiste en la pizarra.",
      "Paradas cortas — repeticiones antes que charlas.",
    ],
  },
} satisfies SimplePracticeBundle;
