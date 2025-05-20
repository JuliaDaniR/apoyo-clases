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

function renderTareasPersonales() {
  ulTareasPersonales.innerHTML = "";
  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];

  if (tareas.length === 0) {
    ulTareasPersonales.innerHTML =
      "<li>No tienes tareas personales para esta semana.</li>";
  } else {
    tareas.forEach((tarea, i) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.padding = "8px 12px";
      li.style.borderBottom = "1px solid #ccc";

      const etiquetaCompletada = tarea.completada
        ? `<span style="
             background-color: #4caf50;
             color: white;
             padding: 2px 6px;
             border-radius: 4px;
             font-size: 0.75rem;
             margin-left: 10px;
             user-select: none;
           ">Completada</span>`
        : "";

      const etiquetaTexto = tarea.etiqueta
        ? `<span style="
             background-color:rgb(243, 121, 33);
             color: white;
             padding: 2px 6px;
             border-radius: 4px;
             font-size: 0.75rem;
             margin-left: 10px;
             user-select: none;
           ">${tarea.etiqueta}</span>`
        : "";

      li.innerHTML = `
        <span id="tarea-texto-${i}" style="flex:1;">
          ${tarea.texto} ${etiquetaTexto} ${etiquetaCompletada}
        </span>
        <div style="display: flex; align-items: center; gap: 10px;">
            <input id="tarea-edit-${i}" type="text" value="${
        tarea.texto
      }" style="display:none; width:60%; flex:1; margin-left: 12px;">
          <button onclick="editarTareaPersonal(${i})" style="cursor:pointer;">✏️</button>
          <button id="guardar-tarea-${i}" onclick="guardarEdicionTareaPersonal(${i})" style="display:none; cursor:pointer;">💾</button>
          <button onclick="eliminarTareaPersonal(${i})" style="cursor:pointer;">🗑️</button>
          <label class="checkbox-container" title="Marcar tarea como realizada">
          <input type="checkbox" id="check-${i}" ${
        tarea.completada ? "checked" : ""
      } />
            <span class="checkmark"></span>
          </label>
        </div> `;

      ulTareasPersonales.appendChild(li);

      document.getElementById(`check-${i}`).addEventListener("change", (e) => {
        toggleCompletada(i, e.target.checked);
      });
    });
  }
}

// ✅ NUEVA forma de agregar tarea personal
function agregarTareaPersonalConEtiqueta() {
  const input = document.getElementById("inputTareaPersonal");
  const selectEtiqueta = document.getElementById("selectEtiquetaPersonal");

  if (!input || !selectEtiqueta) {
    console.error("Faltan elementos del DOM");
    return;
  }

  const texto = input.value.trim();
  const etiqueta = selectEtiqueta.value;

  if (!texto) return;

  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  tareas.push({ texto, etiqueta, completada: false });
  localStorage.setItem(getStorageKey(), JSON.stringify(tareas));

  input.value = "";
  selectEtiqueta.value = "";

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
  const input = document.getElementById(`tarea-edit-${index}`);
  const btnGuardar = document.getElementById(`guardar-tarea-${index}`);
  if (texto && input && btnGuardar) {
    texto.style.display = "none";
    input.style.display = "inline-block";
    btnGuardar.style.display = "inline-block";
    input.focus();
  }
}

function guardarEdicionTareaPersonal(index) {
  const input = document.getElementById(`tarea-edit-${index}`);
  if (!input) return;
  const nuevoTexto = input.value.trim();
  if (!nuevoTexto) return;

  const tareas = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  tareas[index].texto = nuevoTexto;

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
    entradas = [];
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

    div.innerHTML = `
      <p><strong>📌 ${entrada.fecha}</strong></p>
      ${
        entrada.materia
          ? `<span style="background:${entrada.color}; color:white; padding:2px 6px; border-radius:6px; font-size:0.9rem;">
              ${entrada.materia}
            </span>`
          : ""
      }
      <p id="texto-${entrada.id}" style="margin-top: 0.5rem;">${
      entrada.texto
    }</p>
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

// Mostrar color al seleccionar materia
const materiaSelect = document.getElementById("materiaResumen");
const colorPreview = document.getElementById("colorPreview");

materiaSelect?.addEventListener("change", () => {
  const materia = materiaSelect.value;
  const color = coloresPorMateria[materia] || "#ccc";
  colorPreview.style.backgroundColor = color;
});

// Guardar nuevo resumen personal
btnGuardarResumen?.addEventListener("click", () => {
  const textoNuevo = textareaResumenPersonal.value.trim();
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
  };

  entradas.push(nuevaEntrada);
  localStorage.setItem(
    getStorageKeyResumenPersonal(),
    JSON.stringify(entradas)
  );

  textareaResumenPersonal.value = "";
  materiaSelect.value = "";
  colorPreview.style.backgroundColor = "#ccc";

  cargarResumenPersonal();
});

// Eliminar todos los resúmenes de la semana
btnEliminarResumen?.addEventListener("click", () => {
  if (confirm("¿Querés borrar tu resumen personal de esta semana?")) {
    localStorage.removeItem(getStorageKeyResumenPersonal());
    cargarResumenPersonal();
  }
});

// Editar entrada existente
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

// Guardar edición de entrada
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

// Eliminar una entrada individual
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

  let examenes = JSON.parse(localStorage.getItem(getStorageKeyExamenes()) || "[]");

  if (idEnEdicion) {
    examenes = examenes.map((e) => e.id === idEnEdicion ? examen : e);
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

function cargarExamenes() {
  const contenedor = document.getElementById("listaExamenes");
  contenedor.innerHTML = "";

  const examenes = JSON.parse(localStorage.getItem(getStorageKeyExamenes()) || "[]");

  if (examenes.length === 0) {
    contenedor.innerHTML = "<p>No hay exámenes registrados.</p>";
    return;
  }

  examenes.forEach((examen) => {
    const card = document.createElement("div");
    card.className = "card-examen";
    card.setAttribute("data-materia", examen.materia);

    card.innerHTML = `
      <div class="card-examen-header">
        <h2>${examen.materia}</h2>
        <p><strong>📅 Fecha:</strong> ${examen.fecha}</p>
        <p><strong>📚 Contenido:</strong> ${examen.contenido}</p>
        <p><strong>📝 Nota:</strong> ${examen.nota || "Sin nota"}</p>
        <p><strong>♻️ Recuperatorio:</strong> ${examen.recuperatorio || "No definido"}</p>
        <p><strong>📌 Estado:</strong> ${examen.estado}</p>
        <div class="acciones">
          <button class="editar" onclick="editarExamen('${examen.id}')">✏️ Editar</button>
          <button class="eliminar" onclick="eliminarExamen('${examen.id}')">🗑️ Eliminar</button>
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

  let examenes = JSON.parse(localStorage.getItem(getStorageKeyExamenes()) || "[]");
  examenes = examenes.filter((examen) => examen.id !== id);
  localStorage.setItem(getStorageKeyExamenes(), JSON.stringify(examenes));
  cargarExamenes();
}

function editarExamen(id) {
  const examenes = JSON.parse(localStorage.getItem(getStorageKeyExamenes()) || "[]");
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
  document.getElementById("formExamen").scrollIntoView({ behavior: "smooth", block: "start" });

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

// --- Renderizado general ---

function renderSemana() {
  const { label, weekKey } = getWeekWithOffset(offsetSemanal);
  semanaClave = weekKey;
  spanSemana.innerHTML = label;

  // Render tareas fijas
  ulTareasFijas.innerHTML = "";
  const tareasFijas = tareasPorSemana[semanaClave] || [];
  if (tareasFijas.length === 0) {
    ulTareasFijas.innerHTML =
      "<li>No hay tareas fijadas para esta semana.</li>";
  } else {
    tareasFijas.forEach((tarea) => {
      const li = document.createElement("li");
      li.textContent = tarea;
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
      const divMat = document.createElement("div");
      divMat.className = "materia";
      divMat.innerHTML = `<strong class="materia-strong">${materia}</strong>${resumenSemana[materia]}`;
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
