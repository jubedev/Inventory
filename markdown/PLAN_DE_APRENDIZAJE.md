# 📚 PLAN DE APRENDIZAJE PRÁCTICO - INVENTARIO GSA

## 🎯 OBJETIVO
Dominar completamente el sistema de inventario mediante práctica activa, lectura dirigida y resolución de problemas reales.

---

## 📖 RECURSOS DE LECTURA OBLIGATORIA

### 🔴 PRIORIDAD ALTA (Lee ANTES de empezar)

#### Laravel Básico (2-3 horas)
- [ ] [Laravel Routing](https://laravel.com/docs/11.x/routing) - Cómo funcionan las rutas
- [ ] [Controllers](https://laravel.com/docs/11.x/controllers) - Qué son y para qué sirven
- [ ] [Eloquent ORM](https://laravel.com/docs/11.x/eloquent) - Modelos y base de datos
- [ ] [Migrations](https://laravel.com/docs/11.x/migrations) - Crear y modificar tablas
- [ ] [Validation](https://laravel.com/docs/11.x/validation) - Validar datos de entrada

#### React Básico (2-3 horas)
- [ ] [React Hooks - useState](https://react.dev/reference/react/useState)
- [ ] [React Hooks - useEffect](https://react.dev/reference/react/useEffect)
- [ ] [React Hooks - useContext](https://react.dev/reference/react/useContext)
- [ ] [Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [ ] [Lists and Keys](https://react.dev/learn/rendering-lists)

#### HTTP y APIs (1 hora)
- [ ] [Métodos HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - GET, POST, PUT, DELETE
- [ ] [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - 200, 400, 404, 500
- [ ] [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - Por qué existen errores de CORS

### 🟡 PRIORIDAD MEDIA (Lee cuando lo necesites)

#### Laravel Avanzado
- [ ] [Relationships](https://laravel.com/docs/11.x/eloquent-relationships) - belongsTo, hasMany
- [ ] [Query Builder](https://laravel.com/docs/11.x/queries) - where, orderBy, groupBy
- [ ] [Sanctum](https://laravel.com/docs/11.x/sanctum) - Autenticación con tokens

#### React Avanzado
- [ ] [React Router](https://reactrouter.com/en/main/start/tutorial) - Navegación
- [ ] [Forms](https://react.dev/reference/react-dom/components/form) - Manejo de formularios
- [ ] [Axios](https://axios-http.com/docs/intro) - HTTP requests

### 🟢 PRIORIDAD BAJA (Opcional, para profundizar)

- [ ] [Middleware Laravel](https://laravel.com/docs/11.x/middleware)
- [ ] [Custom Hooks React](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [ ] [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

## 🎮 FASE 0: PREPARACIÓN (Día 1)

### Actividad 0.1: Mapeo del Proyecto
**Tiempo estimado:** 2 horas
**Objetivo:** Entender la estructura completa

**TAREAS:**
1. Abre el proyecto en VS Code
2. Crea un archivo `proyecto-mapa.txt` y dibuja:

```
BACKEND (backend/)
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/AuthController.php ← Login y registro
│   │   ├── Inventario/EquipoController.php ← CRUD equipos
│   │   └── Inventario/TipoEquipoController.php ← CRUD tipos
│   └── Models/
│       ├── User.php
│       ├── Inventario/Equipo.php ← Representa tabla equipos
│       └── Inventario/TipoEquipo.php
├── routes/
│   └── api.php ← TODAS las rutas del API
└── database/migrations/ ← Estructura de tablas

FRONTEND (frontend/src/)
├── features/
│   ├── auth/ ← Login y registro
│   ├── dashboard/ ← Página principal
│   ├── equipos/ ← Gestión de equipos
│   └── tipos-equipo/ ← Gestión de tipos
├── context/
│   └── AppContext.jsx ← Estado global (usuario, auth)
├── services/
│   └── api.js ← Configuración de Axios
└── router.jsx ← Definición de rutas
```

3. Responde estas preguntas (en papel o txt):
   - ¿Dónde se define la ruta para crear un equipo?
   - ¿Qué archivo maneja el login en backend?
   - ¿Dónde se guarda el token de autenticación?
   - ¿Qué componente muestra la lista de equipos?

**Lecturas necesarias:** Ninguna, solo explorar

✅ Completado: __ / __ / 2026

---

## 🟢 FASE 1: MODIFICACIONES SIMPLES (Semana 1)

### Ejercicio 1.1: Agregar Campo "Observaciones"
**Tiempo estimado:** 1.5 horas
**Dificultad:** ⭐⭐☆☆☆

**LECTURAS PREVIAS (30 min):**
- [ ] [Laravel Migrations - Adding Columns](https://laravel.com/docs/11.x/migrations#creating-columns)
- [ ] [Eloquent - Mass Assignment](https://laravel.com/docs/11.x/eloquent#mass-assignment)

**OBJETIVO:** Agregar campo de texto para notas sobre cada equipo

**PASOS:**

#### Backend
1. **Crear migración:**
   ```bash
   cd backend
   php artisan make:migration add_observaciones_to_equipos_table
   ```

2. **Editar la migración** (en `database/migrations/XXXX_add_observaciones_to_equipos_table.php`):
   ```php
   public function up()
   {
       Schema::table('equipos', function (Blueprint $table) {
           $table->text('observaciones')->nullable()->after('estado');
       });
   }

   public function down()
   {
       Schema::table('equipos', function (Blueprint $table) {
           $table->dropColumn('observaciones');
       });
   }
   ```

3. **Correr migración:**
   ```bash
   php artisan migrate
   ```

4. **Actualizar Modelo** (`app/Models/Inventario/Equipo.php`):
   - Buscar `protected $fillable = [...]`
   - Agregar `'observaciones'` al array

5. **Actualizar Validación** (`app/Http/Controllers/Inventario/EquipoController.php`):
   - En método `store()` y `update()`
   - Agregar: `'observaciones' => 'nullable|string|max:1000'`

#### Frontend
6. **Actualizar Formulario** (`frontend/src/features/equipos/pages/EquipoFormPage.jsx`):
   - Agregar al estado inicial:
     ```javascript
     observaciones: equipo?.observaciones || ''
     ```
   - Agregar campo antes del botón "Guardar":
     ```jsx
     <div>
       <label className="block text-sm font-medium text-gray-700 mb-2">
         Observaciones
       </label>
       <textarea
         name="observaciones"
         value={formData.observaciones}
         onChange={handleChange}
         rows="4"
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
         placeholder="Notas adicionales sobre el equipo..."
       />
     </div>
     ```

7. **Mostrar en Tabla** (`frontend/src/features/equipos/components/EquipoTable.jsx`):
   - Agregar columna "Observaciones" (truncar texto si es muy largo)

**VERIFICACIÓN:**
- [ ] Puedo crear equipo con observaciones
- [ ] Puedo editar observaciones existentes
- [ ] Las observaciones se guardan en BD
- [ ] Se muestran en la tabla (aunque sea parcialmente)

**COMMIT:**
```bash
git add .
git commit -m "feat(equipos): agregar campo observaciones

- Nueva columna observaciones en tabla equipos
- Validación opcional máximo 1000 caracteres
- Campo textarea en formulario
- Mostrar en tabla de equipos"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
📝 Dificultad percibida: __ / 10

---

### Ejercicio 1.2: Filtro por Estado
**Tiempo estimado:** 1.5 horas
**Dificultad:** ⭐⭐⭐☆☆

**LECTURAS PREVIAS (20 min):**
- [ ] [Array.filter() en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [ ] [Select en React](https://react.dev/reference/react-dom/components/select)

**OBJETIVO:** Dropdown para filtrar equipos por estado (disponible, asignado, etc.)

**PASOS:**

#### Frontend (Solo Frontend - Filtro en el navegador)
1. **Actualizar EquipoListPage.jsx:**
   - Agregar estado para filtro:
     ```javascript
     const [filtroEstado, setFiltroEstado] = useState('todos')
     ```

   - Agregar función de filtrado:
     ```javascript
     const equiposFiltrados = filtroEstado === 'todos'
       ? equipos
       : equipos.filter(equipo => equipo.estado === filtroEstado)
     ```

   - Agregar dropdown antes de la tabla:
     ```jsx
     <div className="mb-4">
       <label className="mr-2 font-medium">Filtrar por estado:</label>
       <select
         value={filtroEstado}
         onChange={(e) => setFiltroEstado(e.target.value)}
         className="px-4 py-2 border border-gray-300 rounded-lg"
       >
         <option value="todos">Todos</option>
         <option value="disponible">Disponible</option>
         <option value="asignado">Asignado</option>
         <option value="en mantenimiento">En Mantenimiento</option>
         <option value="dado de baja">Dado de Baja</option>
       </select>
     </div>
     ```

   - Cambiar `equipos` por `equiposFiltrados` en el map de la tabla

**VERIFICACIÓN:**
- [ ] Al seleccionar "Disponible", solo veo equipos disponibles
- [ ] Al seleccionar "Todos", veo todos los equipos
- [ ] El filtro funciona sin recargar la página

**BONUS (Opcional):** Hacerlo en backend con query parameter
```php
// EquipoController.php
public function index(Request $request)
{
    $query = Equipo::with('tipoEquipo');
    
    if ($request->has('estado') && $request->estado !== 'todos') {
        $query->where('estado', $request->estado);
    }
    
    return response()->json($query->get());
}

// Frontend
api.get('/equipos', { params: { estado: filtroEstado } })
```

**COMMIT:**
```bash
git add .
git commit -m "feat(equipos): agregar filtro por estado

- Dropdown con todos los estados posibles
- Filtrado en tiempo real sin recargar
- Opción 'Todos' para ver todos los equipos"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
📝 Dificultad percibida: __ / 10

---

### Ejercicio 1.3: Contador de Equipos por Marca
**Tiempo estimado:** 2 horas
**Dificultad:** ⭐⭐⭐☆☆

**LECTURAS PREVIAS (30 min):**
- [ ] [Laravel Query Builder - groupBy](https://laravel.com/docs/11.x/queries#aggregates)
- [ ] [Laravel - Raw Expressions](https://laravel.com/docs/11.x/queries#raw-expressions)

**OBJETIVO:** Nueva tarjeta en Dashboard mostrando "HP: 15, Dell: 10"

**PASOS:**

#### Backend
1. **Agregar método en EquipoController.php:**
   ```php
   public function porMarca()
   {
       $estadisticas = Equipo::selectRaw('marca, COUNT(*) as total')
           ->groupBy('marca')
           ->orderBy('total', 'desc')
           ->get();
       
       return response()->json($estadisticas);
   }
   ```

2. **Agregar ruta en routes/api.php:**
   ```php
   // Dentro del grupo de equipos
   Route::get('equipos/por-marca', [EquipoController::class, 'porMarca']);
   ```

#### Frontend
3. **Actualizar DashboardPage.jsx:**
   - Agregar estado:
     ```javascript
     const [equiposPorMarca, setEquiposPorMarca] = useState([])
     ```

   - Hacer fetch en useEffect:
     ```javascript
     useEffect(() => {
       const fetchData = async () => {
         try {
           const [statsRes, marcasRes] = await Promise.all([
             api.get('/equipos/stats'),
             api.get('/equipos/por-marca')
           ])
           setStats(statsRes.data)
           setEquiposPorMarca(marcasRes.data)
         } catch (error) {
           console.error('Error:', error)
         }
       }
       fetchData()
     }, [])
     ```

   - Agregar tarjeta nueva:
     ```jsx
     <div className="bg-white rounded-xl shadow-md p-6">
       <h3 className="text-lg font-semibold mb-4">📊 Equipos por Marca</h3>
       <div className="space-y-2">
         {equiposPorMarca.map((item, index) => (
           <div key={index} className="flex justify-between items-center">
             <span className="font-medium">{item.marca}</span>
             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
               {item.total}
             </span>
           </div>
         ))}
       </div>
     </div>
     ```

**VERIFICACIÓN:**
- [ ] La tarjeta aparece en el dashboard
- [ ] Muestra todas las marcas con su cantidad
- [ ] Están ordenadas de mayor a menor cantidad
- [ ] Al crear un equipo de nueva marca, aparece en la lista

**COMMIT:**
```bash
git add .
git commit -m "feat(dashboard): agregar estadísticas por marca

- Nuevo endpoint /equipos/por-marca con groupBy
- Tarjeta en dashboard mostrando conteo por marca
- Ordenado descendente por cantidad"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
📝 Dificultad percibida: __ / 10

---

## 🟡 FASE 2: FEATURES NUEVAS (Semana 2-3)

### Ejercicio 2.1: Búsqueda en Tiempo Real
**Tiempo estimado:** 2.5 horas
**Dificultad:** ⭐⭐⭐⭐☆

**LECTURAS PREVIAS (45 min):**
- [ ] [SQL LIKE operator](https://www.w3schools.com/sql/sql_like.asp)
- [ ] [Laravel - Where Clauses](https://laravel.com/docs/11.x/queries#where-clauses)
- [ ] [Debouncing en JavaScript](https://www.freecodecamp.org/news/javascript-debounce-example/)

**OBJETIVO:** Buscador que busca en múltiples campos mientras escribes

**PASOS:**

#### Backend
1. **Crear método search en EquipoController.php:**
   ```php
   public function search(Request $request)
   {
       $query = $request->query('q');
       
       if (empty($query)) {
           return response()->json([]);
       }
       
       $equipos = Equipo::with('tipoEquipo')
           ->where(function($q) use ($query) {
               $q->where('activo', 'like', "%{$query}%")
                 ->orWhere('serial', 'like', "%{$query}%")
                 ->orWhere('marca', 'like', "%{$query}%")
                 ->orWhere('modelo', 'like', "%{$query}%");
           })
           ->limit(10)
           ->get();
       
       return response()->json($equipos);
   }
   ```

2. **Agregar ruta:**
   ```php
   Route::get('equipos/search', [EquipoController::class, 'search']);
   ```

#### Frontend
3. **Crear hook personalizado** (`frontend/src/hooks/useDebounce.js`):
   ```javascript
   import { useState, useEffect } from 'react'

   export function useDebounce(value, delay) {
     const [debouncedValue, setDebouncedValue] = useState(value)

     useEffect(() => {
       const handler = setTimeout(() => {
         setDebouncedValue(value)
       }, delay)

       return () => {
         clearTimeout(handler)
       }
     }, [value, delay])

     return debouncedValue
   }
   ```

4. **Actualizar EquipoListPage.jsx:**
   ```javascript
   import { useDebounce } from '../../../hooks/useDebounce'
   
   const [searchTerm, setSearchTerm] = useState('')
   const debouncedSearch = useDebounce(searchTerm, 500)
   
   useEffect(() => {
     if (debouncedSearch) {
       const fetchSearch = async () => {
         const response = await api.get('/equipos/search', {
           params: { q: debouncedSearch }
         })
         setEquipos(response.data)
       }
       fetchSearch()
     } else {
       fetchEquipos() // Cargar todos si búsqueda está vacía
     }
   }, [debouncedSearch])
   
   // Agregar input de búsqueda
   <input
     type="text"
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     placeholder="🔍 Buscar por activo, serial, marca o modelo..."
     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
   />
   ```

**VERIFICACIÓN:**
- [ ] Al escribir, aparecen resultados después de 500ms
- [ ] Busca en activo, serial, marca y modelo
- [ ] Al borrar búsqueda, vuelven a aparecer todos
- [ ] No hace requests por cada letra (solo después de pausa)

**COMMIT:**
```bash
git add .
git commit -m "feat(equipos): búsqueda en tiempo real con debounce

- Nuevo endpoint search con LIKE en múltiples campos
- Hook personalizado useDebounce
- Input de búsqueda con delay de 500ms
- Límite de 10 resultados por performance"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
📝 Dificultad percibida: __ / 10

---

### Ejercicio 2.2: Exportar a Excel
**Tiempo estimado:** 2 horas
**Dificultad:** ⭐⭐⭐☆☆

**LECTURAS PREVIAS (30 min):**
- [ ] [Laravel Excel Docs](https://docs.laravel-excel.com/3.1/getting-started/)
- [ ] [Blade Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)

**OBJETIVO:** Botón "Exportar" que descarga Excel con todos los equipos

**PASOS:**

#### Backend
1. **Instalar paquete:**
   ```bash
   cd backend
   composer require maatwebsite/excel
   ```

2. **Crear clase Export:**
   ```bash
   php artisan make:export EquiposExport --model=Equipo
   ```

3. **Editar** `app/Exports/EquiposExport.php`:
   ```php
   <?php

   namespace App\Exports;

   use App\Models\Inventario\Equipo;
   use Maatwebsite\Excel\Concerns\FromCollection;
   use Maatwebsite\Excel\Concerns\WithHeadings;
   use Maatwebsite\Excel\Concerns\WithMapping;

   class EquiposExport implements FromCollection, WithHeadings, WithMapping
   {
       public function collection()
       {
           return Equipo::with('tipoEquipo')->get();
       }

       public function headings(): array
       {
           return [
               'ID',
               'Activo',
               'Serial',
               'Marca',
               'Modelo',
               'Tipo',
               'Estado',
               'Fecha Creación'
           ];
       }

       public function map($equipo): array
       {
           return [
               $equipo->id,
               $equipo->activo,
               $equipo->serial,
               $equipo->marca,
               $equipo->modelo,
               $equipo->tipoEquipo->nombre ?? 'N/A',
               $equipo->estado,
               $equipo->created_at->format('Y-m-d H:i:s')
           ];
       }
   }
   ```

4. **Agregar método en EquipoController.php:**
   ```php
   use App\Exports\EquiposExport;
   use Maatwebsite\Excel\Facades\Excel;

   public function export()
   {
       return Excel::download(new EquiposExport, 'equipos_' . date('Y-m-d') . '.xlsx');
   }
   ```

5. **Agregar ruta:**
   ```php
   Route::get('equipos/export', [EquipoController::class, 'export']);
   ```

#### Frontend
6. **Agregar botón en EquipoListPage.jsx:**
   ```jsx
   const handleExport = () => {
     // Obtener token para la descarga
     const token = localStorage.getItem('token')
     window.open(
       `https://backend.test/api/equipos/export?token=${token}`,
       '_blank'
     )
   }

   // Botón junto a "Nuevo Equipo"
   <button
     onClick={handleExport}
     className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
   >
     <span>📥</span>
     <span>Exportar Excel</span>
   </button>
   ```

**VERIFICACIÓN:**
- [ ] Al hacer clic, descarga archivo Excel
- [ ] El archivo tiene todas las columnas correctas
- [ ] Incluye todos los equipos de la BD
- [ ] El nombre del archivo incluye la fecha

**COMMIT:**
```bash
git add .
git commit -m "feat(equipos): exportar lista a Excel

- Integración con Laravel Excel
- Exportación con headers personalizados
- Formato de fecha legible
- Botón de descarga en frontend"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
📝 Dificultad percibida: __ / 10

---

## 🔴 FASE 3: DEBUGGING Y REFACTORING (Semana 4)

### Ejercicio 3.1: Caza de Bugs Intencionados
**Tiempo estimado:** 4 horas
**Dificultad:** ⭐⭐⭐⭐⭐

**LECTURAS PREVIAS (1 hora):**
- [ ] [Laravel Logging](https://laravel.com/docs/11.x/logging)
- [ ] [Browser DevTools](https://developer.chrome.com/docs/devtools/)
- [ ] [Reading Stack Traces](https://www.freecodecamp.org/news/how-to-read-a-stack-trace/)

**OBJETIVO:** Romper el código intencionalmente y aprender a arreglarlo

**INSTRUCCIONES:**
Para cada bug, primero rómpelo, luego arréglalo y documenta qué aprendiste.

#### Bug 1: Validación Faltante
**ROMPER:**
1. Abre `backend/app/Http/Controllers/Inventario/EquipoController.php`
2. En método `store()`, comenta la validación de 'activo':
   ```php
   $validated = $request->validate([
       // 'activo' => 'required|string|unique:equipos,activo',
       'serial' => 'required|string|unique:equipos,serial',
       // ...
   ]);
   ```

**PROBAR:**
- Intenta crear equipo sin número de activo
- ¿Qué error aparece?
- ¿Dónde aparece el error? (consola, network, backend logs)

**ARREGLAR:**
- Descomenta la validación
- Agrega mensaje personalizado en español

**DOCUMENTAR:**
```
¿Qué aprendí?
- Sin validación, BD rechaza con error SQL
- Error 500 vs 422: diferencia
- Importancia de validar en backend
```

#### Bug 2: Estado Asíncrono Incorrecto
**ROMPER:**
1. Abre `frontend/src/features/equipos/pages/EquipoFormPage.jsx`
2. En `handleSubmit`, quita el `await`:
   ```javascript
   // ANTES:
   const response = await api.post('/equipos', formData)
   
   // DESPUÉS (ROTO):
   const response = api.post('/equipos', formData)
   navigate('/equipos')
   ```

**PROBAR:**
- Crea un equipo
- ¿Se redirige antes de guardar?
- ¿El equipo se guarda?

**ARREGLAR:**
- Agrega el `await` de nuevo
- ¿Por qué es importante?

**DOCUMENTAR:**
```
¿Qué aprendí?
- async/await controla el orden de ejecución
- Sin await, no espera respuesta del servidor
- Puede causar inconsistencias en la UI
```

#### Bug 3: Foreign Key Violación
**ROMPER:**
1. Crea varios equipos con un tipo específico (ej: "Laptop")
2. Intenta ELIMINAR ese tipo de equipo desde la interfaz

**PROBAR:**
- ¿Qué error sale?
- ¿Es claro para el usuario?

**ARREGLAR:**
- En `TipoEquipoController.php`, método `destroy()`:
   ```php
   public function destroy($id)
   {
       $tipo = TipoEquipo::findOrFail($id);
       
       // Verificar si tiene equipos asociados
       $cantidadEquipos = $tipo->equipos()->count();
       
       if ($cantidadEquipos > 0) {
           return response()->json([
               'message' => "No se puede eliminar. Hay {$cantidadEquipos} equipos con este tipo."
           ], 400);
       }
       
       $tipo->delete();
       return response()->json(['message' => 'Tipo eliminado correctamente']);
   }
   ```

**DOCUMENTAR:**
```
¿Qué aprendí?
- Las relaciones en BD tienen restricciones
- Foreign keys evitan inconsistencias
- Siempre validar antes de eliminar
```

#### Bug 4: Memory Leak con useEffect
**ROMPER:**
1. Abre `frontend/src/features/equipos/pages/EquipoListPage.jsx`
2. En useEffect, quita la limpieza:
   ```javascript
   useEffect(() => {
     fetchEquipos()
     // No hay return () => { ... }
   }, [])
   ```

3. Agrega un intervalo que actualice cada 5 segundos:
   ```javascript
   useEffect(() => {
     const interval = setInterval(() => {
       fetchEquipos()
     }, 5000)
     // NO AGREGUES cleanup
   }, [])
   ```

**PROBAR:**
- Abre la página de equipos
- Navega a otra página
- Abre DevTools → Console
- ¿Ves advertencias?

**ARREGLAR:**
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    fetchEquipos()
  }, 5000)
  
  return () => clearInterval(interval) // ← CLEANUP
}, [])
```

**DOCUMENTAR:**
```
¿Qué aprendí?
- useEffect debe limpiar sus efectos
- Intervalos/timeouts deben limpiarse
- Memory leaks pueden hacer la app lenta
```

#### Bug 5: Token Expirado
**ROMPER:**
1. Abre DevTools → Application → Local Storage
2. Cambia el token por uno inválido: `abc123fake`

**PROBAR:**
- Intenta acceder al dashboard
- ¿Qué pasa?

**ARREGLAR (si no funciona):**
- Verifica interceptor en `frontend/src/services/api.js`:
   ```javascript
   api.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         localStorage.clear()
         window.location.href = '/login'
       }
       return Promise.reject(error)
     }
   )
   ```

**DOCUMENTAR:**
```
¿Qué aprendí?
- Los tokens pueden expirar
- Interceptors manejan errores globalmente
- Importante redirigir a login si no autorizado
```

**COMMIT FINAL:**
```bash
git add .
git commit -m "docs: documentar bugs comunes y soluciones

- Validaciones faltantes
- Async/await incorrectos
- Foreign key violations
- Memory leaks en useEffect
- Manejo de tokens inválidos"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
📝 Bugs encontrados por mi cuenta: ____

---

### Ejercicio 3.2: Optimización de Queries (N+1 Problem)
**Tiempo estimado:** 2 horas
**Dificultad:** ⭐⭐⭐⭐☆

**LECTURAS PREVIAS (30 min):**
- [ ] [N+1 Query Problem](https://laravel.com/docs/11.x/eloquent-relationships#eager-loading)
- [ ] [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)

**OBJETIVO:** Identificar y resolver problema de N+1 queries

**PASOS:**

1. **Instalar Laravel Debugbar:**
   ```bash
   cd backend
   composer require barryvdh/laravel-debugbar --dev
   ```

2. **Identificar el problema:**
   - Abre `backend/app/Http/Controllers/Inventario/EquipoController.php`
   - Método `index()` actual (MALO):
     ```php
     public function index()
     {
         return response()->json(Equipo::all());
     }
     ```
   - Esto hace 1 query para equipos + 1 query POR CADA equipo para tipo
   - Si tienes 50 equipos = 51 queries! 😱

3. **Verificar:**
   - Abre http://backend.test/api/equipos
   - Mira la barra de debug abajo
   - ¿Cuántas queries se ejecutan?

4. **ARREGLAR con Eager Loading:**
   ```php
   public function index()
   {
       return response()->json(Equipo::with('tipoEquipo')->get());
   }
   ```
   - Ahora solo 2 queries (1 equipos + 1 tipos)

5. **Aplicar en TODOS los controllers:**
   - EquipoController: `show()`, `stats()`
   - TipoEquipoController: donde uses relaciones

**VERIFICACIÓN:**
- [ ] Debugbar muestra máximo 5 queries por request
- [ ] Tiempos de respuesta menores a 100ms
- [ ] No hay queries duplicadas

**COMMIT:**
```bash
git add .
git commit -m "perf: resolver N+1 queries con eager loading

- Usar with('tipoEquipo') en todos los index
- Instalar debugbar para monitoring
- Reducción de 50+ queries a 2 queries"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas

---

## ⚫ FASE 4: MINI-PROYECTOS (Semana 5-8)

### Proyecto A: Módulo de Proveedores
**Tiempo estimado:** 10-12 horas
**Dificultad:** ⭐⭐⭐⭐⭐

**LECTURAS PREVIAS (2 horas):**
- [ ] Repasa TODOS los conceptos anteriores
- [ ] [Laravel Resource Controllers](https://laravel.com/docs/11.x/controllers#resource-controllers)

**OBJETIVO:** Crear módulo completo desde cero (como ejercicio de consolidación)

**ESPECIFICACIONES:**

#### Base de Datos
```sql
CREATE TABLE proveedores (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nit VARCHAR(50) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(255),
    direccion TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

ALTER TABLE equipos ADD COLUMN proveedor_id BIGINT UNSIGNED;
ALTER TABLE equipos ADD FOREIGN KEY (proveedor_id) REFERENCES proveedores(id);
```

#### Backend (Sin guía paso a paso - hazlo tú)
- [ ] Migración para tabla proveedores
- [ ] Migración para agregar proveedor_id a equipos
- [ ] Modelo Proveedor con relación `hasMany(Equipo::class)`
- [ ] Modelo Equipo actualizar con `belongsTo(Proveedor::class)`
- [ ] ProveedorController con 7 métodos (index, show, store, update, destroy, equipos, estadisticas)
- [ ] Rutas en api.php
- [ ] Validaciones: nombre required, nit unique, email opcional pero válido

#### Frontend (Sin guía paso a paso - hazlo tú)
- [ ] ProveedorListPage - Tabla con lista
- [ ] ProveedorFormPage - Crear/editar
- [ ] ProveedorDetailPage - Ver proveedor + sus equipos
- [ ] Agregar en EquipoFormPage: Dropdown para seleccionar proveedor
- [ ] Agregar en EquipoTable: Columna "Proveedor"
- [ ] Rutas en router.jsx

**VERIFICACIÓN FINAL:**
- [ ] Puedo crear, editar, ver y eliminar proveedores
- [ ] Puedo asignar proveedor a un equipo
- [ ] En página de proveedor veo todos sus equipos
- [ ] No puedo eliminar proveedor con equipos asociados
- [ ] Validaciones funcionan (nit único, email válido)

**COMMIT:**
```bash
git add .
git commit -m "feat: módulo completo de proveedores

- CRUD completo backend (controller, model, migrations)
- CRUD completo frontend (list, form, detail pages)
- Relación equipos -> proveedor
- Validaciones y manejo de errores"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
💪 Nivel de orgullo: __ / 10

---

### Proyecto B: Dashboard con Gráficas (Chart.js)
**Tiempo estimado:** 8-10 horas
**Dificultad:** ⭐⭐⭐⭐☆

**LECTURAS PREVIAS (1 hora):**
- [ ] [Chart.js Docs](https://www.chartjs.org/docs/latest/)
- [ ] [React Chart.js 2](https://react-chartjs-2.js.org/)

**OBJETIVO:** Dashboard visual con gráficas interactivas

**PASOS:**

1. **Instalar Chart.js:**
   ```bash
   cd frontend
   npm install chart.js react-chartjs-2
   ```

2. **Backend - Nuevos Endpoints de Estadísticas:**

   **EquipoController.php:**
   ```php
   public function equiposPorMes()
   {
       $meses = [];
       for ($i = 5; $i >= 0; $i--) {
           $fecha = now()->subMonths($i);
           $meses[] = [
               'mes' => $fecha->format('M Y'),
               'total' => Equipo::whereYear('created_at', $fecha->year)
                   ->whereMonth('created_at', $fecha->month)
                   ->count()
           ];
       }
       return response()->json($meses);
   }

   public function equiposPorEstado()
   {
       $estados = Equipo::selectRaw('estado, COUNT(*) as total')
           ->groupBy('estado')
           ->get();
       return response()->json($estados);
   }
   ```

   **Rutas:**
   ```php
   Route::get('equipos/por-mes', [EquipoController::class, 'equiposPorMes']);
   Route::get('equipos/por-estado', [EquipoController::class, 'equiposPorEstado']);
   ```

3. **Frontend - Componentes de Gráficas:**

   **Crear** `frontend/src/components/charts/LineChart.jsx`:
   ```jsx
   import { Line } from 'react-chartjs-2'
   import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend
   } from 'chart.js'

   ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend
   )

   export default function LineChart({ data, title }) {
     const chartData = {
       labels: data.map(item => item.mes),
       datasets: [{
         label: 'Equipos creados',
         data: data.map(item => item.total),
         borderColor: 'rgb(239, 68, 68)',
         backgroundColor: 'rgba(239, 68, 68, 0.1)',
         tension: 0.4
       }]
     }

     const options = {
       responsive: true,
       plugins: {
         legend: { position: 'top' },
         title: { display: true, text: title }
       }
     }

     return <Line data={chartData} options={options} />
   }
   ```

   **Crear** `frontend/src/components/charts/PieChart.jsx` (similar, usa Pie en lugar de Line)

4. **Actualizar DashboardPage.jsx:**
   ```jsx
   import LineChart from '../../components/charts/LineChart'
   import PieChart from '../../components/charts/PieChart'

   const [equiposPorMes, setEquiposPorMes] = useState([])
   const [equiposPorEstado, setEquiposPorEstado] = useState([])

   useEffect(() => {
     const fetchCharts = async () => {
       const [mesRes, estadoRes] = await Promise.all([
         api.get('/equipos/por-mes'),
         api.get('/equipos/por-estado')
       ])
       setEquiposPorMes(mesRes.data)
       setEquiposPorEstado(estadoRes.data)
     }
     fetchCharts()
   }, [])

   // En el JSX, agregar:
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
     <div className="bg-white p-6 rounded-xl shadow-md">
       <LineChart data={equiposPorMes} title="Equipos Registrados (últimos 6 meses)" />
     </div>
     <div className="bg-white p-6 rounded-xl shadow-md">
       <PieChart data={equiposPorEstado} title="Distribución por Estado" />
     </div>
   </div>
   ```

**VERIFICACIÓN:**
- [ ] Gráfica de línea muestra últimos 6 meses
- [ ] Gráfica de pastel muestra distribución por estado
- [ ] Colores personalizados y legibles
- [ ] Responsive en mobile

**COMMIT:**
```bash
git add .
git commit -m "feat(dashboard): agregar gráficas con Chart.js

- Line chart: equipos por mes (últimos 6)
- Pie chart: distribución por estado
- Componentes reutilizables LineChart y PieChart
- Responsive y animaciones"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas

---

## 🚀 FASE 5: INTEGRACIÓN NODE.JS + FIREBASE (Semana 9-13)

### Proyecto Final: Sistema de Tickets
**Tiempo estimado:** 25-30 horas
**Dificultad:** ⭐⭐⭐⭐⭐

**LECTURAS PREVIAS (3-4 horas):**
- [ ] [Node.js Express Tutorial](https://expressjs.com/en/starter/installing.html)
- [ ] [Firebase Setup](https://firebase.google.com/docs/web/setup)
- [ ] [Firestore CRUD](https://firebase.google.com/docs/firestore/quickstart)
- [ ] [Firebase Auth](https://firebase.google.com/docs/auth/web/start)

**OBJETIVO:** Sistema híbrido - Laravel (inventario) + Node.js (tickets)

**ARQUITECTURA:**
```
┌─────────────────────┐         ┌──────────────────────┐
│   FRONTEND REACT    │ ←──────→ │  BACKEND LARAVEL     │
│   (Puerto 5173)     │         │  (backend.test)       │
│                     │         │  MySQL                │
└──────────┬──────────┘         └───────────────────────┘
           │
           ├──────────────────────────────────┐
           │                                  │
           ▼                                  ▼
┌─────────────────────┐         ┌──────────────────────┐
│  BACKEND NODE.JS    │         │   FIREBASE           │
│  (Puerto 3000)      │ ←──────→ │   Firestore          │
│  Express            │         │   (Cloud Database)    │
└─────────────────────┘         └──────────────────────┘
```

Este es TU PROYECTO FINAL. Te daré la estructura inicial, pero debes completarlo.

**Estructura del Servidor Node.js:**
```
ticket-service/
├── package.json
├── .env
├── src/
│   ├── config/
│   │   └── firebase.js
│   ├── routes/
│   │   └── tickets.js
│   ├── controllers/
│   │   └── ticketController.js
│   └── server.js
└── README.md
```

**SETUP INICIAL (Te lo doy completo):**

1. **Crear proyecto Node.js:**
   ```bash
   cd C:\Users\Dev\Herd\Inventory
   mkdir ticket-service
   cd ticket-service
   npm init -y
   npm install express cors dotenv firebase-admin
   ```

2. **Archivo package.json:**
   ```json
   {
     "name": "ticket-service",
     "type": "module",
     "scripts": {
       "dev": "node src/server.js"
     },
     "dependencies": {
       "express": "^4.18.2",
       "cors": "^2.8.5",
       "dotenv": "^16.3.1",
       "firebase-admin": "^12.0.0"
     }
   }
   ```

3. **Configurar Firebase:**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea proyecto "gsa-inventory"
   - Settings → Service Accounts → Generate Key
   - Guarda JSON como `ticket-service/firebase-key.json`

4. **Archivo .env:**
   ```
   PORT=3000
   FIREBASE_KEY_PATH=./firebase-key.json
   LARAVEL_API_URL=https://backend.test/api
   ```

5. **src/config/firebase.js:**
   ```javascript
   import admin from 'firebase-admin'
   import { readFileSync } from 'fs'

   const serviceAccount = JSON.parse(
     readFileSync(process.env.FIREBASE_KEY_PATH, 'utf8')
   )

   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount)
   })

   export const db = admin.firestore()
   ```

**TU TAREA (Sin código completo - debes investigar):**

#### Parte 1: Backend Node.js (8 horas)
- [ ] Crear `src/server.js` con Express básico
- [ ] Ruta POST `/api/tickets` - Crear ticket
- [ ] Ruta GET `/api/tickets` - Listar tickets
- [ ] Ruta GET `/api/tickets/:id` - Ver ticket específico
- [ ] Ruta POST `/api/tickets/:id/mensajes` - Agregar mensaje
- [ ] Ruta PUT `/api/tickets/:id/cerrar` - Cerrar ticket
- [ ] CORS configurado para aceptar requests desde React

**Pistas:**
```javascript
// Crear ticket en Firestore
const ticketRef = db.collection('tickets').doc()
await ticketRef.set({
  equipo_id: req.body.equipo_id,
  titulo: req.body.titulo,
  descripcion: req.body.descripcion,
  estado: 'abierto',
  usuario_email: req.body.usuario_email,
  created_at: admin.firestore.FieldValue.serverTimestamp()
})
```

#### Parte 2: Integración Laravel → Node.js (4 horas)
- [ ] En Laravel, crear `TicketService.php` que llame a Node.js
- [ ] Nuevo controller `TicketController.php` en Laravel
- [ ] Ruta en Laravel: `POST /api/equipos/{id}/reportar-problema`
- [ ] Usar `Http::post()` de Laravel para llamar a Node.js

**Pista:**
```php
use Illuminate\Support\Facades\Http;

$response = Http::post('http://localhost:3000/api/tickets', [
    'equipo_id' => $equipoId,
    'titulo' => $request->titulo,
    // ...
]);
```

#### Parte 3: Frontend React (10-12 horas)
- [ ] Nueva carpeta `frontend/src/features/tickets/`
- [ ] TicketListPage.jsx - Ver todos los tickets
- [ ] TicketDetailPage.jsx - Ver ticket + mensajes en tiempo real
- [ ] TicketFormModal.jsx - Crear ticket desde página de equipo
- [ ] Botón "Reportar Problema" en EquipoDetailPage
- [ ] Real-time updates con `onSnapshot` de Firestore

**Pista para tiempo real:**
```javascript
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'

useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'tickets', ticketId, 'mensajes'),
    (snapshot) => {
      const mensajes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMensajes(mensajes)
    }
  )
  
  return () => unsubscribe()
}, [ticketId])
```

#### Parte 4: Testing y Refinamiento (6 horas)
- [ ] Probar flujo completo: Crear equipo → Reportar problema → Agregar mensajes
- [ ] Manejo de errores (qué pasa si Node.js está caído)
- [ ] Loading states
- [ ] Notificaciones toast

**VERIFICACIÓN FINAL:**
- [ ] Puedo crear ticket desde página de equipo
- [ ] Los tickets se guardan en Firestore (verificar en Firebase Console)
- [ ] Los mensajes aparecen en tiempo real
- [ ] Puedo cerrar tickets
- [ ] Laravel y Node.js se comunican correctamente

**COMMIT FINAL:**
```bash
git add .
git commit -m "feat: sistema completo de tickets con Node.js + Firebase

ARQUITECTURA HÍBRIDA:
- Backend Node.js + Express (puerto 3000)
- Base de datos Firestore (mensajes tiempo real)
- Integración Laravel ←→ Node.js
- Frontend React con Firebase SDK
- WebSockets automáticos via Firestore

FEATURES:
- Crear ticket desde equipo
- Chat en tiempo real
- Cerrar tickets
- Historial completo"
```

✅ Completado: __ / __ / 2026
⏱️ Tiempo real: _____ horas
🎉 NIVEL ALCANZADO: FULLSTACK DEVELOPER

---

## 📊 MÉTODO DE PRÁCTICA ADICIONAL

### Técnica "Destroy & Rebuild"
**Objetivo:** Solidificar conocimiento reconstruyendo desde cero

**NIVEL 1: Reconstruir Componente**
1. Elimina `EquipoFormPage.jsx`
2. Recréalo desde memoria
3. Compara con el commit anterior
4. ¿Qué olvidaste? Anótalo

**NIVEL 2: Reconstruir Feature**
1. Elimina TODO el módulo de tipos de equipo (backend + frontend)
2. Recréalo completo en 2 horas
3. Sin mirar el código anterior (solo docs de Laravel/React)

**NIVEL 3: Reconstruir Proyecto**
1. Crea nuevo branch: `git checkout -b rebuild-from-scratch`
2. Elimina backend/ y frontend/
3. Recréalo COMPLETO en 1 semana
4. ¿Lo lograste sin ayuda? ✅ ERES SENIOR

---

## 📝 NOTAS FINALES

### Cómo Usar Esta Guía

1. **Lee el ejercicio completo** antes de empezar
2. **Haz las lecturas previas** (no las saltes)
3. **Intenta sin mirar la solución** primero
4. **Documenta tus errores** (son tus mejores maestros)
5. **Haz commits frecuentes** (cada 30-60 min de trabajo)
6. **Celebra cada logro** (pequeño o grande)

### Cuando Te Trabas

1. **Lee el error completo** (no solo la primera línea)
2. **Google el error exacto** (copia-pega mensaje)
3. **Revisa docs oficiales** (Laravel/React)
4. **Pregunta específicamente**: "No funciona X" ❌ → "Cuando hago Y, obtengo error Z" ✅
5. **Toma descansos** (cada 90 minutos, 15 min de descanso)

### Señales de Progreso

✅ **Estás aprendiendo bien si:**
- Puedes explicar código en voz alta
- Los errores tienen sentido para ti
- Puedes predecir qué hará el código antes de ejecutarlo
- Empiezas a ver patrones repetitivos
- Puedes hacer cambios sin romper todo

❌ **Necesitas cambiar enfoque si:**
- Solo copias y pegas sin entender
- Cada error te paraliza
- No puedes explicar qué hace tu código
- Evitas leer documentación
- Te frustras al primer intento fallido

---

## 🎯 OBJETIVO FINAL (3 meses)

Al terminar este plan, deberías poder:

1. ✅ Explicar cada línea de código del proyecto
2. ✅ Crear un CRUD completo en 2 horas
3. ✅ Debuggear errores sin ayuda
4. ✅ Integrar Laravel con Node.js
5. ✅ Trabajar con bases de datos relacionales y NoSQL
6. ✅ Implementar autenticación segura
7. ✅ Optimizar queries y performance
8. ✅ Presentar tu trabajo profesionalmente

**Cuando logres todo esto, estarás listo para el freelance en 2026.** 💪🏆

---

## 📞 SOPORTE

Si después de intentar 30+ minutos sigues trabado:
1. Documenta QUÉ intentaste
2. Documenta QUÉ error obtuviste
3. Documenta QUÉ esperabas que pasara
4. Pregunta ESPECÍFICAMENTE

**Recuerda:** No hay preguntas tontas, solo preguntas mal formuladas. 😊

---

## 🏆 CERTIFICACIÓN PERSONAL

Cuando completes TODAS las fases, crea un video de 15 minutos mostrando:
1. Arquitectura del proyecto (dibujada)
2. Demo de todas las features
3. Explicación de 3 partes complejas del código
4. Mostrar un bug y cómo lo arreglas en vivo

Sube el video a YouTube (puede ser no listado) y agrega el link a tu portfolio.

**Esto vale más que cualquier certificado de Udemy.** 🎓

---

Última actualización: 31 de diciembre de 2025
Versión: 1.0
Autor: Sistema de Aprendizaje GSA Inventory
