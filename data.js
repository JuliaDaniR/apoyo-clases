// Data tareas fijas por semana (key = número de semana)
const tareasPorSemana = {
  21: [
    "Martes", "Gestion de Software - Realizar la primer parte del CSS del Business",
    "Miércoles", "Ingles - Ejercicios b y c de la página 18",
    "Miércoles", "Matemáticas - Revisar los problemas de lógica",
    "Viernes", "Comunicación - Entregar el trabajo práctico sobre el texto de Spinelli",
    "Viernes", "Comunicación - Leer el archivo del Classroom - Resúmen de Teorias de la comunicación",
  ],
  22: [
    "Lunes", "Modelos de Negocios - Realizar el trabajo práctico en equipo sobre un modelo canvas",
    "Lunes", "Psicosociología de las Organizaciones - Entregar el ensayo subido al Classroom",
    "Miércoles", "Matemáticas - Hacer los ejercicios de propiedades de la potencia desde el 1 al 36 de la primer página",
  ]
  // Podés seguir agregando semanas
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
      enlace: "https://www.canva.com/s/templates?query=modelo+de+negocio"
    },
    "Gestión de Software I": {
      temas: [
        "Finalizamos el trabajo práctico de Business",
      ],
      enlace: "https://drive.google.com/file/d/1ySzLwqHbX1tPv1NIqaE1w4LtmLpUEaH-/view?usp=sharing" 
    },
    "Matemática": {
      temas: [
        "Corrección de los problemas de lógica",
        "Comenzamos a ver el tema de Propiedades de la potencia",
        "Realizamos ejercicios de propiedades de la potencia",
        "Hicimos hasta el ejercicio 30 de la primer página",
      ]
    },
    "Análisis de Sistemas Organizacionales": {
      temas: [
        "Comenamos a ver el tema Tipos de Sistemas",
        "Realizamos un trabajo práctico grupal sobre ejemplos de software de los primeros 6 Tipos de Sistemas",
        "TPS, OAS, KWS, MIS, DSS y IA"
      ]
    },
    "Comunicación": {
      temas: [    
        "Continuamos con el tema de Teorías de la Comunicación",  
        "Realizamos un trabajo en clase sobre cómo nos comunicamos en diferentes situaciones",
      ]
    },
    "Psicosociología de las Organizaciones": {
      temas: [
       "Finalizamos el trabajo practico de Conflicto",
        "Comenzamos a ver el tema Negociación",
        "Realizamos trabajo grupal sobre el tema Negociación",
      ],
      enlace: ""
    },
    "Arquitectura de las Computadoras": {
      temas: [
       "Reapaso de los componentes de la computadora",
       "El profesor nos mostró cómo colocar componentes en la placa madre",
      ]
    },
    "Inglés Técnico I": {
      temas: [
       "Entregamos la actividad de la página 18",
       "Conversamos sobre la diferencia entre el inglés británico y el americano",
       "Realizamos ejercicios de las páginas 16, 17 y 7",
       "Revisar la lista de temas que puso la profesora en el Classroom para el examen, para consultar si hay algo que no se entendía",
      ]
    }
  },
  22: {
    "Modelos de Negocios": {
      temas: [
        "Terminamos con las últimas partes del Modelo Canvas",
        "Realizamos un trabajo práctico en equipo sobre un modelo canvas",
        "Presentamos el trabajo práctico en clase",
      ]
    },
    "Gestión de Software I": {
      temas: [
        "Comenzamos a trabajar en el nuevo trabajo practico del Bazar",
        "Trabajamos en la sala de computadoras",
      ]
    },
    "Matemática": {
      temas: [    
        "Continuamos con el tema de Propiedades de la potencia",
        "Realizamos ejercicios de propiedades de la potencia (Parte II) del 37 al 49",
        "Realzar ejercicio Unir con flechas del 50 al 54",
      ]
    },
    "Análisis de Sistemas Organizacionales": {
      temas: [
        "Terminamos de ver los últimos 4 Tipos de Sistemas",
        "Realizamos un trabajo práctico grupal sobre ejemplos de software de los últimos 4 Tipos de Sistemas, Web estáticas, Web con Base de Datos y Sistemas de escritorio",
        "Sistema Expertos, Sistema de Soporte a Decisiones en grupo, Sistema de trabajo colaborativo asistido por computadora y Sistema de soporte para ejecutivos",
      ]
    },
    "Comunicación": {
      temas: [    
        "Finalizamos el apunte de Teorías de la Comunicación",
        "Trabajamos en grupo sobre la Teoria Funcionalista y la Teoria Crítica",
      ]
    },
    "Psicosociología de las Organizaciones": {
      temas: [
       "Tuvimos clase virtual",
       "Realizar el Ensayo subido al Classroom",
      ],
      enlace: ""
    },
    "Arquitectura de las Computadoras": {
      temas: [
       "El profesor agrego un enlace de canva para ir trabajando en equipo la linea de tiempo",
      ]
    },
    "Inglés Técnico I": {
      temas: [
       "Comenzamos a ver la unidad 2",
       "Hicimos pags 1, 2 y 3 ( de esta última solo la teoría de presente simple afirmativo y negativo)"   
      ]
    }
  }
};
