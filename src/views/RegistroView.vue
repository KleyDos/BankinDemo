<script setup>
import { ref, computed } from 'vue'
import inputBase from '../components/inputBase.vue'

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
    alert('Nombre debe contener al menos dos palabras')
    return
  }
  if (cuenta.value.length !== 3) {
    console.log('Cuenta debe contener 3 caracteres')
    alert('Cuenta debe contener 3 caracteres')
    return
  }
  if (!moneda.value) {
    console.log('Falta seleccionar la moneda')
    alert('Falta seleccionar la moneda')
    return
  }
  if (!saldo.value) {
    console.log('Falta ingresar el saldo')
    alert('Falta ingresar el saldo')
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
  const response = await fetch('http://localhost:3001/cuenta/agregarCuentaDB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => {
    return res.json()
  })

  console.log(response)
}


</script>

<template>
  <h1>Registro de Cuentas</h1>
  <form @submit.stop.prevent="checkForm">
    <input-base
      inputLabel="Nombre"
      type="text"
      v-model="nombre"
      name="nombre"
      id="nombre"
      placeholder="Nombre y Apellidos"
    >
    </input-base>

    <input-base
      inputLabel="Cuenta"
      type="text"
      v-model="cuenta"
      name="cuenta"
      id="cuenta"
      placeholder="No. Cuenta"
    >
    </input-base>

    <p>
      <label for="moneda">Moneda</label>
      <select id="moneda" v-model="moneda" name="moneda">
        <option v-for="tipo in tiposMoneda" :key="tipo.id">{{ tipo.simbolo }}</option>
      </select>
    </p>
    <input-base inputLabel="Saldo" type="number" v-model="saldo" placeholder="0.00"> </input-base>

    <p>
      <input type="submit" value="Enviar" />
    </p>
    <p v-if="showlabel()">{{ detalleCta }}</p>
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
