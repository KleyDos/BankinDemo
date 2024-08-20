import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBitacoraStore = defineStore('bitacora', () => {
  const bitacoraTransacciones = ref([])
  const tipoSeleccionado = ref(localStorage.getItem('tipoSeleccionado') || '')

  const setTipoSeleccionado = (tipo) => {
    tipoSeleccionado.value = tipo || ""
    localStorage.setItem('tipoSeleccionado', tipo || "")
  }

  const clearTipoSeleccionado = () => {
    tipoSeleccionado.value = ''
    localStorage.removeItem('tipoSeleccionado')
  }
  return {
    bitacoraTransacciones,
    tipoSeleccionado,
    setTipoSeleccionado,
    clearTipoSeleccionado
  }
})
