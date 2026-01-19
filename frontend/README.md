# Frontend – Sistema de Reportes de Escasez de Agua

Este módulo corresponde al **frontend en React** del proyecto _DWP – Equipo 4_. Su propósito es demostrar la navegación funcional y accesible entre las diferentes pantallas del sistema, tanto para usuarios públicos como para administradores, sin aplicar estilos visuales, enfocándose únicamente en la estructura y la funcionalidad.

## 🛠️ Tecnologías

Las herramientas y librerías utilizadas en este módulo son:

[React 18] – Biblioteca principal para la construcción de la interfaz de usuario basada en componentes.
[Vite] – Herramienta de desarrollo y empaquetado para ejecutar un servidor local rápido y generar la versión de producción.
[React Router DOM] – Manejo de rutas para separar la navegación entre usuarios y administradores.
[Node.js 18+] – Entorno de ejecución para instalar dependencias, ejecutar Vite y compilar el proyecto.
[npm] – Gestor de paquetes para la instalación y administración de dependencias.

📁 Estructura
La estructura del frontend está organizada de forma modular para facilitar el mantenimiento, la escalabilidad y la integración con el backend:
frontend/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
├── main.jsx # Punto de entrada de la aplicación
├── App.jsx # Enrutador principal (usuarios / administrador)
├── components/ # Componentes reutilizables
│ ├── KeyboardNav.jsx # Navegación por teclado (flechas izquierda/derecha)
│ └── TextTabs.jsx # Barra de pestañas en texto para navegación accesible
├── routes/ # Definición de rutas por rol
│ ├── UserRoutes.jsx # Rutas del usuario
│ └── AdminRoutes.jsx # Rutas del administrador
└── pages/
├── user/ # Pantallas del usuario
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Home.jsx
│ ├── Reports.jsx
│ ├── Status.jsx
│ ├── Notifications.jsx
│ ├── Schedule.jsx
│ └── Tips.jsx
└── admin/ # Pantallas del administrador
├── AdminLogin.jsx
├── Dashboard.jsx
├── CrudSchedules.jsx
├── CrudAnnouncements.jsx
├── ManageReports.jsx
└── CrudTips.jsx

♿ Accesibilidad
El sistema fue diseñado para ser completamente funcional sin mouse:

- **TAB** → Navegar entre botones y campos
- **ENTER** → Activar botones
- **Flecha izquierda (⬅)** → Pantalla anterior
- **Flecha derecha (➡)** → Pantalla siguiente

Jerarquía de Prioridad del Tabulador cuando el usuario presiona **TAB**, el foco se mueve siguiendo esta jerarquía:

1. **Pestañas de navegación principal**
   Permiten cambiar de módulo (Inicio, Reportes, Status, Notificaciones, Horarios, Consejos, Dashboard, etc.)

2. **Campos de formulario primarios**
   Inputs obligatorios como usuario, contraseña, zona/colonia o título del anuncio

3. **Campos secundarios**
   Textareas, selectores o campos opcionales

4. **Botón de acción principal**
   Acciones clave como: Entrar, Enviar Reporte, Crear, Publicar o Guardar cambios

5. **Botones secundarios**
   Acciones complementarias como: Volver, Cancelar o Eliminar

▶️ Ejecución del Proyecto
Desde la carpeta `frontend/` ejecutar:

- **npm install**
- **npm run dev**

Luego abre en el navegador:

- Usuario: `http://localhost:5173/`
- Administrador: `http://localhost:5173/admin`

📌 Nota
Este frontend está desacoplado del backend y preparado para integrarse posteriormente mediante servicios REST o APIs, permitiendo que el desarrollo de ambos módulos de manera independiente.
