# 🛒 E-Commerce Integrador — Front-End (Angular 22)

Aplicación web desarrollada como Trabajo Práctico Integrador para la materia de **Front-End** en el **IFTS Nro. 11**.

---

## 👥 Equipo de Desarrollo
* Gabriel Vega
* **Cristian Manuel Landeira**
* Álvaro Álvarez Porcel
* Rodrigo Alejandro Darena
* *(Quinto integrante)*

---

## 🎯 Objetivo del Proyecto
Desarrollar una tienda online dinámica consumiendo una API externa (`DummyJSON Products`), implementando enrutamiento avanzado, formularios reactivos, manejo de errores robusto, componentes modulares y un estricto control de versiones colaborativo mediante Git y GitHub.

---

## 📋 Requisitos y Trazabilidad (Checklist)

| Módulo / Requerimiento de la Cátedra | Estado | Descripción Técnica / Implementación |
| :--- | :---: | :--- |
| **1. Arquitectura Base** (Angular 19+) | ✔ Completado | Estructura modular basada en componentes, servicios, páginas e interfaces. |
| **2. Navegación** (Enrutamiento) | ⏳ Pendiente | Navegación fluida entre el catálogo, la vista de detalle y una ruta comodín (`**`) para 404. |
| **3. Conexión de Datos** (Consumo de API) | ⏳ Pendiente | Servicios centralizados y tipados estrictamente con TypeScript (cero `any`). |
| **4. Interacción** (Formularios Reactivos) | ⏳ Pendiente | Validaciones síncronas para la simulación de compra y contacto de usuarios. |
| **5. Calidad** (Manejo de Errores) | ⏳ Pendiente | Captura de excepciones mediante `catchError` y feedback visual en interfaz. |

---

## 🛠️ Guía de Buenas Prácticas y Convenciones del Equipo

* **Convenciones de Nomenclatura:** 
  * Archivos en `kebab-case`.
  * Servicios con el sufijo `.service.ts`.
  * Interfaces ubicadas en la carpeta `/interfaces`.
* **Separación de Responsabilidades:** Prohibido el uso de `HttpClient` dentro de los componentes; toda comunicación pasa exclusivamente a través de los Servicios.
* **Control de Versiones y Commits:** Uso obligatorio de commits atómicos y descriptivos utilizando prefijos estándar:
  * `feat:` para nuevas funcionalidades (ej. `feat: agrega servicio de productos`).
  * `fix:` para corrección de errores (ej. `fix: corrige validación de email`).
  * `style:` para cambios visuales o de formato (ej. `style: ajusta estilos del catálogo`).
  * `docs:` para actualización de documentación (ej. `docs: actualiza avance en checklist por cierre de Sprint`).
* **Actualización por Sprint:** Al finalizar cada Sprint, es una buena práctica obligatoria actualizar el checklist de este README y documentar el avance mediante un commit con el prefijo `docs:`.
* **Pull Requests obligatorios:** Con revisión cruzada previa a la fusión en `main`.

---

## 🔀 Flujo de Trabajo Correcto en Git y GitHub

Para trabajar de forma colaborativa, organizada y evitar conflictos o pisar el código de los demás, el equipo sigue obligatoriamente este flujo:

1. **Actualizar la rama principal (`main`) antes de arrancar:**
   ```bash
   git checkout main && git pull origin main