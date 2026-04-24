# 🎵 Guía de Uso - ViniloStore

## ¡Bienvenido a ViniloStore!

Esta guía te ayudará a conocer todas las funcionalidades de la aplicación.

---

## 1️⃣ Primeros Pasos - Autenticación

### Opción 1: Usar Cuenta de Demo
1. En la pantalla de login, verás las credenciales demo
2. Email: `admin@vinilo.com`
3. Contraseña: `admin123`
4. Haz clic en "Iniciar sesión"

### Opción 2: Crear Nueva Cuenta
1. Haz clic en "¿No tienes cuenta? Registrarse"
2. Completa el formulario:
   - Nombre completo
   - Email único
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. Haz clic en "Registrarse"
4. Luego inicia sesión con tus credenciales

---

## 2️⃣ Panel de Navegación

Una vez autenticado, verás 4 pestañas en la parte superior:

### 🏠 Dashboard
- Página de bienvenida
- Resumen de tu carrito
- Información de usuario

### 🛍️ Productos
- Catálogo completo de vinilos
- Filtros de búsqueda:
  - **Buscar**: Por título, artista o descripción
  - **Filtro por Artista**: Selecciona un artista
  - **Filtro por Precio**: Ajusta el precio máximo
  - **Limpiar**: Resetea todos los filtros
- Botón "Añadir" para agregar al carrito
- Ver precio de cada producto

### 👤 Perfil
- Tu información personal
- Email registrado
- Tu rol (admin o usuario)
- Cantidad de artículos en carrito

### ⚙️ Admin (solo si eres administrador)
Este panel tiene dos secciones:

#### 🎛️ Gestión de Productos
- **Crear Producto**: Botón "+ Nuevo Producto"
  - Ingresa: Título, Artista, Precio, Descripción
  - Haz clic en "Crear"
- **Editar Producto**: Haz clic en "Editar" en cualquier fila
- **Eliminar Producto**: Haz clic en "Eliminar"
- Tabla con todos los productos del catálogo

#### 👥 Gestión de Usuarios
- Ver lista de todos los usuarios registrados
- Ver información: ID, Nombre, Email, Rol
- Eliminar usuarios (excepto admin)
- No puedes eliminar tu propia cuenta

---

## 🛒 Carrito de Compras

### Acceder al Carrito
1. En cualquier página, habrá un botón "Carrito" con un contador
2. Haz clic para abrir el cajón lateral

### Gestionar Carrito
- **Agregar productos**: En la pestaña "Productos", haz clic en "Añadir"
- **Ver cantidad**: Se muestra en el contador del botón Carrito
- **Cambiar cantidad**: En el carrito, modifica el número en el campo
- **Eliminar producto**: Haz clic en "Eliminar"
- **Ver total**: Se calcula automáticamente
- **Checkout**: Botón "Ir a pagar" (demo)

### Persistencia
- Tu carrito se guarda automáticamente
- Si cierras la sesión, el carrito se limpia
- Cada usuario tiene su propio carrito

---

## 💾 Datos y Base de Datos

### ¿Dónde se guardan los datos?
- Se almacenan en el **localStorage** de tu navegador
- Persisten mientras no limpies la caché
- Son datos locales (no se envían a servidores)

### Datos Guardados
- ✅ Usuarios y contraseñas
- ✅ Productos del catálogo
- ✅ Tu carrito
- ✅ Tu sesión de usuario

---

## 🔐 Seguridad y Privacidad

### Contraseñas
- Mínimo 6 caracteres
- Se guardan en localStorage (demo local)
- **Nota**: En una app real, se encriptarían

### Loguearte
- Haz clic en el botón "Logout" en la esquina superior derecha
- Cierra tu sesión de forma segura
- Tu carrito se limpiar

### Cambiar de Usuario
1. Haz clic en "Logout"
2. Inicia sesión con otra cuenta

---

## 📊 Ejemplo de Flujo Completo

1. **Registrarse**: 
   - Entra a la app
   - Crea cuenta nueva
   - Completa formulario

2. **Explorar Productos**:
   - Ve a pestaña "Productos"
   - Busca por artista o precio
   - Revisa el catálogo

3. **Comprar**:
   - Haz clic en "Añadir" en los productos que te gusten
   - Abre el carrito
   - Modifica cantidades si necesitas
   - Calcula el total

4. **Mi Perfil**:
   - Ve a "Perfil" para ver tu información
   - Verifica tu rol y email

5. **Administrar** (si eres admin):
   - Ve a "Admin"
   - Agrega nuevos vinilos
   - Gestiona usuarios

6. **Cerrar Sesión**:
   - Haz clic en "Logout"
   - Se limpian todos los datos

---

## ⚙️ Funcionalidades Técnicas

### Filtros de Productos
- **Búsqueda**: Busca en título, artista y descripción
- **Artista**: Selecciona de la lista desplegable
- **Precio**: Usa el slider para máximo precio
- **Combinables**: Puedes usar múltiples filtros juntos

### Validaciones
- Email debe ser válido
- Email no puede repetirse
- Contraseñas deben coincidir al registrarse
- Campos requeridos en formularios

### Mensajes del Sistema
- 🟢 Verde = Éxito
- 🔴 Rojo = Error
- Se muestran debajo del formulario

---

## 💡 Consejos y Trucos

1. **Prueba como Admin** para ver todas las funciones
2. **Crea múltiples cuentas** para probar diferentes usuarios
3. **Agrega productos nuevos** en Admin para expandir el catálogo
4. **Usa filtros combinados** para búsquedas más específicas
5. **Revisa localStorage** en DevTools (F12) para ver los datos

---

## 🐛 Solución de Problemas

### "El email ya está registrado"
→ Usa otro email o inicia sesión si ya tienes cuenta

### "Contraseña incorrecta"
→ Verifica que escribas correctamente

### "No puedo ver Admin"
→ Solo usuarios con rol "admin" ven esa pestaña

### "Carrito vacío después de logout"
→ Es normal, se limpia al cerrar sesión

### "Datos no se guardan"
→ Verifica que localStorage no esté limitado en navegador

---

## 📱 Información sobre Dispositivos

- ✅ Funciona en Desktop
- ✅ Responsive en Tablet
- ✅ Adaptado para Mobile
- ✅ Compatible con todos los navegadores modernos

---

## 🎓 Características Educativas

Esta app demuestra:
- Componentes React reutilizables
- Gestión de estado con hooks
- Autenticación básica
- CRUD de productos
- Carrito de compras
- Persistencia de datos
- Diseño responsive
- Navegación entre vistas

---

**¡Disfruta explorando ViniloStore! 🎵**
