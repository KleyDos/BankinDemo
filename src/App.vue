<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowRightFromBracket)
library.add(faBars)

///pinia
///confirmar eliminar cta*******listo
///acceso con el usuario a todo*** listo***
///alertas*****lista
///ajustar formato de fecha de la bitacora****listo****
///bitacota filtro por tipo de transacción****listo****
///Cambiar icono en botton de eliminar Eje libreria font awesome***listo
///al estar logiado se vean todas las opciones (v-if) ****listo
///que no se vea el tab de reg****listo
/// al estar conectado que no se vea el login ni registro***listo
///ajustar tamaños de input ***** listo
///Encriptar contraseñas bcrypt y comparar****listo

////Al refrescar no se salga*****listo
////Añadir el nombre del usuario al estar logeado****listo
////Añadir botton para logout****listo
////Opciones desplegables en la parte lateral
////Añadir un boton en el registro para volver a login****listo

const authStore = useAuthStore()
const router = useRouter()
const isMenuVisible = ref(false)
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
const logout = () => {
  authStore.logout()
  router.push('/login')
}
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}
</script>

<template>
  <div>
    <header class="custom-header bg-primary text-white">

        <div class="container d-flex justify-content-between align-items-center">
          <router-link class="navbar-brand" to="/"></router-link>
          <div class="d-flex align-items-center ms-auto">
            <span v-if="authStore.isAuthenticated" class="me-3">
               Bienvenido, {{ authStore.usuario }}</span
            >
            <button
              v-if="authStore.isAuthenticated"
              @click="logout"
              type="button"
              class="btn btn-outline-light"
            >
              <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /> Logout
            </button>
<button
        v-if="authStore.isAuthenticated"
        class="btn btn-primary mb-3"
        type="button"
        @click="toggleMenu"
      >

        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
        </div>
      </div>
    </header>

    <main class="container mt-3">


      <div id="layout" v-if="isMenuVisible" class="list-group">
        <router-link class="list-group-item list-group-item-action" to="/"
          >Detalle de Cuentas</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/registro"
          >Registro de Cuentas</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/tipoCambios"
          >Registro de Tipos de Cambio</router-link
        >
        <router-link class="list-group-item list-group-item-action" to="/bitacora"
          >Bitacora Transaccional</router-link
        >
      </div>

      <router-view />
    </main>
    <!--
    <nav class="navbar navbar-expand-lg navbar-blue bg-blue">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Detalle de cuentas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/registro">Registro de Cuentas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tipoCambios"
                >Registro de Tipos de Cambio</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/bitacora">Bitacora Transaccional</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>

  <div id="layout"> -->
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <!-- <header> -->
    <!-- <div class="wrapper">
        <nav>
          <RouterLink v-if="authStore.isAuthenticated" to="/">Home</RouterLink>
          <RouterLink v-if="authStore.isAuthenticated" to="/registro"
            >Registro de Cuentas</RouterLink
          >
          <RouterLink v-if="authStore.isAuthenticated" to="/tipoCambios"
            >Registro de Tipos de Cambio</RouterLink
          >
          <RouterLink v-if="authStore.isAuthenticated" to="/bitacora"
            >Bitacora Transaccional</RouterLink
          >
        </nav>
      </div> -->
    <!-- </header> -->

    <!-- <RouterView /> -->
  </div>
</template>

<style scoped>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #37b82c;
}
body {
  front-family: Avenir, Helvetica, Arial, sans-serif;
}
header {
  position: fixed;
  width: 100;
  z-index: 1000;
	border-radius: 4px 4px 4px 4px;
	overflow: hidden;
}
.custom-header {
  background-color: hwb(234 38% 13%); }
main {
  padding-top: 65px; /* Ajusta este valor según la altura del header */
}
/* nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #7266d8;
}
nav a.router-link-exact-active {
  color: #42b983;
}
h2 {
  font-size: 20px;
}
div button {
  font-weight: bold;
  float: right;
  color: hsl(0, 0%, 2%);
  background: none;
  border: none;
  cursor: pointer;
}
nav .usuario {
  float: right;
  margin-left: auto;
  font-weight: bold;
  color: #5a53c3;
} */
</style>

