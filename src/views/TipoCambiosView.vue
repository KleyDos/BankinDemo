<script setup>
import { ref, computed, onMounted } from 'vue'
import inputBase from '../components/inputBase.vue'
import Swal from 'sweetalert2'

const tipoCambioCompra = ref(null)
const tipoCambioVenta = ref(null)
const tipoCambioRegistrado = ref(null)

const obtenerTipoCambio = async () => {
  try {
    const response = await fetch('http://localhost:3002/obtenerTiposCambio')
    const data = await response.json()
    tipoCambioRegistrado.value = data
  } catch (error) {
    console.error('Error a obtener tipos de cambio:', error)
  }
}

onMounted(() => {
  obtenerTipoCambio()
})

const guardarTipoCambio = async () => {
  try {
    await Promise.all([
      fetch('http://localhost:3002/tipoCambio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipoCambioCompra: tipoCambioCompra.value,
          tipoCambioVenta: tipoCambioVenta.value
        })
      })
    ])

    console.log('Tipos de cambio guardados correctamente')

    // alert('Tipos de cambio guardados correctamente')
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha actualizado el Tipo de Cambio',
      showConfirmButton: false,
      timer: 1500
    })
    obtenerTipoCambio()
  } catch (error) {
    console.err('Error al guardar tipos de cambio:', error)
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error al guardar tipos de cambio',
      text: 'Ha ocurrido un error, por favor intenta nuevamente',
      showConfirmButton: true
    })
  }
}
</script>

<template>
  <div>
    <h4>Tipos de Cambio</h4>
    <br />
    <div class="form-group w-100 m-auto">
      <label for="tipoCambioCompra">Tipo de Cambio Compra:</label>
      <input
        type="number"
        v-model="tipoCambioCompra"
        placeholder="0.00"
        id="tipoCambioCompra"
        class="form-control w-100 m-auto"
      />

      <br />
      <label for="tipoCambioVenta">Tipo de Cambio Venta:</label>

      <input
        type="number"
        v-model="tipoCambioVenta"
        placeholder="0.00"
        id="tipoCambioVenta"
        class="form-control w-100 m-auto"
      />
    </div>
    <br />

    <button type="button" @click="guardarTipoCambio" class="btn btn-primary btn-lg">
      Guardar Tipos de Cambio
    </button>
  </div>
</template>
