<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBitacoraStore } from '../stores/bitacoraStore'
import inputBase from '../components/inputBase.vue'

const bitacoraStore = useBitacoraStore()

// const bitacoraTransacciones = ref([])
// const tipoSeleccionado = ref('')

const obtenerBitacora = async () => {
  try {
    const response = await fetch('http://localhost:3002/bitacora/obtenerBitacora')
    const bitacora = await response.json()
    bitacora.forEach((transaccion) => {
      const fecha = new Date(transaccion.fecha)
      transaccion.fecha = fecha.toLocaleString('es-CR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Costa_Rica'
      })
    })
    bitacoraStore.bitacoraTransacciones.value = bitacora
    // console.log('Transacciones:', bitacoraStore.bitacoraTransacciones.value)
  } catch (error) {
    console.error('Error a obtener bitacora:', error)
  }
}

const filtrarBitacora = () => {
  const tipo = bitacoraStore.tipoSeleccionado.value
  console.log('Tipo seleccionado para filtrar:', tipo)
  if (tipo) {
    const filtrados = bitacoraStore.bitacoraTransacciones.value.filter(
      (transaccion) => transaccion.tipo === tipo
    )
    console.log('Transacciones filtradas:', filtrados)
    return filtrados
  } else {
    return bitacoraStore.bitacoraTransacciones.value
  }
}

const bitacoraFiltrada = computed(() => filtrarBitacora())

// console.log('Transacciones filtradas:', filtrarBitacora())
onMounted(() => {
  obtenerBitacora()
})
</script>

<template>
  <h1>Bitácora de Transacciones</h1>
  <div>
    <label for="filtro-transaccion">Filtrar por tipo de transacción:</label>
    <select id="filtro-transaccion" v-model="bitacoraStore.tipoSeleccionado">
      <option value="">Todos</option>
      <option value="Creación de Cuenta">Creación de Cuenta</option>
      <option value="Actualización Tipo de Cambio">Actualización Tipo de Cambio</option>
      <option value="Traslado de fondos">Traslado de fondos</option>
      <option value="Eliminación de Cuenta">Eliminación de Cuenta</option>
      <option value="Edicion de cuenta">Edición de cuenta</option>
    </select>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Tipo de Transacción</th>
          <th scope="col">Detalle</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bitacora in bitacoraFiltrada" :key="bitacora.id">
          <th scope="row">{{ bitacora.tipo }}</th>
          <td>{{ bitacora.detalle }}</td>
          <td>{{ bitacora.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
