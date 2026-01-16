## 🛠️Tecnologias
###  Núcleo del Servidor
	Node.js: Entorno de ejecución para JavaScript.
	Express: Framework web para la creación de rutas y manejo de peticiones.

###  Seguridad y Autenticación
	jsonwebtoken (JWT): Estándar para la transmisión segura de tokens de acceso.
	bcryptjs: Librería para la encriptación segura de contraseñas.
	cookie-parser: Middleware para la gestión de cookies de forma segura.

###  Comunicación y Configuración
	CORS: Configuración de seguridad para el acceso cruzado entre dominios.
	Dotenv: Manejo de variables de entorno para proteger datos sensibles.

## 📁 Estructura
    El proyecto utiliza una Arquitectura en Capas para separar las responsabilidades de forma clara:

    /src
    ├── /config       # Configuración de base de datos y variables .env
    ├── /controllers  # Lógica de respuesta para cada interfaz (Login, Reportes)
    ├── /middlewares  # Guardián de seguridad (Verificar JWT y Roles)
    ├── /models       # Esquemas de la base de datos relacional
    ├── /routes       # Definición de las 14 rutas (públicas/privadas)
    ├── /services     # Lógica de negocio (Cálculos de estadísticas para el Admin)
    └── app.js        # Punto de entrada de la aplicación e inicialización
