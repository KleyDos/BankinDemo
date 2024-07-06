<script setup>
import { ref, computed, onMounted } from 'vue'
import inputBase from '../components/inputBase.vue'
import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faPenToSquare)

// export default {
//   name: 'BotonConIcono'
// }
// Vue.component('font-awesome-icon', FontAwesomeIcon)

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

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
  Swal.fire({
    title: '¿Estás seguro que desea eliminar?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, elimínalo!',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3002/home/eliminarCuenta/${cuenta._id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          obtenerTotalCuentas()
          Swal.fire('¡Eliminado!', 'La cuenta ha sido eliminada.', 'success')
        } else {
          const responsedata = await response.json()
          Swal.fire('Error', responsedata.message, 'error')
        }
      } catch (error) {
        console.error('Error al eliminar cuenta:', error)
        Swal.fire('Error', 'Error al eliminar cuenta', 'error')
      }
    }
  })
}

const trasladoCuenta = () => {
  mostrarTraslado.value = true
}

const realizarTraslado = async () => {
  if (!cuentaOrigen.value || !cuentaDestino.value) {
    // alert('Debe seleccionar cuenta de origen y cuenta destino')
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe seleccionar cuenta de origen y cuenta destino'
    })
    return
  }
  if (monto.value <= 0) {
    console.log('Falta ingresar el monto')
    // alert('Falta ingresar el monto')
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Falta ingresar el monto'
    })
    return
  }

  try {
    const data = {
      cuentaOrigenId: cuentaOrigen.value._id,
      cuentaDestinoId: cuentaDestino.value._id,
      monto: monto.value
    }
    if (cuentaOrigen.value.saldo < monto.value) {
      console.log('Fondos Insuficientes')
      // alert('Fondos Insuficientes')
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Fondos Insuficientes'
      })
      return
    }
    if (cuentaOrigen.value === cuentaDestino.value) {
      console.log('Debe elegir una Cuenta Destino diferenta a la Cuenta Origen')
      // alert('Debe elegir una Cuenta Destino diferenta a la Cuenta Origen')
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe elegir una Cuenta Destino diferente a la Cuenta Origen'
      })
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
    // alert(responsedata.message)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Traslado exitoso',
      showConfirmButton: false,
      timer: 2500
    })
  } catch (error) {
    console.error('Error al realizar el traslado de fondos:', error)
    // alert('Error al realizar el traslado de fondos')
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al realizar el traslado de fondos'
    })
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
    if (response.ok) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cuenta editada exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      // Manejar posibles errores devueltos por el servidor
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al editar',
        text: responsedata.message || 'Error desconocido',
        showConfirmButton: true
      })
    }
    obtenerTotalCuentas()
  } catch (error) {
    console.error('Error al editar:', error)
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error al editar',
      text: 'Error de red o servidor',
      showConfirmButton: true
    })
  }
}
const tipoCambioCompra = ref(null)
const tipoCambioVenta = ref(null)

const obtenerTiposCambio = async () => {
  try {
    const response = await fetch('http://localhost:3002/obtenerTiposCambio')
    const tipoCambio = await response.json()
    tipoCambioCompra.value = tipoCambio.tipoCambioCompra
    tipoCambioVenta.value = tipoCambio.tipoCambioVenta
    console.log('tipoCambioCompra es', tipoCambioCompra)
  } catch (error) {
    console.error('Error a obtener tipos de cambio:', error)
  }
}

onMounted(() => {
  obtenerTiposCambio()
})
</script>

<template>
  <div>
    <h2>Detalle de Cuentas</h2>
    <!--tabla con columnas nombres th tr-->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Cuenta</th>
          <th scope="col">Moneda</th>
          <th scope="col">saldo</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cuenta in cuentasRegistradas" :key="cuenta.id">
          <th scope="row">{{ cuenta.nombre }}</th>
          <td>{{ cuenta.cuenta }}</td>
          <td>{{ cuenta.moneda }}</td>
          <td>{{ cuenta.saldo }}</td>
          <button
            type="button"
            @click="editCuenta(cuenta)"
            data-bs-toggle="modal"
            data-bs-target="#editCuenta"
            class="btn btn-outline-primary"
          >

            <font-awesome-icon icon="pen-to-square" class="custom-icon" />
          </button>

          <button class="btn btn-outline-primary" type="button" @click="eliminarCuenta(cuenta)">
            <font-awesome-icon icon="trash" class="custom-icon" />
          </button>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container py-1">
    <div class="modal" id="editCuenta" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title w-50 m-auto">Cuenta a Editar</h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body w-50 m-auto">
            <form @submit.prevent="realizarEdit">
              <label for="nombre">Nuevo Nombre:</label>
              <input type="text" class="form-control" v-model="newNombre" id="nombre" />
              <br />
              <label for="cuenta">Nueva Cuenta:</label>
              <input type="text" class="form-control" v-model="newCuenta" id="cuenta" />
              <br />
              <label for="moneda">Nueva Moneda</label>
              <select id="moneda" v-model="newMoneda" class="form-select" name="moneda">
                <option v-for="tipo in tiposMoneda" :key="tipo.id">{{ tipo.simbolo }}</option>
              </select>
              <br />
              <button class="btn btn-primary" type="submit">Editar datos</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Editar Cta-->

  <!-- Trasladar Fondos-->
  <p>
    <button
      type="button"
      @click="trasladoCuenta"
      data-bs-toggle="modal"
      data-bs-target="#trasladoFondos"
      class="btn btn-primary btn-lg"
    >
      Trasladar Fondos
    </button>
  </p>

  <div class="container py-1">
    <div class="modal" id="trasladoFondos" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title w-50 m-auto">Seleccionar cuentas para traslado de fondos</h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body w-50 m-auto">
            <form @submit.prevent="realizarTraslado">
              <label for="cuentaOrigen">Cuenta Origen:</label>
              <select id="cuentaOrigen" class="form-control" v-model="cuentaOrigen">
                <option v-for="cuenta in cuentasRegistradas" :key="cuenta._id" :value="cuenta">
                  {{ cuenta.nombre }}
                </option>
              </select>

              <label for="cuentaDestino">Cuenta Destino:</label>
              <select id="cuentaDestino" class="form-control" v-model="cuentaDestino">
                <option v-for="cuenta in cuentasRegistradas" :key="cuenta._id" :value="cuenta">
                  {{ cuenta.nombre }}
                </option>
              </select>

              <label for="monto">Monto:</label>
              <input
                type="number"
                class="form-control"
                v-model="monto"
                placeholder="0.00"
                id="nombre"
              />
              <br />
              <button type="submit" class="btn btn-primary">Realizar Traslado</button>
            </form>
            <br />
            <h5>Tipos de Cambio</h5>

            <table class="default">
              <h6>Colones - Dólar</h6>
              <tr>
                <th>Compra</th>
                |
                <th>Venta</th>
              </tr>
              <tr>
                <td>₡: {{ tipoCambioCompra }}</td>
                |
                <td>₡: {{ tipoCambioVenta }}</td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-icon {
  background-color: #eaedf0;
  color: rgba(31, 9, 9, 0.205);
  border: none;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
}

.custom-icon {
  font-size: 5 em; /* Ajusta el tamaño del ícono */
}
</style>
