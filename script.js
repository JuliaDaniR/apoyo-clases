// --- Funciones de utilidad ---

// Número de semana ISO (lunes como inicio)
function getWeekNumber(d = new Date()) {
  d = new Date(d.getTime());
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

// Obtener lunes y viernes para la semana con offset
function getWeekWithOffset(offset = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + offset * 7);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${d}/${m}`;
  };

  return {
    label: `📅 Semana del <br> ${formatDate(monday)} al ${formatDate(friday)}`,
    weekKey: getWeekNumber(monday),
  };
}

// --- Variables globales ---

let offsetSemanal = 0;

const semanaActualInfo = getWeekWithOffset(0);
let semanaClave = semanaActualInfo.weekKey;

const spanSemana = document.getElementById("semana-actual");
const btnAnterior = document.getElementById("semana-anterior");
const btnSiguiente = document.getElementById("semana-siguiente");

const ulTareasFijas = document.getElementById("tareas-fijas");
const ulTareasPersonales = document.getElementById("tareas-personales");
const formPersonal = document.getElementById("form-personal");
const inputTarea = document.getElementById("tarea-input");

const resumenClasesDiv = document.getElementById("resumen-clases");

const btnModo = document.getElementById("modo-toggle");

const textareaResumenPersonal = document.getElementById("txtResumenPersonal");
const btnGuardarResumen = document.getElementById("btnGuardarResumen");
const resumenRenderizado = document.createElement("div");
const btnEditarResumen = document.createElement("button");
const btnEliminarResumen = document.createElement("button");

const resumenContainer = document.getElementById("resumen-clases-personal");
resumenContainer.appendChild(resumenRenderizado);

// --- Tareas personales ---

function getStorageKey() {
  return `tareas-personales-semana-${semanaClave}`;
}

function obtenerColorPorEtiqueta(etiqueta) {
  const colores = {
    estudiar: "#1e88e5", // Azul
    clase: "#8e24aa", // Violeta
    entregar: "#f9a825", // Amarillo oscuro
    importante: "#fb8c00", // Naranja
    urgente: "#e53935", // Rojo fuerte
  };

  return colores[etiqueta?.toLowerCase()] || "#9e9e9e"; // Gris por defecto
}

function renderTareasPersonales() {
  ulTareasPersonales.innerHTML = "";
  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];

  if (tareas.length === 0) {
    ulTareasPersonales.innerHTML =
      "<li>No tienes tareas personales para esta semana.</li>";
  } else {
    tareas.forEach((tarea, i) => {
      const colorEtiqueta = obtenerColorPorEtiqueta(tarea.etiqueta);

      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.flexDirection = "column";
      li.style.justifyContent = "flex-start";
      li.style.alignItems = "flex-start";
      li.style.padding = "12px";
      li.style.borderBottom = "1px solid #ccc";
      li.style.borderLeft = `6px solid ${colorEtiqueta}`;
      li.style.gap = "8px";
      li.style.borderRadius = "6px";

      // Etiqueta completada
      const etiquetaCompletada = tarea.completada
        ? `<span style="
             background-color: #4caf50;
             color: black;
             font-weight: 800;
             padding: .3rem .6rem;
             border-radius: 4px;
             font-size: 1rem;
             user-select: none;
           ">Completada</span>`
        : "";

      // Etiqueta personalizada
      const etiquetaTexto = tarea.etiqueta
        ? `<span style="
             background-color: ${colorEtiqueta};
             color: black;
             font-weight: 800;
             padding: .3rem .6rem;
             border-radius: 4px;
             font-size: 1rem;
             user-select: none;
           ">${tarea.etiqueta}</span>`
        : "";

      // Campo principal (texto de la tarea)
      const contenidoTareaHTML = `
        <div style="width: 100%;">
          <div id="tarea-texto-${i}" style="margin-bottom: 1rem;">
            <strong>${tarea.texto}</strong>
            ${
              tarea.enlace
                ? `<br><a href="${tarea.enlace}" target="_blank" style="font-size:0.9em;">🔗 Material extra</a>`
                : ""
            }
          </div>
          ${etiquetaTexto} ${etiquetaCompletada}
          <input id="tarea-edit-${i}" type="text" value="${tarea.texto}" 
            style="display:none; width:90%; padding: 6px; font-size: 1rem; box-sizing: border-box;">
          <input id="enlace-edit-${i}" type="text" value="${
        tarea.enlace || ""
      }" 
            placeholder="Editar enlace (opcional)" 
            style="display:none; width:100%; padding: 6px; font-size: 0.95rem; margin-top:4px; box-sizing: border-box;">
        </div>
      `;

      // Botones de acciones y checkbox
      const accionesHTML = `
        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <button onclick="editarTareaPersonal(${i})" style="cursor:pointer;">✏️</button>
          <button id="guardar-tarea-${i}" onclick="guardarEdicionTareaPersonal(${i})" style="display:none; cursor:pointer;">💾</button>
          <button onclick="eliminarTareaPersonal(${i})" style="cursor:pointer;">🗑️</button>
          <label class="checkbox-container" title="Marcar tarea como realizada">
            <input type="checkbox" id="check-${i}" ${
        tarea.completada ? "checked" : ""
      }/>
            <span class="checkmark"></span>
          </label>
        </div>
      `;

      li.innerHTML = contenidoTareaHTML + accionesHTML;
      ulTareasPersonales.appendChild(li);

      document.getElementById(`check-${i}`).addEventListener("change", (e) => {
        toggleCompletada(i, e.target.checked);
      });
    });
  }
}

// ✅ Nueva forma de agregar tarea personal con etiqueta y enlace
function agregarTareaPersonalConEtiqueta() {
  const input = document.getElementById("inputTareaPersonal");
  const selectEtiqueta = document.getElementById("selectEtiquetaPersonal");
  const inputEnlace = document.getElementById("inputEnlacePersonal");

  if (!input || !selectEtiqueta) {
    console.error("Faltan elementos del DOM");
    return;
  }

  const texto = input.value.trim();
  const etiqueta = selectEtiqueta.value;
  const enlace = inputEnlace ? inputEnlace.value.trim() : "";

  if (!texto) return;

  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  tareas.push({ texto, etiqueta, enlace, completada: false });
  localStorage.setItem(getStorageKey(), JSON.stringify(tareas));

  input.value = "";
  selectEtiqueta.value = "";
  if (inputEnlace) inputEnlace.value = "";

  renderTareasPersonales();
}

// ✅ Captura del evento submit del formulario
document
  .getElementById("form-personal")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    agregarTareaPersonalConEtiqueta();
  });

function toggleCompletada(index, completada) {
  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  if (tareas[index]) {
    tareas[index].completada = completada;
    localStorage.setItem(getStorageKey(), JSON.stringify(tareas));
    renderTareasPersonales();
  }
}

function eliminarTareaPersonal(index) {
  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  tareas.splice(index, 1);
  localStorage.setItem(getStorageKey(), JSON.stringify(tareas));
  renderTareasPersonales();
}

function editarTareaPersonal(index) {
  const texto = document.getElementById(`tarea-texto-${index}`);
  const inputTexto = document.getElementById(`tarea-edit-${index}`);
  const inputEnlace = document.getElementById(`enlace-edit-${index}`);
  const btnGuardar = document.getElementById(`guardar-tarea-${index}`);

  if (texto && inputTexto && inputEnlace && btnGuardar) {
    texto.style.display = "none";
    inputTexto.style.display = "inline-block";
    inputEnlace.style.display = "inline-block";
    btnGuardar.style.display = "inline-block";
    inputTexto.focus();
  }
}

function guardarEdicionTareaPersonal(index) {
  const inputTexto = document.getElementById(`tarea-edit-${index}`);
  const inputEnlace = document.getElementById(`enlace-edit-${index}`);
  if (!inputTexto || !inputEnlace) return;

  const nuevoTexto = inputTexto.value.trim();
  const nuevoEnlace = inputEnlace.value.trim();

  if (!nuevoTexto) return;

  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  tareas[index].texto = nuevoTexto;
  tareas[index].enlace = nuevoEnlace;

  localStorage.setItem(getStorageKey(), JSON.stringify(tareas));
  renderTareasPersonales();
}

// --- Resumen personal ---
const coloresPorMateria = {
  "Modelos de Negocios": "#ff8a65",
  "Gestión de Software I": "#9575cd",
  Matemática: "#4fc3f7",
  "Análisis de Sistemas Organizacionales": "#81c784",
  Comunicación: "#f06292",
  "Psicosociología de las Organizaciones": "#ba68c8",
  "Arquitectura de las Computadoras": "#aed581",
  "Inglés Técnico I": "#7986cb",
};

function getStorageKeyResumenPersonal() {
  return `resumen-personal-semana-${semanaClave}`;
}

// Convierte texto con guiones o asteriscos en listas HTML
function formatearTextoComoLista(texto) {
  const lineas = texto.split("\n").map((linea) => linea.trim());
  const esLista = lineas.every((linea) => /^[-*●]/.test(linea));

  if (esLista) {
    return `<ul>${lineas
      .map((linea) => `<li>${linea.replace(/^[-*●]\s*/, "")}</li>`)
      .join("")}</ul>`;
  }
  return texto.replace(/\n/g, "<br>");
}

function cargarResumenPersonal() {
  const contenedor = document.getElementById("resumenPersonal");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  let entradas = [];
  try {
    entradas = JSON.parse(
      localStorage.getItem(getStorageKeyResumenPersonal()) || "[]"
    );
  } catch (e) {
    console.error("Error al parsear JSON del resumen personal:", e);
    localStorage.removeItem(getStorageKeyResumenPersonal());
  }

  if (entradas.length === 0) {
    contenedor.innerHTML = "<p>No hay entradas aún.</p>";
    return;
  }

  entradas.forEach((entrada) => {
    const div = document.createElement("div");
    div.className = "entrada-resumen";
    div.style.border = "1px solid #ccc";
    div.style.marginBottom = "10px";
    div.style.padding = "10px";

    const textoFormateado = formatearTextoComoLista(entrada.texto);

    div.innerHTML = `
      <p><strong>📌 ${entrada.fecha}</strong></p>
      ${
        entrada.materia
          ? `<span style="background:${entrada.color}; color:black; font-weight:bold; padding: .5rem; border-radius:6px; border: 2px solid black;margin: 1rem .5rem; font-size:0.9rem;">
              ${entrada.materia}
            </span>`
          : ""
      }
      <div id="texto-${
        entrada.id
      }" style="margin-top: 0.5rem;">${textoFormateado}</div>
      ${
        entrada.enlace
          ? `<p><a href="${entrada.enlace}" target="_blank">🔗 Enlace relacionado</a></p>`
          : ""
      }
      <textarea id="edit-${
        entrada.id
      }" style="display:none; width:90%; background:#333; color:white; margin: 1rem auto;">${
      entrada.texto
    }</textarea>
      <button onclick="editarEntrada('${entrada.id}')">✏️ Editar</button>
      <button id="guardar-${entrada.id}" onclick="guardarEdicion('${
      entrada.id
    }')" style="display:none;">💾 Guardar</button>
      <button onclick="eliminarEntrada('${entrada.id}')">🗑️ Eliminar</button>
    `;

    contenedor.appendChild(div);
  });
}

const materiaSelect = document.getElementById("materiaResumen");
const colorPreview = document.getElementById("colorPreview");
materiaSelect?.addEventListener("change", () => {
  const materia = materiaSelect.value;
  const color = coloresPorMateria[materia] || "#ccc";
  colorPreview.style.backgroundColor = color;
});

btnGuardarResumen?.addEventListener("click", () => {
  const textareaResumen = document.getElementById("txtResumenPersonal");
  const enlaceResumen = document.getElementById("enlaceResumen");
  const textoNuevo = textareaResumen.value.trim();
  const enlace = enlaceResumen.value.trim();

  if (!textoNuevo) return;

  const materiaSeleccionada = materiaSelect?.value || "Sin materia";
  const colorAsociado = coloresPorMateria[materiaSeleccionada] || "#ccc";

  const fechaHoy = new Date();
  const dia = String(fechaHoy.getDate()).padStart(2, "0");
  const mes = String(fechaHoy.getMonth() + 1).padStart(2, "0");
  const año = fechaHoy.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${año}`;

  const entradas = JSON.parse(
    localStorage.getItem(getStorageKeyResumenPersonal()) || "[]"
  );

  const nuevaEntrada = {
    id: Date.now().toString(),
    fecha: fechaFormateada,
    texto: textoNuevo,
    materia: materiaSeleccionada,
    color: colorAsociado,
    enlace: enlace || null,
  };

  entradas.push(nuevaEntrada);
  localStorage.setItem(
    getStorageKeyResumenPersonal(),
    JSON.stringify(entradas)
  );

  textareaResumen.value = "";
  enlaceResumen.value = "";
  materiaSelect.value = "";
  colorPreview.style.backgroundColor = "#ccc";

  cargarResumenPersonal();
});

function editarEntrada(id) {
  const texto = document.getElementById(`texto-${id}`);
  const textarea = document.getElementById(`edit-${id}`);
  const botonGuardar = document.getElementById(`guardar-${id}`);

  if (texto && textarea && botonGuardar) {
    texto.style.display = "none";
    textarea.style.display = "block";
    botonGuardar.style.display = "inline-block";
  }
}

function guardarEdicion(id) {
  const textarea = document.getElementById(`edit-${id}`);
  if (!textarea) return;

  const nuevoTexto = textarea.value.trim();
  if (!nuevoTexto) return;

  const entradas = JSON.parse(
    localStorage.getItem(getStorageKeyResumenPersonal()) || "[]"
  );
  const entrada = entradas.find((e) => e.id === id);

  if (entrada) {
    entrada.texto = nuevoTexto;
    localStorage.setItem(
      getStorageKeyResumenPersonal(),
      JSON.stringify(entradas)
    );
    cargarResumenPersonal();
  }
}

function eliminarEntrada(id) {
  let entradas = JSON.parse(
    localStorage.getItem(getStorageKeyResumenPersonal()) || "[]"
  );
  entradas = entradas.filter((e) => e.id !== id);
  localStorage.setItem(
    getStorageKeyResumenPersonal(),
    JSON.stringify(entradas)
  );
  cargarResumenPersonal();
}

// --- Sección Exámenes ---
function formatearFecha(fechaISO) {
  const [año, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${año}`;
}

function getStorageKeyExamenes() {
  return "registro-examenes";
}

let idEnEdicion = null;

document.addEventListener("DOMContentLoaded", () => {
  cargarExamenes();
});

// Guardar examen (nuevo o editado)
document.getElementById("btnGuardarExamen").addEventListener("click", () => {
  const materia = document.getElementById("examenMateria").value;
  const fecha = document.getElementById("examenFecha").value;
  const contenido = document.getElementById("examenContenido").value.trim();
  const nota = document.getElementById("examenNota").value;
  const recuperatorio = document.getElementById("examenRecuperatorio").value;
  const estado = document.getElementById("examenEstado").value;
  const temas = document.getElementById("examenTemas").value;
  const mejoras = document.getElementById("examenMejoras").value;

  if (!materia || !fecha || !contenido || !estado) {
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }

  const examen = {
    id: idEnEdicion || Date.now().toString(),
    materia,
    fecha,
    contenido,
    nota,
    recuperatorio,
    estado,
    temas,
    mejoras,
  };

  let examenes = JSON.parse(
    localStorage.getItem(getStorageKeyExamenes()) || "[]"
  );

  if (idEnEdicion) {
    examenes = examenes.map((e) => (e.id === idEnEdicion ? examen : e));
    mostrarMensaje("✅ Examen editado con éxito");
  } else {
    examenes.push(examen);
    mostrarMensaje("✅ Examen guardado con éxito");
  }

  localStorage.setItem(getStorageKeyExamenes(), JSON.stringify(examenes));
  limpiarFormularioExamen();
  cargarExamenes();
  idEnEdicion = null;
});

function emojiEstado(estado) {
  switch (estado.toLowerCase()) {
    case "aprobado":
      return "✅";
    case "desaprobado":
      return "❌";
    case "pendiente":
      return "⏳";
    default:
      return "❔";
  }
}
// Cargar exámenes desde localStorage y renderizarlos
function cargarExamenes() {
  const contenedor = document.getElementById("listaExamenes");
  contenedor.innerHTML = "";

  const examenes = JSON.parse(
    localStorage.getItem(getStorageKeyExamenes()) || "[]"
  );

  if (examenes.length === 0) {
    contenedor.innerHTML = "<p>No hay exámenes registrados.</p>";
    return;
  }

  examenes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  examenes.forEach((examen) => {
    let claseEstadoCard = "";

    switch (examen.estado.toLowerCase()) {
      case "pendiente":
        claseEstadoCard = "estado-pendiente";
        break;
      case "aprobado":
        claseEstadoCard = "estado-aprobado";
        break;
      case "desaprobado":
        claseEstadoCard = "estado-desaprobado";
        break;
      default:
        claseEstadoCard = "estado-indefinido";
    }

    const card = document.createElement("div");
    card.className = "card-examen";
    card.classList.add(claseEstadoCard);
    card.setAttribute("data-materia", examen.materia);
    const fechaFormateada = formatearFecha(examen.fecha);
    card.innerHTML = `
      <div class="card-examen-header">
        <h2>${examen.materia}</h2>
        <p><strong>📅 Fecha:</strong> ${fechaFormateada}</p>
        <p><strong>📚 Contenido:</strong> ${examen.contenido}</p>
        <p><strong>📝 Nota:</strong> ${examen.nota || "Sin nota"}</p>
        <p><strong>♻️ Recuperatorio:</strong> ${
          examen.recuperatorio || "No definido"
        }</p>
        <p><strong>📌 Estado:</strong> ${emojiEstado(examen.estado)} ${examen.estado}</p>
        <div class="acciones">
          <button class="editar" onclick="editarExamen('${
            examen.id
          }')">✏️ Editar</button>
          <button class="eliminar" onclick="eliminarExamen('${
            examen.id
          }')">🗑️ Eliminar</button>
        </div>
      </div>
      <div class="temas">
        <h3>Temas y mejoras</h3>
        <p><strong>🗂️ Temas:</strong> ${examen.temas || "No definidos"}</p>
        <p><strong>🔧 Mejoras:</strong> ${examen.mejoras || "No definidas"}</p>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

function eliminarExamen(id) {
  if (!confirm("¿Seguro que querés eliminar este examen?")) return;

  let examenes = JSON.parse(
    localStorage.getItem(getStorageKeyExamenes()) || "[]"
  );
  examenes = examenes.filter((examen) => examen.id !== id);
  localStorage.setItem(getStorageKeyExamenes(), JSON.stringify(examenes));
  cargarExamenes();
}

function editarExamen(id) {
  const examenes = JSON.parse(
    localStorage.getItem(getStorageKeyExamenes()) || "[]"
  );
  const examen = examenes.find((e) => e.id === id);
  if (!examen) return;

  idEnEdicion = id;

  document.getElementById("examenMateria").value = examen.materia;
  document.getElementById("examenFecha").value = examen.fecha;
  document.getElementById("examenContenido").value = examen.contenido;
  document.getElementById("examenNota").value = examen.nota;
  document.getElementById("examenRecuperatorio").value = examen.recuperatorio;
  document.getElementById("examenEstado").value = examen.estado;
  document.getElementById("examenTemas").value = examen.temas || "";
  document.getElementById("examenMejoras").value = examen.mejoras || "";

  // Scroll al formulario para mejorar UX
  document
    .getElementById("formExamen")
    .scrollIntoView({ behavior: "smooth", block: "start" });

  // Poner foco en el primer campo
  document.getElementById("examenFecha").focus();
}

function limpiarFormularioExamen() {
  document.getElementById("examenMateria").value = "";
  document.getElementById("examenFecha").value = "";
  document.getElementById("examenContenido").value = "";
  document.getElementById("examenNota").value = "";
  document.getElementById("examenRecuperatorio").value = "";
  document.getElementById("examenEstado").value = "";
  document.getElementById("examenTemas").value = "";
  document.getElementById("examenMejoras").value = "";
  idEnEdicion = null;
}

// Mostrar cartel de éxito
function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensajeExamen");
  mensaje.textContent = texto;
  mensaje.style.display = "block";

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
}

// --- Tareas fijas ---
// Esta función procesa la lista de tareas fijas y las organiza por día
function procesarTareasConDia(lista) {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const tareasProcesadas = [];

  let diaActual = "";

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    if (dias.includes(item)) {
      diaActual = item;
    } else {
      tareasProcesadas.push({
        texto: item,
        dia: diaActual,
      });
    }
  }

  return tareasProcesadas;
}
function colorPorDia(dia) {
  const colores = {
    lunes: "#1976d2", // Azul
    martes: "#388e3c", // Verde
    miércoles: "#fbc02d", // Amarillo
    jueves: "#8e24aa", // Violeta
    viernes: "#fb2500", // Rojo
  };
  return colores[dia?.toLowerCase()] || "#9e9e9e";
}

// --- Renderizado general ---
function renderSemana() {
  const { label, weekKey } = getWeekWithOffset(offsetSemanal);
  semanaClave = weekKey;
  spanSemana.innerHTML = label;

  // Render tareas fijas
  ulTareasFijas.innerHTML = "";

  const tareasCrudas = tareasPorSemana[semanaClave] || [];
  const tareasConDia = procesarTareasConDia(tareasCrudas);

  if (tareasConDia.length === 0) {
    ulTareasFijas.innerHTML =
      "<li>No hay tareas fijadas para esta semana.</li>";
  } else {
    tareasConDia.forEach((tarea) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.flexDirection = "column";
      li.style.alignItems = "flex-start";
      li.style.gap = "4px";
      li.style.padding = "10px";
      li.style.borderBottom = "1px solid #ccc";

      // Etiqueta visual del día
      const spanDia = document.createElement("span");
      spanDia.textContent = tarea.dia;
      spanDia.style.backgroundColor = colorPorDia(tarea.dia);
      spanDia.style.color = "white";
      spanDia.style.fontWeight = "600";
      spanDia.style.fontSize = "0.8rem";
      spanDia.style.padding = "0.3rem 0.6rem";
      spanDia.style.borderRadius = "4px";

      // Texto de la tarea
      const spanTexto = document.createElement("span");
      spanTexto.innerHTML = `<strong>${tarea.texto}</strong>`;

      li.appendChild(spanDia);
      li.appendChild(spanTexto);
      ulTareasFijas.appendChild(li);
    });
  }

  // Render resumen clases oficiales
  resumenClasesDiv.innerHTML = "";
  const resumenSemana = resumenClasesPorSemana[semanaClave] || {};

  if (Object.keys(resumenSemana).length === 0) {
    resumenClasesDiv.textContent = "No hay resumen de clases para esta semana.";
  } else {
    for (const materia in resumenSemana) {
      const datosMateria = resumenSemana[materia];
      const divMat = document.createElement("div");
      divMat.className = "materia";
      divMat.style.marginBottom = "1rem";
      divMat.style.border = "1px solid #ddd";
      divMat.style.padding = "1rem";
      divMat.style.borderRadius = "8px";

      // Lista de temas con íconos
      const listaTemas = datosMateria.temas
        .map((tema) => `<li>📘 ${tema}</li>`)
        .join("");

      // Enlace si existe
      const enlaceHTML = datosMateria.enlace
        ? `<a href="${datosMateria.enlace}" target="_blank" style="color: #007BFF;">🔗 Ver material adicional</a>`
        : `<em style="color: #999;">Sin material externo</em>`;

      // Render HTML
      divMat.innerHTML = `
      <strong class="materia-strong" style="font-size: 1.1rem;">${materia}</strong>
      <ul style="padding-left: 20px; margin-top: 0.5rem;">${listaTemas}</ul>
      <div style="margin-top: 0.5rem;">${enlaceHTML}</div>
    `;

      resumenClasesDiv.appendChild(divMat);
    }
  }

  // Cargar resumen personal
  cargarResumenPersonal();

  // Render tareas personales
  renderTareasPersonales();
}

// --- Eventos botones ---

btnAnterior.onclick = () => {
  offsetSemanal--;
  renderSemana();
};

btnSiguiente.onclick = () => {
  offsetSemanal++;
  renderSemana();
};

formPersonal.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarTareaPersonal(inputTarea.value);
  inputTarea.value = "";
  inputTarea.focus();
});

// --- Modo oscuro ---

function setModo(modo) {
  if (modo === "dark") {
    document.documentElement.setAttribute("data-modo", "dark");
    btnModo.textContent = "🌞";
    localStorage.setItem("modo-oscuro", "dark");
  } else {
    document.documentElement.removeAttribute("data-modo");
    btnModo.textContent = "🌙";
    localStorage.setItem("modo-oscuro", "light");
  }
}

btnModo.onclick = () => {
  const modoActual = document.documentElement.getAttribute("data-modo");
  if (modoActual === "dark") {
    setModo("light");
  } else {
    setModo("dark");
  }
};

// --- Inicialización ---

window.onload = () => {
  const modoGuardado = localStorage.getItem("modo-oscuro") || "light";
  setModo(modoGuardado);
  renderSemana();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then((reg) => {
    if (reg.waiting) {
      // Ya hay un nuevo SW esperando activarse
      notifyUpdate(reg.waiting);
    }

    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          notifyUpdate(newWorker);
        }
      });
    });
  });

  // Recargar si el nuevo SW tomó control
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}
function notifyUpdate(worker) {
  // Asegurarse que el body existe (en caso que se llame muy pronto)
  if (!document.body) {
    document.addEventListener("DOMContentLoaded", () => notifyUpdate(worker));
    return;
  }

  const updateBanner = document.createElement("div");
  updateBanner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #0d47a1;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      font-family: sans-serif;
    ">
      🔄 ¡Nueva versión disponible!
      <button id="btnUpdate" style="
        margin-left: 10px;
        padding: 5px 10px;
        border: none;
        background: #ffffff;
        color: #0d47a1;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
      ">Actualizar</button>
    </div>
  `;
  document.body.appendChild(updateBanner);

  document.getElementById("btnUpdate").addEventListener("click", () => {
    worker.postMessage("SKIP_WAITING");
  });
}
