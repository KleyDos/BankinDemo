<script setup>
import { ref, computed } from 'vue'
import inputBase from '../components/inputBase.vue'
import Swal from 'sweetalert2'


const nombre = ref(null)
const cuenta = ref(null)
const moneda = ref(null)
const saldo = ref(null)
const showlabel = () => {
  if (nombre.value && cuenta.value && moneda.value && saldo.value) return true
  else return false
}

const detalleCta = computed(() => {
  return `${nombre.value} Cta ${cuenta.value} moneda ${moneda.value} saldo ${saldo.value} `
})

const checkForm = async () => {
  //hacer validacion de todos los datos reglas: nombre= tenga 2 palabras, cuenta 17 caracteres, moneda exista y saldo que tenga valor
  if (!nombre.value.includes(' ')) {
    console.log('Nombre debe contener al menos dos palabras')
    // alert('Nombre debe contener al menos dos palabras')
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Nombre debe contener al menos dos palabras'
    })
		return
  }
  if (cuenta.value.length !== 3) {
    console.log('Cuenta debe contener 3 caracteres')
    // alert('Cuenta debe contener 3 caracteres')
     Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Cuenta debe contener 3 caracteres'
    })
		return
  }
  if (!moneda.value) {
    console.log('Falta seleccionar la moneda')
    // alert('Falta seleccionar la moneda')
Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Falta seleccionar la moneda'
    })
		return
  }
  if (!saldo.value) {
    console.log('Falta ingresar el saldo')
    // alert('Falta ingresar el saldo')
     Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Falta ingresar el saldo'
    })
		return
  }
  /// completa solo el .value
  // if (!cuenta.cuenta !== detalleCta.value.cuenta) {
  //   console.log('Cuenta ya existe')
  //   alert('Esta cuenta ya se encuentra registrada')
  //   return
  // }

  console.log('form submit')
  const data = {
    nombre: nombre.value,
    cuenta: cuenta.value,
    moneda: moneda.value,
    saldo: saldo.value
  }
	try {
  const response = await fetch('http://localhost:3002/cuenta/agregarCuentaDB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
	const responseData = await response.json()
    console.log(responseData)

    // Mostrar alerta de éxito
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cuenta registrada de forma exitosa',
      showConfirmButton: false,
      timer: 2500
    })

    // Limpiar los campos después del guardado exitoso
    nombre.value = null
    cuenta.value = null
    moneda.value = null
    saldo.value = null
  } catch (error) {
    console.error('Error al guardar la cuenta:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ha ocurrido un error al guardar la cuenta. Por favor, intenta nuevamente.'
    })
  }
}
const tiposMoneda = [
  { id: 0, simbolo: '₡' },
  { id: 1, simbolo: '$' },
  { id: 2, simbolo: 'Eur' }
]
</script>

<template>
  <h1>Registro de Cuentas</h1>
  <form @submit.stop.prevent="checkForm">
    <div class="form-group w-50 m-auto">
      <label for="nombre">Nombre de Cuenta</label>
      <input
        inputLabel="Nombre"
        type="text"
        v-model="nombre"
        name="nombre"
        id="nombre"
        placeholder="Ingrese nombre"
        class="form-control w-100 m-auto"
      />
    </div>

    <div class="form-group w-50 m-auto">
      <label for="cuenta">Cuenta</label>
      <input
        inputLabel="Cuenta"
        type="text"
        v-model="cuenta"
        name="cuenta"
        id="cuenta"
        placeholder="No. de cuenta"
        class="form-control w-100 m-auto"
      />
    </div>
    <p>
      <label for="moneda"  >Moneda</label>
      <select id="moneda" v-model="moneda" class="form-select w-10 m-auto" name="moneda">
        <option v-for="tipo in tiposMoneda"  :key="tipo.id">{{ tipo.simbolo }}</option>
      </select>
    </p>

    <div class="form-group w-50 m-auto">
      <label for="saldo">Saldo</label>
      <input
        inputLabel="Saldo"
        type="number"
        v-model="saldo"
        placeholder="Ingrese saldo "
        name="saldo"
        id="saldo"
        class="form-control w-100 m-auto"
      />
    </div>
    <br />
    <p v-if="showlabel()">{{ detalleCta }}</p>
    <p>
      <button type="submit" class="btn btn-primary btn-lg">Registrar cuenta</button>
    </p>
  </form>


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
