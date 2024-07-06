<script setup>
import { ref, computed } from 'vue'
import inputBase from '../components/inputBase.vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const nombre = ref(null)
const idUsuario = ref(null)
const usuario = ref(null)
const contraseña = ref(null)

const router = useRouter()


const registrarUsuario = async () => {
  const data = {
    nombre: nombre.value,
    idUsuario: idUsuario.value,
    usuario: usuario.value,
    contraseña: contraseña.value
  }
  try {
    const response = await fetch('http://localhost:3002/registroUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const errorData = await response.json()
      console.log('ErorrData es:', errorData)
      throw new Error(errorData.mensaje)
    }
    const responseData = await response.json()
    console.log(responseData)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario registra de forma exitosa',
      showConfirmButton: true,
      confirmButtonText: "Login"
    }).then(()=>{
			router.push("login")
		})
    nombre.value = null
    idUsuario.value = null
    usuario.value = null
    contraseña.value = null
  } catch (err) {
    console.error(err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message || 'Ha ocurrido un error al guardar el Usuario. Por favor, intenta nuevamente.'
    })
  }
}
</script>

<template>
  <h1>Registro de Usuario</h1>
  <form @submit.prevent="registrarUsuario">
    <div class="form-group w-50 m-auto">
      <label for="nombre">Nombre </label>
      <input
        inputLabel="Nombre"
        type="text"
        v-model="nombre"
        name="nombre"
        id="nombre"
        placeholder="Ingrese nombre"
        aria-describedby="emailHelp"
        class="form-control w-50 m-auto"
      />
    </div>
    <div class="form-group w-50 m-auto">
      <label for="idUsuario">Identificación</label>
      <input
        inputLabel="ID"
        type="text"
        v-model="idUsuario"
        name="idUsuario"
        id="idUsuario"
        placeholder="0-0000-0000"
        class="form-control w-50 m-auto"
      />
    </div>
    <div class="form-group w-50 m-auto">
      <label for="usuario"> Usuario </label>
      <input
        inputLabel="usuario"
        type="text"
        v-model="usuario"
        name="usuario"
        id="usuario"
        placeholder="Ingrese usuario"
        aria-describedby="emailHelp"
        class="form-control w-50 m-auto"
      />
    </div>
    <div class="form-group w-50 m-auto">
      <label for="Contraseña">Contraseña</label>
      <input
        inputLabel="Contraseña"
        type="password"
        v-model="contraseña"
        name="contraseña"
        id="contraseña"
        placeholder="Contraseña"
        class="form-control w-50 m-auto"
      />
    </div>
    <br />

    <button type="submit" value="Registrar" class="btn btn-primary">Registrar Usuario</button>
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
