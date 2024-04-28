<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

// const router = useRouter()

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
  <div id="layout">
    <header>
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
      <h3>Tipos de Cambio</h3>

      <table class="default">
				<h4>Colones - Dólar</h4>
        <tr>
          <th>Compra</th> |
          <th>Venta</th>
        </tr>
        <tr>
          <td>₡: {{ tipoCambioCompra }}</td> |
          <td>₡: {{ tipoCambioVenta }}</td>
        </tr>
      </table>

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink> |
          <RouterLink to="/registro">Registro de Cuentas</RouterLink> |
          <RouterLink to="/tipoCambios">Registro de Tipos de Cambio</RouterLink> |
          <RouterLink to="/bitacora">Bitacora Transaccional</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
</style>
