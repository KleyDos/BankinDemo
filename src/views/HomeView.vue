<script setup>
import { ref, computed, onMounted } from 'vue'
import inputBase from '../components/inputBase.vue'

const cuentasRegistradas = ref([])
const cuentaOrigen = ref(null)
const cuentaDestino = ref(null)
const monto = ref(null)
const newNombre = ref(null)
const newCuenta = ref(null)
const newMoneda = ref(null)
const mostrarEdit = ref(false)
const cuentaPorEditar = ref(null)
const mostrarTraslado = ref(false)
const tiposMoneda = [
  { id: 0, simbolo: '₡' },
  { id: 1, simbolo: '$' },
  { id: 2, simbolo: 'Eur' }
]

const obtenerTotalCuentas = async () => {
  try {
    const response = await fetch('http://localhost:3002/home/obtenerCuentas')
    const cuentas = await response.json()
    cuentasRegistradas.value = cuentas
  } catch (error) {
    console.error('Error a obtener cuentas:', error)
  }
}

onMounted(() => {
  obtenerTotalCuentas()
})

const eliminarCuenta = async (cuenta) => {
  console.log('cuenta es:', cuenta)
  try {
    const response = await fetch(`http://localhost:3002/home/eliminarCuenta/${cuenta._id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      obtenerTotalCuentas()
      alert('La cuenta se elimino exitosamente')
    } else {
      const responsedata = await response.json()
      alert(responsedata.message)
      // console.error('Error al eliminar cuenta:')
      // alert('Error al eliminar cuenta', response.message)
    }
  } catch (error) {
    console.error('Error al eliminar cuenta:', error)
    alert('Error al eliminar cuenta:')
  }
}

const trasladoCuenta = () => {
  mostrarTraslado.value = true
}

const realizarTraslado = async () => {
  if (!cuentaOrigen.value || !cuentaDestino.value) {
    alert('Debe seleccionar cuenta de origen y cuenta destino')
    return
  }
  if (monto.value <= 0) {
    console.log('Falta ingresar el monto')
    alert('Falta ingresar el monto')
    return
  }
  // if (cuentaOrigen.value.moneda !== cuentaDestino.value.moneda) {
  //   console.log('No es posible trasladar fondos de monedas distintas')
  //   alert('No es posible trasladar fondos de monedas distintas')
  //   return
  // }

  try {
    const data = {
      cuentaOrigenId: cuentaOrigen.value._id,
      cuentaDestinoId: cuentaDestino.value._id,
      monto: monto.value
    }
    if (cuentaOrigen.value.saldo < monto.value) {
      console.log('Fondos Insuficientes')
      alert('Fondos Insuficientes')
      return
    }
    if (cuentaOrigen.value === cuentaDestino.value) {
      console.log('Debe elegir una Cuenta Destino diferenta a la Cuenta Origen')
      alert('Debe elegir una Cuenta Destino diferenta a la Cuenta Origen')
      return
    }

    const response = await fetch('http://localhost:3002/home/trasladarFondos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responsedata = await response.json()
    obtenerTotalCuentas()
    alert(responsedata.message)
  } catch (error) {
    console.error('Error al realizar el traslado de fondos:', error)
    alert('Error al realizar el traslado de fondos')
  }
}

const editCuenta = (cuenta) => {
  cuentaPorEditar.value = cuenta
  newNombre.value = cuenta.nombre
  newCuenta.value = cuenta.cuenta
  newMoneda.value = cuenta.moneda
  mostrarEdit.value = true
}
const realizarEdit = async () => {
  try {
    const data = {
      cuentaId: cuentaPorEditar.value._id,
      nuevoNombre: newNombre.value,
      nuevaCuenta: newCuenta.value,
      nuevaMoneda: newMoneda.value
    }
    const response = await fetch('http://localhost:3002/home/EditarCuenta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responsedata = await response.json()
    alert(responsedata.message)

    obtenerTotalCuentas()
  } catch (error) {
    console.error('Error al editar:', error)
    alert('Error al editar')
  }
}
</script>

<template>
  <div>
    <h2>Detalle de Cuentas</h2>
    <!--tabla con columnas nombres th tr-->

    <table class="default">
      <tr>
        <th>Nombre</th>
        <th>Cuenta</th>
        <th>Monto</th>
        <th>Saldo</th>
        <th>Acciones</th>
      </tr>
      <tr v-for="cuenta in cuentasRegistradas" :key="cuenta.id">
        <td>
          {{ cuenta.nombre }}
        </td>
        <td>{{ cuenta.cuenta }}</td>
        <td>{{ cuenta.moneda }}</td>
        <td>{{ cuenta.saldo }}</td>
        <button @click="editCuenta(cuenta)">Editar</button>
        <button @click="eliminarCuenta(cuenta)">Eliminar</button>
      </tr>
    </table>
  </div>

  <!-- Editar Cta-->
  <div v-if="mostrarEdit">
    <h3>Cuenta a editar</h3>

    <form @submit.prevent="realizarEdit">
      <label for="nombre">Nuevo Nombre:</label>
      <input type="text" v-model="newNombre" id="nombre" />
      <br />
      <label for="cuenta">Nueva Cuenta:</label>
      <input type="text" v-model="newCuenta" id="cuenta" />
      <br />
      <label for="moneda">Nueva Moneda</label>
      <select id="moneda" v-model="newMoneda" name="moneda">
        <option v-for="tipo in tiposMoneda" :key="tipo.id">{{ tipo.simbolo }}</option>
      </select>
      <br />
      <button @click="realizarEdit(cuenta)" type="submit">Editar datos</button>
    </form>
  </div>

  <!-- Trasladar Fondos-->
  <p>
    <button @click="trasladoCuenta">Trasladar Fondos</button>
  </p>

  <div v-if="mostrarTraslado">
    <h3>Seleccionar cuentas para traslado de fondos</h3>
    <form @submit.prevent="realizarTraslado">
      <label for="cuentaOrigen">Cuenta Origen:</label>
      <select id="cuentaOrigen" v-model="cuentaOrigen">
        <option v-for="cuenta in cuentasRegistradas" :key="cuenta._id" :value="cuenta">
          {{ cuenta.nombre }}
        </option>
      </select>

      <label for="cuentaDestino">Cuenta Destino:</label>
      <select id="cuentaDestino" v-model="cuentaDestino">
        <option v-for="cuenta in cuentasRegistradas" :key="cuenta._id" :value="cuenta">
          {{ cuenta.nombre }}
        </option>
      </select>
      <input-base inputLabel="Monto" type="number" v-model="monto" placeholder="0.00"> </input-base>

      <button type="submit">Realizar Traslado</button>
    </form>
  </div>
</template>
