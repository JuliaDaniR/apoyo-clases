// Data tareas fijas por semana (key = número de semana)
const tareasPorSemana = {
  21: [
    "Martes",
    "Gestion de Software - Realizar la primer parte del CSS del Business",
    "Miércoles",
    "Ingles - Ejercicios b y c de la página 18",
    "Miércoles",
    "Matemáticas - Revisar los problemas de lógica",
    "Viernes",
    "Comunicación - Entregar el trabajo práctico sobre el texto de Spinelli",
    "Viernes",
    "Comunicación - Leer el archivo del Classroom - Resúmen de Teorias de la comunicación",
  ],
  22: [
    "Lunes",
    "Modelos de Negocios - Realizar el trabajo práctico en equipo sobre un modelo canvas",
    "Lunes",
    "Psicosociología de las Organizaciones - Entregar el ensayo subido al Classroom",
    "Miércoles",
    "Matemáticas - Hacer los ejercicios de propiedades de la potencia desde el 1 al 36 de la primer página",
  ],
  23: [
    "Lunes",
    "Modelos de Negocios - Entregar el trabajo práctico en equipo sobre un modelo canvas",
    "Martes",
    "Arquitectura de las Computadoras - Trabajar en la línea de tiempo, ingresar al enlace e ir agregando datos para armarla",
    "Miércoles",
    "Matemáticas - Realizar ejercicio Unir con flechas del 50 al 54",
  ],
  24: [
    "Lunes", "Modelos de Negocios - Entregar el trabajo práctico en equipo sobre un modelo canvas Aerolineas",
    "Martes", "Gestión de Software I - Entregar el trabajo práctico del Bazar",
  ],
  26: [
    "Lunes",
    "Psicosociología de las Organizaciones - Trabajo práctico individual en clase con nota.",
    "Martes",
    "Gestión de Software I - Entregar el trabajo práctico de la Batalla de Procesadores - Aún no se sabe la fecha de entrega",
    "Miércoles",
    "Matemáticas - Resolver los ejercicios de propiedades los que nos parezcan más difíciles para verlos en clase",
    "Miércoles","Inglés Técnico I - Realizar el trabajo práctico 'My dream job' referido a la pagina 5 ejercicio 7",
  ],
  27: [
    "Lunes",
    "Psicosociología de las Organizaciones - Examen parcial individual",
    "Jueves",
    "Análisis de Sistemas Organizacionales - Entregar el trabajo práctico N° 2",
    "Viernes",
    "Comunicación - Entregar el trabajo práctico N° 2",
    "Viernes",
    "Comunicación - Entregar el trabajo práctico N° 3",
  ],
};

// Data resumen de clases por semana y materia
const resumenClasesPorSemana = {
  21: {
    "Modelos de Negocios": {
      temas: [
        "Concepto de modelo de negocio",
        "Aspectos claves que incluye en un modelo de negocio",
        "Modelo Canvas",
        "Partes del modelo Canvas",
      ],
      enlace: "https://www.canva.com/s/templates?query=modelo+de+negocio",
    },
    "Gestión de Software I": {
      temas: ["Finalizamos el trabajo práctico de Business"],
      enlace:
        "https://drive.google.com/file/d/1ySzLwqHbX1tPv1NIqaE1w4LtmLpUEaH-/view?usp=sharing",
    },
    Matemática: {
      temas: [
        "Corrección de los problemas de lógica",
        "Comenzamos a ver el tema de Propiedades de la potencia",
        "Realizamos ejercicios de propiedades de la potencia",
        "Hicimos hasta el ejercicio 30 de la primer página",
      ],
    },
    "Análisis de Sistemas Organizacionales": {
      temas: [
        "Comenamos a ver el tema Tipos de Sistemas",
        "Realizamos un trabajo práctico grupal sobre ejemplos de software de los primeros 6 Tipos de Sistemas",
        "TPS, OAS, KWS, MIS, DSS y IA",
      ],
    },
    Comunicación: {
      temas: [
        "Continuamos con el tema de Teorías de la Comunicación",
        "Realizamos un trabajo en clase sobre cómo nos comunicamos en diferentes situaciones",
      ],
    },
    "Psicosociología de las Organizaciones": {
      temas: [
        "Finalizamos el trabajo practico de Conflicto",
        "Comenzamos a ver el tema Negociación",
        "Realizamos trabajo grupal sobre el tema Negociación",
      ],
      enlace: "",
    },
    "Arquitectura de las Computadoras": {
      temas: [
        "Repaso de los componentes de la computadora",
        "El profesor nos mostró cómo colocar componentes en la placa madre",
      ],
    },
    "Inglés Técnico I": {
      temas: [
        "Entregamos la actividad de la página 18",
        "Conversamos sobre la diferencia entre el inglés británico y el americano",
        "Realizamos ejercicios de las páginas 16, 17 y 7",
        "Revisar la lista de temas que puso la profesora en el Classroom para el examen, para consultar si hay algo que no se entendía",
      ],
    },
  },
  22: {
    "Modelos de Negocios": {
      temas: [
        "Terminamos con las últimas partes del Modelo Canvas",
        "Realizamos un trabajo práctico en equipo sobre un modelo canvas",
        "Presentamos el trabajo práctico en clase",
      ],
    },
    "Gestión de Software I": {
      temas: [
        "Comenzamos a trabajar en el nuevo trabajo práctico del Bazar",
        "Trabajamos en la sala de computadoras",
      ],
    },
    Matemática: {
      temas: [
        "Continuamos con el tema de Propiedades de la potencia",
        "Realizamos ejercicios de propiedades de la potencia (Parte II) del 37 al 49",
      ],
    },
    "Análisis de Sistemas Organizacionales": {
      temas: [
        "Terminamos de ver los últimos 4 Tipos de Sistemas",
        "Realizamos un trabajo práctico grupal sobre ejemplos de software de los últimos 4 Tipos de Sistemas, Web estáticas, Web con Base de Datos y Sistemas de escritorio",
        "Sistema Expertos, Sistema de Soporte a Decisiones en grupo, Sistema de trabajo colaborativo asistido por computadora y Sistema de soporte para ejecutivos",
      ],
    },
    Comunicación: {
      temas: [
        "Finalizamos el apunte de Teorías de la Comunicación",
        "Trabajamos en grupo sobre la Teoria Funcionalista y la Teoria Crítica",
      ],
    },
    "Psicosociología de las Organizaciones": {
      temas: [
        "Tuvimos clase virtual",
        "Realizar el Ensayo subido al Classroom",
      ],
      enlace: "",
    },
    "Arquitectura de las Computadoras": {
      temas: [
        "El profesor agrego un enlace de canva para ir trabajando en equipo la linea de tiempo",
      ],
    },
    "Inglés Técnico I": {
      temas: [
        "Comenzamos a ver la unidad 2",
        "Hicimos pags 1, 2 y 3 ( de esta última solo la teoría de presente simple afirmativo y negativo)",
      ],
    },
  },
  24: {
    "Modelos de Negocios": {
      temas: [
        "Continuamos con el llenado de la planilla del ejercicio del centro de imágenes",
      ],
    },
    "Gestión de Software I": {
      temas: ["Introducción a Boostrap"],
    },
    Matemática: {
      temas: ["No hubo clase"],
    },
    "Análisis de Sistemas Organizacionales": {
      temas: [
        "Comenzamos a ver herramientas Case ejemplos, usos y tipos",
        "Realizamos un trabajo práctico grupal sobre ejemplos de software de herramientas Case",
        "Introducción a las metodologías ágiles",
      ],
    },
    Comunicación: {
      temas: [
        "Trabajamos sobre el nuevo material del el capítulo 3: Habilidades para la comunicación oral",
      ],
    },
    "Psicosociología de las Organizaciones": {
      temas: [
        "Corrección del trabajo de 'Construyendo la Empresa', con los tipos de roles ejemplo: cúpula estratégica,tecnoestructura, etc",
        "Trabajo en grupos frases/imágenes qué te motiven a estudiar o a mejorar,pero puesta en común de las frases",
      ],
      enlace: "",
    },
    "Arquitectura de las Computadoras": {
      temas: ["Comenzamos a trabajar con Excel"],
    },
    "Inglés Técnico I": {
      temas: ["No hubo clases"],
    },
  },
  25: {
    "Modelos de Negocios": {
      temas: [
        "No hubo clases, Feriado",
      ],
    },
    "Gestión de Software I": {
      temas: [
        "Comenzamos a trabajar en el nuevo trabajo página 'La Comercial'",
      ],
    },
    Matemática: {
      temas: [
        "Realizamos ejercicios de propiedades de la radicación del 60 al 69",
      ],
    },
    "Análisis de Sistemas Organizacionales": {
      temas: [
        "No hubo clases, Debemos asistir ExpoCarreras",
      ],
    },
    Comunicación: {
      temas: [
        "No hay clases, Feriado",
      ],
    },
    "Psicosociología de las Organizaciones": {
      temas: [
        "No hay clases, Feriado",
      ],
      enlace: "",
    },
    "Arquitectura de las Computadoras": {
      temas: ["Trabajamos en excel, hicimos el trabajo practico 'Remito' y 'Factura' terminarlo y entregarlo"],
    },
    "Inglés Técnico I": {
      temas: [
        "Continuamos con el Present Simple",
        "Realizamos ejercicios de la página 4, ejercicios 3B y 3C",
        "Realizamos ejercicios de la página 5, Listenning el audio está en el Classroom",
      ],
    },
  },
};
