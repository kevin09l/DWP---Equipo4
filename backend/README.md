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

> **Nota de despliegue**
> Este servicio puede ejecutarse dentro de Docker junto con el resto de la aplicación. El `docker-compose.yml` en la raíz define contenedores para
> el frontend, el backend y la base de datos MySQL (`mysql-dev`). Las variables de entorno
> se inyectan por Docker o se leen desde un archivo `.env` (ver `.env.example`).
> Para desarrollo local fuera de Docker asegúrate de apuntar al puerto 3309 de MySQL o
> ajustar `DB_HOST` y `DB_PORT` según corresponda.

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

| POST | /api/auth/register | Público | Crea un nuevo perfil de usuario (Ciudadano).|
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
\n## ? Convenciones de respuesta y mejoras recientes\n\n* Todas las rutas devuelven el mismo JSON base: { success: boolean, message?: string, data?: any }.\n* Utilizamos un helper en utils/response.js para evitar duplicaci�n y facilitar cambios.\n* Errores controlados lanzan ApiError y el middleware de errores aplica c�digos HTTP adecuados.\n* Se a�adi� un handler 404 para /api que devuelve un JSON con success=false.\n\n## ? Optimizaciones de rendimiento\n\n* La consulta de registro ahora valida email/medidor con una sola llamada (findByEmailOrMeter) para reducir latencia.\n* Las columnas email y water_meter son �nicas en la base de datos y deben tener �ndices (ya definidos en schema.sql).\n* Documenta en el esquema la necesidad de �ndices adicionales si se agregan nuevas b�squedas.\n\n## ?? Pruebas y CI/CD\n\n* Paquetes de desarrollo agregados: jest, supertest, cross-env.\n* Tests b�sicos cubren servicio y controladores de autenticaci�n (carpeta tests/).\n* Se actualiz� el flujo de GitHub Actions para ejecutar los tests del backend adem�s de la validaci�n del frontend.\n* La variable de entorno NODE_ENV=test se utiliza para aislar la configuraci�n en pruebas.\n
