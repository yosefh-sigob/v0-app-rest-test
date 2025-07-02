# RestApp - Sistema de Gestión para Restaurantes

Sistema completo de gestión para restaurantes desarrollado con Next.js 15, React, Tailwind CSS y shadcn/ui.

## 🚀 Características

- **Gestión de Mesas**: Control de estado de mesas en tiempo real
- **Punto de Venta (POS)**: Sistema completo de ventas
- **Gestión de Productos**: Catálogo completo con categorías
- **Reservaciones**: Sistema de reservas con notificaciones
- **Encuestas SMS**: Sistema de feedback de clientes
- **Reportes**: Dashboard con métricas en tiempo real
- **Multi-rol**: Administrador, Mesero, Cajero
- **Sistema de Licencias**: Control de acceso por niveles

## 🛠️ Tecnologías

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Zod** (Validación)
- **Drizzle ORM**
- **Bun** (Package Manager)

## 📦 Instalación

\`\`\`bash
# Clonar el repositorio
git clone <repository-url>
cd restapp

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
bun dev
\`\`\`

## 🏗️ Estructura del Proyecto

\`\`\`
/actions      → Server Actions
/schemas      → Validaciones Zod
/interfaces   → Tipos TypeScript
/components   → Componentes React
/hooks        → Custom Hooks
/utils        → Funciones utilitarias
/lib          → Configuraciones y servicios
\`\`\`

## 📱 Módulos

- **Dashboard**: Métricas y estadísticas
- **Productos**: Gestión de menú y precios
- **Mesas**: Control de estado y asignación
- **Ventas**: POS y facturación
- **Clientes**: Base de datos de clientes
- **Reservaciones**: Sistema de reservas
- **Encuestas**: Feedback por SMS
- **Reportes**: Analytics y reportes

## 🔐 Sistema de Licencias

1. **Gratis**: Funcionalidades básicas
2. **Lite**: Módulos esenciales
3. **Pro**: Funcionalidades avanzadas
4. **Franquicia**: Acceso completo

## 🎨 Diseño

Sistema de diseño personalizado con:
- Paleta de colores temática para restaurantes
- Componentes reutilizables
- Responsive design
- Animaciones suaves
- Estados visuales claros

## 📄 Licencia

MIT License
