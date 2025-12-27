# GSA Inventory IT - Frontend

Sistema de gestión de inventario de equipos IT desarrollado con React + Vite.

## 🚀 Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **Tailwind CSS** - Framework de estilos
- **ESLint** - Linter de código

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 🎨 Tipografías del Proyecto

| Fuente | Variable CSS | Funcionalidad | Uso Recomendado |
|--------|-------------|---------------|-----------------|
| **Satoshi** | `--font-satoshi` | Marca y Personalidad | Títulos (H1/H2), Botones principales, Branding |
| **Inter** | `--font-inter` | Legibilidad | Cuerpo de texto, párrafos, inputs de formularios |
| **Geist** | `--font-geist` | Datos Técnicos | Metadatos, tablas de datos, menús de navegación |

## 📁 Estructura del Proyecto

```
src/
├── assets/             # Recursos estáticos globales (imágenes, estilos)
│   └── styles/         # Archivos CSS globales, variables de Tailwind
│
├── components/         # Componentes UI globales reutilizables
│   ├── ui/             # Componentes atómicos (Button, Input, Modal, Card)
│   └── shared/         # Componentes contenedores genéricos (Header, Footer)
│
├── contexts/           # Gestión de estado global (AuthContext)
│
├── features/           # Lógica de negocio por módulo
│   ├── inventory/      # Módulo de Inventario
│   │   ├── components/ # Componentes específicos (InventoryTable, Filters)
│   │   ├── hooks/      # Hooks específicos (useInventoryData)
│   │   ├── services/   # Clientes API (inventoryService)
│   │   └── pages/      # Vistas (InventoryListPage)
│   │
│   └── auth/           # Módulo de Autenticación
│       ├── components/ # Login/Signup Forms
│       ├── hooks/      # useLogin
│       └── services/   # authService
│
├── hooks/              # Custom Hooks generales (useDebounce, useLocalStorage)
├── utils/              # Helpers y funciones puras (formatDate, validators)
├── App.jsx             # Componente raíz con rutas principales
├── main.jsx            # Punto de entrada de la aplicación
└── router.jsx          # Configuración de rutas
```

## 🔧 Configuración

El proyecto utiliza:
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** - Plugin de Vite para React con Fast Refresh