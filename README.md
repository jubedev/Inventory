# 📦 Inventory IT - Sistema de Gestión de Inventario

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 🚀 Sobre el Proyecto
Inventory IT es un sistema diseñado para la gestión eficiente de activos tecnológicos. El proyecto permite controlar stocks, movimientos y auditorías de hardware en entornos corporativos.

Actualmente, el proyecto se encuentra en una **fase de refactorización profesional**, migrando a un stack moderno con estándares de industria.

---

## 🛠️ Stack Tecnológico
* **Backend:** Laravel 12 (PHP 8.2+)
* **Frontend:** React con Vite
* **Estilos:** Tailwind CSS
* **Base de Datos:** MySQL
* **Gestión de Estado:** Context API

---

## 📈 Roadmap de Evolución (En Progreso)
Este repositorio muestra mi proceso de crecimiento técnico. Actualmente estoy implementando:

- [x] **Limpieza y White-labeling:** Desvinculación de marcas corporativas y preparación para portafolio.
- [ ] **Migración a TypeScript:** Tipado fuerte en todo el frontend para mejorar la mantenibilidad.
- [ ] **Testing Automatizado:** Implementación de tests unitarios y de integración.
- [ ] **Arquitectura de Colas:** Manejo de procesos asíncronos para reportes.

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/jubedev/Inventory.git
```

### 2. Configuración del Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### 3. Configuración del Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

---

## 👨‍💻 Autor
**Juan Esteban Becerra Genez**
* Full-Stack Developer
* [LinkedIn](https://www.linkedin.com/in/jubedev/)

---
*Nota: Este proyecto es un laboratorio activo de aprendizaje y mejora continua.*
