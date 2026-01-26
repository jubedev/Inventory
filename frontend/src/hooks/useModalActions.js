import { useState } from 'react'

/**
 * Hook reutilizable para manejar acciones de modales (crear, editar, eliminar)
 * @param {Object} options - Opciones de configuración
 * @param {Function} options.createFunction - Función para crear
 * @param {Function} options.updateFunction - Función para actualizar
 * @param {Function} options.deleteFunction - Función para eliminar
 * @param {Function} options.onSuccess - Callback después de acción exitosa
 * @param {Object} options.messages - Mensajes personalizados
 * @returns {Object} Estado y funciones para manejar modales
 */
export const useModalActions = ({
  createFunction,
  updateFunction,
  deleteFunction,
  onSuccess,
  messages = {}
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const defaultMessages = {
    createSuccess: 'Registro creado exitosamente',
    updateSuccess: 'Registro actualizado exitosamente',
    deleteSuccess: 'Registro eliminado exitosamente',
    deleteConfirm: '¿Estás seguro de eliminar este registro?',
    ...messages
  }

  /**
   * Abre el modal para crear
   */
  const handleCreate = () => {
    setSelectedItem(null)
    setIsModalOpen(true)
  }

  /**
   * Abre el modal para editar
   */
  const handleEdit = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  /**
   * Maneja la eliminación con confirmación
   */
  const handleDelete = async (id) => {
    if (window.confirm(defaultMessages.deleteConfirm)) {
      const result = await deleteFunction(id)
      if (result.success) {
        alert(defaultMessages.deleteSuccess)
        if (onSuccess) onSuccess()
      } else {
        alert(`Error: ${result.error}`)
      }
    }
  }

  /**
   * Maneja el envío del formulario (crear o actualizar)
   */
  const handleSubmit = async (data) => {
    console.log('handleSubmit llamado con', data)
    console.log('selectedItem', selectedItem)
    
    let result
    if (selectedItem) {
      console.log('Actualizando registro', selectedItem.id)
      result = await updateFunction(selectedItem.id, data)
    } else {
      console.log('Creando nuevo registro')
      result = await createFunction(data)
    }

    console.log('Resultado', result)

    if (result.success) {
      setIsModalOpen(false)
      alert(selectedItem ? defaultMessages.updateSuccess : defaultMessages.createSuccess)
      if (onSuccess) onSuccess()
    } else {
      alert(`Error: ${result.error}`)
    }
  }

  /**
   * Cierra el modal
   */
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return {
    // Estado
    isModalOpen,
    selectedItem,
    
    // Setters
    setIsModalOpen,
    setSelectedItem,
    
    // Handlers
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeModal
  }
}
