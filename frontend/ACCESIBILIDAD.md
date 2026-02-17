# 📋 Estados Accesibles Documentados – Frontend

Documento que describe todos los **estados accesibles, atributos ARIA, jerarquía de navegación y combinaciones de teclas** implementadas en el frontend para garantizar una experiencia inclusiva.

---

## Índice

1. [Atributos ARIA Implementados](#atributos-aria-implementados)
2. [Estados de Enfoque por Componente](#estados-de-enfoque-por-componente)
3. [Combinaciones de Teclado Soportadas](#combinaciones-de-teclado-soportadas)
4. [Jerarquía de Navegación](#jerarquía-de-navegación)
5. [Roles ARIA Utilizados](#roles-aria-utilizados)

---

## Atributos ARIA Implementados

### 1. `aria-invalid` y `aria-describedby`
**Ubicación**: [Register.jsx](src/pages/user/Register.jsx), [AdminLogin.jsx](src/pages/admin/AdminLogin.jsx)

```jsx
aria-invalid={!!errors.nombre}
aria-describedby={errors.nombre ? "nombre-error" : undefined}
```

**Propósito**: Comunica a lectores de pantalla cuando un campo tiene error y vincula el campo con el mensaje de error.

**Estados**:
- `aria-invalid="true"` → Campo con error
- `aria-invalid="false"` → Campo válido

---

### 2. `aria-live` y `role="alert"`
**Ubicación**: [Register.jsx](src/pages/user/Register.jsx), [AdminLogin.jsx](src/pages/admin/AdminLogin.jsx), [Login.jsx](src/pages/user/Login.jsx)

```jsx
<div role="alert" aria-live="assertive">
  {mensaje}
</div>
```

**Propósito**: Los mensajes de error/éxito se anuncian automáticamente a lectores de pantalla.

**Valores de `aria-live`**:
- `assertive` → Interrumpe lectura actual (errores críticos)
- `polite` → Espera a que termine de hablar (notificaciones)

---

### 3. `aria-busy`
**Ubicación**: [AdminLogin.jsx](src/pages/admin/AdminLogin.jsx)

```jsx
<div className="admin-login-card" aria-busy={loading}>
```

**Propósito**: Indica que el componente está procesando cuando el usuario hace login.

**Estados**:
- `aria-busy="true"` → Cargando
- `aria-busy="false"` → Listo

---

### 4. `aria-current="page"`
**Ubicación**: [AdminNavbar.jsx](src/components/AdminNavbar.jsx), [Breadcrumbs.jsx](src/components/Breadcrumbs.jsx)

```jsx
<NavLink
  to="/admin/dashboard"
  aria-current={location.pathname.startsWith("/admin/dashboard") ? "page" : undefined}
>
  Panel
</NavLink>
```

**Propósito**: Marca la página actual en navegación.

**Estados**:
- `aria-current="page"` → Página actual
- `undefined` → Página no actual

---

### 5. `aria-hidden="true"`
**Ubicación**: [Breadcrumbs.jsx](src/components/Breadcrumbs.jsx)

```jsx
<span aria-hidden="true"> / </span>
```

**Propósito**: Oculta separadores visuales de lectores de pantalla (evita repetición).

---

### 6. `aria-label` y `aria-labelledby`
**Ubicación**: [NotFound.jsx](src/pages/errors/NotFound.jsx), [ServerError.jsx](src/pages/errors/ServerError.jsx)

```jsx
<main role="alert" aria-labelledby="title-404">
  <h1 id="title-404">404 — Página no encontrada</h1>
```

**Propósito**: 
- `aria-labelledby` → Vincula el main con su título
- Los lectores de pantalla leen: "Alerta: 404 — Página no encontrada"

---

### 7. `aria-haspopup` y `aria-expanded`
**Ubicación**: [MenuAdmin.jsx](src/components/MenuAdmin.jsx)

```jsx
<button
  id="admin-toggle"
  aria-haspopup="menu"
  aria-expanded={mostrarMenu}
  aria-controls="admin-menu"
  onClick={() => setMostrarMenu((prev) => !prev)}
>
  ADMIN
</button>
```

**Propósito**: Comunica que el botón abre/cierra un menú desplegable.

**Estados**:
- `aria-expanded="true"` → Menú abierto
- `aria-expanded="false"` → Menú cerrado

---

### 8. `role="menu"` y `role="menuitem"`
**Ubicación**: [MenuAdmin.jsx](src/components/MenuAdmin.jsx)

```jsx
<div id="admin-menu" role="menu" aria-labelledby="admin-toggle">
  <button style={{...}}>Mi perfil</button>
```

**Propósito**: Define estructura de menú para lectores de pantalla.

---

### 9. `aria-label="Navegación principal"`
**Ubicación**: [AdminNavbar.jsx](src/components/AdminNavbar.jsx), [UserNavbar.jsx](src/components/UserNavbar.jsx)

```jsx
<nav aria-label="Navegación principal del administrador" role="navigation">
```

**Propósito**: Etiqueta la región de navegación.

---

## Estados de Enfoque por Componente

### **UserNavbar.jsx** - Navegación de Usuario
```
Estado: Listo
├─ Elemento enfocable: NavLink "Inicio"
├─ Orden TAB: 1. Avatar → 2. Login → 3. Inicio → 4. Reportes → ... → 5. Consejos
└─ Focus visible: Outline amarillo (3px, offset 2px)

Distribución del enfoque:
┌─────────────────────────────────────────────┐
│ [Avatar] [Login] │ Inicio │ Reportes │ ...  │
└─────────────────────────────────────────────┘
```

**Estilos CSS aplicados**:
```css
.nav-pill:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}

.nav-pill.active {
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
}
```

---

### **AdminNavbar.jsx** - Navegación Admin
```
Estado: Listo
├─ Elementos enfocables: NavLink Panel, Reportes, Avisos, Horarios, Consejos
├─ Orden TAB: Izquierda a Derecha (5 elementos)
└─ Focus visible: Outline amarillo + cambio de color
```

---

### **MenuAdmin.jsx** - Menú Desplegable
```
Estado: Abierto/Cerrado
├─ Abierto (aria-expanded="true"):
│  ├─ Primer elemento: Mi perfil (enfoque automático)
│  ├─ Elementos: Mi perfil → Configuración → Cerrar sesión
│  └─ Navegación: ↑/↓ entre opciones, ESC para cerrar
│
└─ Cerrado (aria-expanded="false"):
   └─ Botón ADMIN vuelve al foco
```

**Flujo de enfoque**:
```
[ADMIN] → Click → [Mi perfil] → ↓ → [Configuración] → ↓ → [Cerrar sesión]
  ↑ ← ESC para cerrar
```

---

### **Formularios** - Register.jsx, AdminLogin.jsx
```
Estado: Válido / Inválido
├─ Input normal:
│  ├─ border: 1px solid #d1d5db
│  ├─ outline: 3px solid #f59e0b (on focus)
│  └─ aria-invalid="false"
│
├─ Input con error:
│  ├─ border: 2px solid #dc2626 (rojo)
│  ├─ background: #fef2f2 (fondo rojo claro)
│  ├─ aria-invalid="true"
│  └─ Mensaje de error: id="nombre-error", aria-describedby="nombre-error"
│
└─ Input deshabilitado:
   ├─ background: #9ca3af (gris)
   ├─ cursor: not-allowed
   └─ disabled={true}
```

---

### **Headings** - Tips.jsx, Schedule.jsx, Reports.jsx, etc.
```
Estado: Enfocable sin interacción
├─ Implementación:
│  ├─ const headingRef = useRef(null)
│  ├─ useEffect(() => { headingRef.current?.focus() }, [])
│  └─ <h2 ref={headingRef} tabIndex="-1">Título</h2>
│
└─ Propósito: Cuando entras a una página, el heading se enfoca
   automáticamente para que lectores de pantalla lo lean
```

---

### **Botones** - Todos los .jsx
```
Estado: Normal / Hover / Active / Disabled
├─ Normal:
│  ├─ background: #2563eb (azul)
│  └─ cursor: pointer
│
├─ Hover:
│  ├─ background: #1d4ed8 (azul oscuro)
│  └─ opacity: 0.9
│
├─ Focus:
│  ├─ outline: 3px solid #f59e0b
│  └─ outline-offset: 3px
│
├─ Active (click):
│  └─ transform: scale(0.96) (efecto de presión)
│
└─ Disabled:
   ├─ background: #9ca3af (gris)
   ├─ cursor: not-allowed
   ├─ opacity: 0.7
   └─ transform: none
```

---

## Combinaciones de Teclado Soportadas

### **1. Navegación Global**

| Tecla | Componente | Acción |
|-------|-----------|--------|
| **TAB** | Todos | Avanza al siguiente elemento enfocable |
| **SHIFT + TAB** | Todos | Retrocede al elemento anterior |
| **ENTER** | Botones, Links | Activa el botón / navega al link |
| **SPACE** | Botones | Activa el botón (alternativa a ENTER) |

---

### **2. Navegación en Menús y Navbars**

#### **UserNavbar.jsx** (Barra de usuario)
```javascript
// Código en UserNavbar.jsx línea 8-30
const manejarTeclado = (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    // Navega al siguiente elemento
    items[nextIndex].focus();
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    // Navega al elemento anterior
    items[prevIndex].focus();
  }
};
```

| Tecla | Acción |
|-------|--------|
| **→ Flecha Derecha** | Navega al siguiente item (Inicio → Reportes → Avisos → ...) |
| **← Flecha Izquierda** | Navega al item anterior |
| **ENTER / SPACE** | Activa el item (navega a la ruta) |

---

#### **AdminNavbar.jsx** (Barra de admin)
```javascript
// Código en AdminNavbar.jsx línea 8-25
if (e.key === "ArrowRight") {
  const nextIndex = (currentIndex + 1) % links.length;
  links[nextIndex].focus();
}

if (e.key === "ArrowLeft") {
  const prevIndex = (currentIndex - 1 + links.length) % links.length;
  links[prevIndex].focus();
}
```

| Tecla | Acción |
|-------|--------|
| **→ Flecha Derecha** | Panel → Reportes → Avisos → Horarios → Consejos |
| **← Flecha Izquierda** | Retrocede en las opciones |

---

#### **MenuAdmin.jsx** (Menú desplegable)
```javascript
// Código en MenuAdmin.jsx línea 30-60
if (e.key === "Escape") {
  setMostrarMenu(false);
  toggleButtonRef.current?.focus();
}

if (e.key === "ArrowDown") {
  const next = (currentIndex + 1) % items.length;
  items[next].focus();
}

if (e.key === "ArrowUp") {
  const prev = (currentIndex - 1 + items.length) % items.length;
  items[prev].focus();
}
```

| Tecla | Acción |
|-------|--------|
| **↓ Flecha Abajo** | Mi perfil → Configuración → Cerrar sesión |
| **↑ Flecha Arriba** | Retrocede en las opciones |
| **ESC** | Cierra el menú y devuelve foco al botón ADMIN |
| **ENTER / SPACE** | Activa la opción seleccionada |

---

### **3. Formularios**

| Tecla | Acción |
|-------|--------|
| **TAB** | Siguiente campo |
| **SHIFT + TAB** | Campo anterior |
| **ENTER** | Envía formulario (si es último campo) |
| **TAB en último input** | Va al primer botón |

**Orden TAB en Register.jsx**:
```
1. Nombre
2. Email
3. Dirección
4. Medidor
5. Contraseña
6. Confirmar Contraseña
7. Botón Registrarse
→ vuelve al inicio (ciclo)
```

---

## 📍 Jerarquía de Navegación

### **Orden Global de TAB**

#### **Páginas de Usuario** (después de login)

```
Página: Home
┌──────────────────────────────────────────┐
│ TAB 1: Avatar                            │
│ TAB 2: Iniciar sesión (link)             │
│ TAB 3: Inicio (nav)      ← h2 enfocable  │
│ TAB 4: Reportes (nav)                    │
│ TAB 5: Avisos (nav)                      │
│ TAB 6: Horarios (nav)                    │
│ TAB 7: Consejos (nav)                    │
│ TAB 8: Botón "Iniciar sesión"            │
└──────────────────────────────────────────┘
```

#### **Páginas Admin**

```
Página: Dashboard
┌──────────────────────────────────────────┐
│ TAB 1: Botón ADMIN (menú)                │
│ TAB 2: Panel (navbar)     ← aria-current │
│ TAB 3: Reportes (navbar)                 │
│ TAB 4: Avisos (navbar)                   │
│ TAB 5: Horarios (navbar)                 │
│ TAB 6: Consejos (navbar)                 │
│ TAB 7: Card 1 (elemento)                 │
│ TAB 8: Card 2 (elemento)                 │
└──────────────────────────────────────────┘
```

---

## 🏷️ Roles ARIA Utilizados

| Rol | Ubicación | Propósito |
|-----|-----------|----------|
| `role="alert"` | [NotFound.jsx](src/pages/errors/NotFound.jsx), [ServerError.jsx](src/pages/errors/ServerError.jsx), Formularios | Comunica errores y mensajes críticos |
| `role="navigation"` | [AdminNavbar.jsx](src/components/AdminNavbar.jsx), [Breadcrumbs.jsx](src/components/Breadcrumbs.jsx) | Marca regiones de navegación |
| `role="menu"` | [MenuAdmin.jsx](src/components/MenuAdmin.jsx) | Define menú desplegable |
| `role="menuitem"` | [MenuAdmin.jsx](src/components/MenuAdmin.jsx) | Opciones dentro del menú |

---

## 📋 Checklist de Accesibilidad

- ✅ **Navegación por teclado**: Flecha izquierda/derecha en navbars
- ✅ **Focus visible**: Outline amarillo en todos los elementos interactivos
- ✅ **Mensajes de error**: `aria-invalid` + `aria-describedby`
- ✅ **Alertas dinámicas**: `role="alert"` + `aria-live="assertive"`
- ✅ **Enfoque automático**: Headings y campos principales al cargar
- ✅ **Breadcrumbs accesibles**: `aria-current="page"` + `aria-hidden` en separadores
- ✅ **Menú desplegable**: `aria-expanded` + navegación con ESC
- ✅ **Página actual marcada**: `aria-current="page"` en NavLink activo
- ✅ **Tests**: 9 archivos .test.jsx verifican accesibilidad

---

## 🔗 Referencias

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN: ARIA](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última actualización**: 15 Febrero 2026
**Versión**: 1.0
