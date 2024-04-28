<script setup>
import { ref, computed, onMounted } from 'vue'
import inputBase from '../components/inputBase.vue'

const bitacoraTransacciones = ref([])

const obtenerBitacora = async () => {
  try {
    const response = await fetch('http://localhost:3002/bitacora/obtenerBitacora')
    const bitacora = await response.json()
    bitacoraTransacciones.value = bitacora
  } catch (error) {
    console.error('Error a obtener bitacora:', error)
  }
}

onMounted(() => {
  obtenerBitacora()
})
</script>

<template>
  <h1>Bitácora de Transacciones</h1>
<div>
<table class="default">
      <tr>
        <th>Tipo de Transacción</th>
        <th>Detalle</th>
        <th>Fecha</th>

      </tr>
      <tr v-for="bitacora in bitacoraTransacciones" :key="bitacora.id">
        <td>
{{bitacora.tipo}}
        </td>
        <td>{{bitacora.detalle}}</td>
        <td>{{bitacora.fecha}}</td>
        <td></td>

      </tr>
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
