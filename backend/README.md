# Backend – Sistema de Reportes de Escasez de Agua

Este modulo corresponde al **backend en Express** del proyecto _DWP – Equipo 4_.Su propósito es mostrar las acciones y accesos disponibles para los usuarios, gestionando su identidad digital y garantizando un acceso seguro al resto de las funcionalidades de la aplicación web.

## 🛠️Tecnologias

## Núcleo del Servidor

[Node.js](https://nodejs.org/es): Entorno de ejecución para JavaScript.
[Express](https://expressjs.com/): Framework web para la creación de rutas y manejo de peticiones.

### Seguridad y Autenticación

[jsonwebtoken (JWT)](https://www.jwt.io/): Estándar para la transmisión segura de tokens de acceso.
[bcryptjs](https://www.npmjs.com/package/bcrypt): Librería para la encriptación segura de contraseñas.
[cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware para la gestión de cookies de forma segura.

### Comunicación y Configuración

[CORS](https://www.npmjs.com/package/cors): Configuración de seguridad para el acceso cruzado entre dominios.
[Dotenv](https://www.npmjs.com/package/dotenv): Manejo de variables de entorno para proteger datos sensibles.

### Lenguaje

[Javascript]: Lenguaje de programación utilizado principalmente para el desarrollo web

## 📁 Estructura

El proyecto utiliza una Arquitectura en Capas para separar las responsabilidades de forma clara:

backend/
├── /config # Configuración de base de datos y variables .env
├── /controllers # Lógica de respuesta para cada interfaz (Login, Reportes)
├── /middlewares # Guardián de seguridad (Verificar JWT y Roles)
├── /models # Esquemas de la base de datos relacional
├── /routes # Definición de las 14 rutas (públicas/privadas)
├── /services # Lógica de negocio (Cálculos de estadísticas para el Admin)
└── app.js # Punto de entrada de la aplicación e inicialización

## Rutas de autenticación

---

## | Método | Ruta (Endpoint) | Acceso | Propósito |

| POST | /api/auth/registro | Público | Crea un nuevo perfil de usuario (Ciudadano).|
| POST | /api/auth/login | Público | Valida credenciales y entrega el token JWT. |

---

## Rutas usuario

## | Método | Ruta (Endpoint) | Acceso | Propósito |

| GET | /api/inicio | Público | Entrega la información de la Landing Page. |
| GET | /api/consejos | Público | Lista de consejos de ahorro de agua. |
| GET | /api/horarios | Público | Consulta de horarios de suministro por zona. |
| GET | /api/avisos | Público | Notificaciones generales de cortes programados. |
| POST | /api/reportes/crear | Privado | Envío del formulario de incidencia (fuga, falta de agua). |
| GET | /api/reportes/status | Privado | Historial y estado actual de los reportes del usuario. |

---

## Rutas de administrador

## | Método | Ruta (Endpoint) | Acceso | Propósito |

| GET | /api/admin/stats | Privado (Admin) | Dashboard con métricas y gráficas de la ciudad. |
| GET | /api/admin/reportes | Privado (Admin) | Lista global de todas las incidencias reportadas. |
| PATCH | /api/admin/reportes/:id | Privado (Admin) | Actualiza el estado de un reporte (ej: "Enreparación"). |
| POST/PUT/DEL | /api/admin/horarios | Privado (Admin) | CRUD: Crear, editar o borrar horarios de suministro. |
| POST/PUT/DEL | /api/admin/consejos | Privado (Admin) | CRUD: Gestionar los artículos de consejos. |
| POST/PUT/DEL | /api/admin/anuncios | Privado (Admin) | CRUD: Publicar o eliminar avisos urgentes. |

---
