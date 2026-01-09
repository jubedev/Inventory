BACKEND /
APP/ Contiene la lógica del backend. 
	HTTP/ Acá se almacena como se interactua entre las solicituds http como las respuesta de la api.
		CONTROLLERS/ Acá se almacenan los controladores del software, que se encargan de determinar como se van a menejar los datos en los distintos tipos de solicitudes http.
	MODELS/ Acá se definen los campos de la base de datos y las relaciones que tienen, además se pueden realizar funciones que interactuan directamente con la base de datos, como por ejemplo filtros o la obtencion de datos en cierto formato
	PROVIDERS/ Almacena servicios para la aplicacion (debo entenderlo mejor)
BOOTSTRAP/ No se
CONFIG/ Nunca lo he tocado, no se que puedo aprovechar de ahi, a excepcion del cors y de la conexion a la db
DATABASE/ Contiene lo que es la interacción directa con la estructura y datos de la base de datos, migraciones de bases de datos, seeders junto con factories para poblacion de la base de datos, el script de la base de datos etc.
PUBLIC/ no se que contiene y como se puede aprovechar
RESOURCES/ Esta carpeta es para trabajar el frontend con blade (yo no se usar blade)
ROUTES/ Aca se manejan las rutas del software, ya sea como api o para el frontend con blade
STORAGE/ Creo que pone la logica como el cache y esas cosas, aunque no se. ya que solo tiene .gitignore y los logs de laravel.
TESTS/ aca esta la logica de los test xunit y creo que tambien se puede usar para la documentacion con swagger
VENDOR/ librerias de composer
ya el resto de archivos son .env y demas archivos que genero la instalacion de laravel, como los paquetes json de composer y de node. el xml de las pruebas unitarias, la configuracion de vite, el archivo de artisa, gitignores y gitattibutes. 

FRONTEND/
	NODEMODUELES/ paquetes de nodejs
	PUBLIC/ contiene archivos que todo el software puede acceder facilmente
	SRC/
		COMPONENTS/ contiene los componentes que se suelen usar en React, ya sea como elementos reutilizables como formularios o que se repiten como el navbar.
		CONTEXT/ Logica de manejo de sesiones y acceso, creo que tambien se puede usar para logicas como estadisticas y cosas asi, no lo se.
		FEATURES/ Contiene todas las vistas del software divididas por tipo y por feature, ademas dentro de las carpetas tambien se encuentras sus componentes y las paginas.
		HOOKS/ Logica que se hace con hooks, tipo solititudes, manejo de estados y funciones asincronas.
		LAYOUTS/ Manejo de Layout que se usa en todo el software
		SERVICES/ Aca se guarda lo que son logica de servicios para el software (debo aprender mas).
		UTILS/ Logicas pequeñas reutilizables, como por ejemplo validaciones de campos, formateo de fechas, etc.
	DEMAS ARCHIVOS QUE SON CASI LO MISMO QUE EL BACKEND Y QUE SE PARA QUE FUNCIONAN