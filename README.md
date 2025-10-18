# NeoAcademy

NeoAcademy es una plataforma backend académica diseñada para gestionar de manera integral el proceso de enseñanza y aprendizaje en academias en línea.

## 🚀 Características

- Gestión de usuarios con roles (Administradores, Profesores, Estudiantes)
- Sistema de autenticación y autorización
- Gestión de cursos y lecciones
- Sistema de registro de estudiantes
- Gestión de tareas
- API RESTful
- Seguridad integrada con rate limiting y helmet
- Logging system

## 🛠️ Tecnologías

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MySQL
- JWT para autenticación
- Zod para validación
- Winston para logging

## 📋 Prerrequisitos

- Node.js (versión recomendada: 18 o superior)
- MySQL
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone [url-del-repositorio]
cd NeoAcademy
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
DATABASE_URL="myql://usuario:contraseña@localhost:3306/neoacademy"
JWT_SECRET="tu-secret-key"
PORT=3000
```

4. Ejecuta las migraciones de la base de datos:

```bash
npm run prisma:migrate
```

5. (Opcional) Ejecuta el seeder para datos iniciales:

```bash
npm run prisma:seed
```

## 🚀 Ejecución

Para desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm run build
npm start
```

## 📚 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm start` - Inicia el servidor en modo producción
- `npm run build` - Compila el proyecto
- `npm run prisma:generate` - Genera el cliente Prisma
- `npm run prisma:migrate` - Ejecuta las migraciones
- `npm run prisma:studio` - Abre Prisma Studio
- `npm run prisma:seed` - Ejecuta el seeder
- `npm run prisma:reset` - Resetea la base de datos

## 🏗️ Estructura del Proyecto

```
src/
├── app.ts              # Configuración principal de Express
├── server.ts           # Punto de entrada
├── config/            # Configuraciones
├── middlewares/       # Middlewares personalizados
├── modules/           # Módulos de la aplicación
│   ├── admin/        # Gestión de administradores
│   ├── auth/         # Autenticación
│   ├── courses/      # Gestión de cursos
│   ├── lesson/       # Gestión de lecciones
│   ├── student/      # Gestión de estudiantes
│   ├── teacher/      # Gestión de profesores
│   └── users/        # Gestión de usuarios
├── types/            # Tipos TypeScript
└── utils/            # Utilidades
```
------

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](./LICENSE) para más detalles.

## ✨ Autor

SantiagoRc

⌨️ con ❤️ por [SantiagoRc]
