# ViniloStore - Tienda de Vinilos 🎵

Una aplicación React completa con sistema de autenticación, gestión de productos y usuarios, carrito de compras y base de datos simulada.

## 🎯 Características Principales

### 1. **Sistema de Autenticación**
- Página de Login/Registro separada
- Validación de datos en cliente
- Base de datos simulada en localStorage
- Seguridad básica con contrasñas

### 2. **Interfaz con Pestañas**
Cada componente está separado en su propia pestaña:
- **Dashboard**: Página de inicio bienvenida
- **Productos**: Catálogo con filtros de búsqueda
- **Admin**: Panel de administración (solo para admin)
- **Perfil**: Información del usuario y carrito

### 3. **Base de Datos Simulada**
Almacenamiento persistente en localStorage con:
- Gestión de usuarios (registro, login, eliminación)
- Catálogo de productos (CRUD completo)
- Carrito de compras
- Sesiones de usuario

### 4. **Panel de Administración**
- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Ver lista completa de usuarios
- Eliminar usuarios (excepto admin)

## 📁 Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── About.jsx
│   ├── AdminProducts.jsx
│   ├── AdminUsers.jsx
│   ├── CartDrawer.jsx
│   ├── Contact.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Login.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── Products.jsx
├── utils/
│   └── database.js      # Lógica de base de datos simulada
├── App.jsx              # Componente principal
├── main.jsx
└── styles.css
```

## 🔑 Credenciales de Prueba

**Admin:**
- Email: `admin@vinilo.com`
- Contraseña: `admin123`

Puedes crear nuevas cuentas desde la opción "Registrarse" en el login.

## 🚀 Cómo Usar

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

El servidor inicia en `http://localhost:5173`

### Build
```bash
npm run build
```

## 📊 Funcionalidades del Sistema

### Login/Registro
- Crear cuenta con validación de contraseña
- Login con email y contraseña
- Mensajes de error y éxito
- Demostración de credenciales

### Productos
- Filtrar por artista
- Filtrar por precio máximo
- Buscar en tiempo real
- Añadir al carrito
- Ver detalles del producto

### Carrito
- Agregar/eliminar productos
- Cambiar cantidad
- Calcular total automáticamente
- Persistencia en localStorage

### Admin (Solo para admin@vinilo.com)
- **Gestión de Productos**: Crear, editar, eliminar vinilos
- **Gestión de Usuarios**: Ver lista y eliminar usuarios
- Tabla interactiva con acciones

### Perfil
- Ver información del usuario
- Mostrar rol (admin/user)
- Contador de artículos en carrito

## 🎨 Diseño y Estilos

- Interfaz moderna con gradientes
- Tema oscuro elegante
- Responsive para móviles
- Animaciones suaves
- Mejor organización visual de componentes

## 💾 Base de Datos Simulada

La base de datos usa localStorage con la siguiente estructura:

```javascript
{
  users: [
    { id, email, password, name, role }
  ],
  products: [
    { id, title, artist, price, description }
  ],
  sessions: {}
}
```

## 🔒 Funciones de Seguridad (Básicas)

- Validación de emails
- Requisitos mínimos de contraseña (6 caracteres)
- Prevención de registros duplicados
- Control de acceso por rol
- Logout con limpieza de datos

## 📱 Responsive

La aplicación se adapta a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🐛 Notas Importantes

- La base de datos se resetea al limpiar localStorage del navegador
- Las contraseñas se guardan en texto plano (esto es solo para demostración)
- El sistema es completamente local y no usa servidor backend

## 🎓 Aprendizajes Implementados

✅ Componentes reutilizables
✅ Sistema de estado con hooks
✅ Persistencia de datos
✅ Navegación entre vistas
✅ Autenticación básica
✅ CRUD de productos
✅ Carrito de compras
✅ Validación de formularios
✅ Estilos responsive
✅ Organización profesional del código

---

**Creado con React + Vite** 🚀
