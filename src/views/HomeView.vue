<script setup>
import { ref, computed, onMounted } from 'vue'
import inputBase from '../components/inputBase.vue'

const obtenerTotalCuentas = async () => {
  try {
    const response = await fetch('http://localhost:3001/home/cuenta/obtenerCuentas')
    const cuentas = await response.json()
    cuentasRegistradas.value = cuentas
  } catch (error) {
    console.error('Error a obtener cuentas:', error)
  }
}
const cuentasRegistradas = ref([])

onMounted(() => {
  obtenerTotalCuentas()
})
</script>

<template>
  <div>
    <h2>Detalle de Cuentas</h2>
    <ul>
      <li v-for="cuenta in cuentasRegistradas" :key="cuenta.id">
        {{ cuenta.nombre }}- Cta {{ cuenta.cuenta }}- Saldo {{ cuenta.saldo }}
      </li>
    </ul>
  </div>

  <p>
    <input type="submit" value="Editar" />
    <input type="submit" value="trasladar" />
  </p>
</template>
