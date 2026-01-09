# 📝 DEUDA TÉCNICA DEL PROYECTO

**Última actualización:** 06 de enero de 2026

---

## 🔴 CRÍTICO

### 1. Gestión de Contraseñas de Correos Corporativos

**Estado:** ⚠️ Temporalmente resuelto (campo eliminado)

**Contexto:**
- El área de soporte IT necesita acceder a correos de empleados
- Anteriormente se guardaban contraseñas en texto plano (MUY INSEGURO)
- Campo `password` eliminado de tabla `usuarios` el 06/01/2026

**Soluciones profesionales a implementar:**

#### Opción A: Delegación de Buzones (RECOMENDADO)
- Costo: $0
- Tiempo: 2-4 horas de configuración
- Requiere: Office 365/Exchange
- Beneficios: Seguro, auditable, sin contraseñas

#### Opción B: Gestor de Contraseñas Empresarial
- Costo: $3-7 USD/usuario/mes
- Opciones: Bitwarden, 1Password, LastPass
- Beneficios: Encriptación AES-256, logs, permisos

#### Opción C: Encriptación en DB
- Costo: $0 (desarrollo interno)
- Tiempo: 4-6 horas de desarrollo
- Implementar: Laravel Crypt con clave maestra
- Beneficios: Mejor que texto plano, auditable

**Acción requerida:**
- [ ] Consultar con gerencia/IT sobre Office 365/Exchange
- [ ] Evaluar presupuesto para gestor de contraseñas
- [ ] Documentar proceso actual de soporte

**Referencias:**
- Microsoft Graph API: https://docs.microsoft.com/en-us/graph/
- Bitwarden: https://bitwarden.com/
- Laravel Encryption: https://laravel.com/docs/encryption

---

## 🟡 IMPORTANTE

### 2. Autenticación y Autorización

**Pendiente:**
- [ ] Middleware de roles no implementado completamente
- [ ] Falta verificación de permisos granulares
- [ ] Access Requests y Usuarios Sistema solo verifican login, no rol

**Implementado:**
- [x] Rutas protegidas con auth:sanctum
- [x] Separación de rutas públicas/privadas

---

## 🟢 MEJORAS FUTURAS

### 3. Testing
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Tests E2E

### 4. Documentación API
- [ ] Swagger/OpenAPI
- [ ] Colección Postman
- [ ] Ejemplos de uso

### 5. Performance
- [ ] Paginación en endpoints
- [ ] Cache de queries frecuentes
- [ ] Lazy loading de imágenes

### 6. Módulos Pendientes
- [ ] Sistema de Movimientos
- [ ] Sistema de Reportes
- [ ] Asignación de equipos
- [ ] 13 tipos de equipos especializados
- [ ] Sistema de Tickets

---

## 📋 HISTORIAL DE CAMBIOS

### 06/01/2026
- ✅ Eliminado campo `password` de tabla `usuarios`
- ✅ Actualizado modelo `Usuario.php`
- ✅ Protegidas rutas API con autenticación
- ✅ Mejorado `.gitignore`
- 📝 Documentada deuda técnica de contraseñas

---

**Nota:** Este documento se actualiza conforme se identifican y resuelven problemas.
