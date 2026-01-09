que conlleva los movimientos de equipo. 
Este modulo solo es un registro de los movimientos de equipo. Mas no para editar o modificar algo.
este debe registrar la fecha del movimiento automaticamente.
la ubicacion que se registra en el formulario de equipos.
se debe registrar quien es la persona que esta involucrada en el movimiento, a quien se le asigna o si se envia a reparacion cual es el proveedor, o si se devuelve que la persona registrada sea la persona de it, esto se hace automaticamente cuando realizamos el movimiento.
Cuando el estado de un equipo se cambia ya sea a disponible, en uso en mantenimiento y demas, se debe registrar: el id del equipo, si se asigna a que acta va, tambien el usuario al que va asignado, luego tambien el tipo de movimiento que se esta realizando que tambien se haria automaticamente.

function movimientosInventario (fecha_movimiento, ubicacion_destino, proveedor_cliente_involucrado, observaciones, equipo_id, usuario_id, actas_id, tipo_movimiento_id) {
	1. Realizar un movimiento de equipos (En uso, disponibles, mantenimiento)
	2. Registrar el equipo
	3. Registrar el usuario
	4. Asignar un acta o actualizar el acta con el nuevo equipo
	5. Registrar el tipo de movimiento
	6. Registrar la ubicacion a la cual va el equipo (Edificio, Ciudad, Etc)
}