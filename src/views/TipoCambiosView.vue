<script setup>
import { ref, computed, onMounted } from 'vue'
import inputBase from '../components/inputBase.vue'

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

    alert('Tipos de cambio guardados correctamente')

    obtenerTipoCambio()
		
  } catch (error) {
    console.err('Error al guardar tipos de cambio:', error)
  }
}
</script>

<template>
  <div>
    <h2>Tipos de Cambio</h2>
    <label for="tipoCambioCompra">Tipo de Cambio Compra:</label>
    <input type="number" v-model="tipoCambioCompra" id="tipoCambioCompra" />
    <br />
    <label for="tipoCambioVenta">Tipo de Cambio Venta:</label>
    <input type="number" v-model="tipoCambioVenta" id="tipoCambioVenta" />
    <br />

    <button @click="guardarTipoCambio">Guardar Tipos de Cambio</button>
  </div>
</template>
