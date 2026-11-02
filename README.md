# 🛒 TP Integrador - E-Commerce (Angular 19)

Aplicación web desarrollada como Trabajo Práctico Integrador para la materia de Front-End en el **IFTS Nro. 11**. 

## 👥 Equipo de Desarrollo
* Gabriel Vega
* Cristian Manuel Landeira
* Álvaro Álvarez Porcel
* Rodrigo Alejandro Darena

---

## 🎯 Objetivo del Proyecto
Desarrollar una tienda online dinámica consumiendo una API externa (`DummyJSON Products`), implementando enrutamiento avanzado, formularios reactivos, manejo de errores robusto, componentes modulares y un estricto control de versiones colaborativo mediante Git y GitHub.

---

## 📋 Requisitos y Trazabilidad (Checklist)
| Módulo / Requerimiento de la Cátedra | Estado | Descripción Técnica / Implementación |
| :--- | :---: | :--- |
| **1. Arquitectura Base** (Angular 19+) | 🔄 En Proceso| Estructura modular basada en componentes, servicios, páginas e interfaces. |
| **2. Navegación** (Enrutamiento) | ⏳ Pendiente | Navegación fluida entre el catálogo, la vista de detalle y una ruta comodín (`**`) para 404. |
| **3. Conexión de Datos** (Consumo de API) | ⏳ Pendiente | Servicios centralizados y tipados estrictamente con TypeScript (cero `any`). |
| **4. Interacción** (Formularios Reactivos) | ⏳ Pendiente | Validaciones síncronas para la simulación de compra y contacto de usuarios. |
| **5. Calidad** (Manejo de Errores) | ⏳ Pendiente | Captura de excepciones mediante `catchError` y feedback visual en interfaz. |

---

## 🛠️ Guía de Buenas Prácticas y Convenciones del Equipo
1. **Convenciones de Nomenclatura:** Archivos en `kebab-case`, servicios con sufijo `.service.ts`, e interfaces ubicadas en la carpeta `/interfaces`.
2. **Separación de Responsabilidades:** Prohibido el uso de `HttpClient` dentro de los componentes; toda comunicación pasa exclusivamente a través de los Servicios.
3. **Control de Versiones y Commits:** 
   * Uso obligatorio de commits atómicos y descriptivos utilizando prefijos estándar:
     * `feat:` para nuevas funcionalidades (ej. `feat: agrega servicio de productos`).
     * `fix:` para corrección de errores (ej. `fix: corrige validación de email`).
     * `style:` para cambios visuales o de formato (ej. `style: ajusta estilos del catálogo`).
     * `docs:` **para actualización de documentación (ej. `docs: actualiza avance en checklist por cierre de Sprint`).**
   * **Actualización por Sprint:** Al finalizar cada Sprint, es una buena práctica obligatoria actualizar el checklist de este README y documentar el avance mediante un commit con el prefijo `docs:`.
   * Pull Requests obligatorios con revisión cruzada previa a la fusión en `main`.
---

🔀 Flujo de trabajo correcto en Git y GitHub
Para trabajar de forma colaborativa, organizada y evitar conflictos o pisar el código de los demás, el equipo sigue obligatoriamente este flujo:

Actualizar la rama principal (main) antes de arrancar:
Bash
git checkout main && git pull origin main

Crear una rama independiente para tu tarea (prohibido programar directo en main):
Bash
git checkout -b feature/nombre-de-la-tarea

Guardar cambios con commits atómicos y descriptivos:
Bash
git add .
git commit -m "feat: descripción clara de lo que hiciste"
Subir tu rama al repositorio remoto:

Bash
git push origin feature/nombre-de-la-tarea
Integración: Ir a GitHub, abrir un Pull Request hacia main y esperar la revisión cruzada de un compañero antes de fusionarlo.

## 🚀 Instrucciones de Instalación y Ejecución Local
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio-integrador.git
   ```
2. **Entrar al directorio del proyecto:**
   ```bash
   cd nombre-del-repositorio
   ```
3. **Instalar las dependencias:**
   ```bash
   npm install
   ```
4. **Ejecutar el servidor de desarrollo:**
   ```bash
   ng serve
   ```
5. **Abrir en el navegador:** Ingresá a `http://localhost:4200/`.
