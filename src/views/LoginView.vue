<script setup>
import { ref } from 'vue'
import inputBase from '../components/inputBase.vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const usuario = ref('')
const contraseña = ref('')

//implementar para poner el nombre
// const username = ref("")
// const password = ref("")

// const handleLogin =()=>{
// 	if (username.value && password.value){
// 		authStore.login(username.value)
// 		router.push("/")
// 	}else {
// 		alert("Por favor ingrese su usuario y contraseña")
// 	}
// }

const iniciarSesion = async () => {
  const data = { usuario: usuario.value, contraseña: contraseña.value }
  try {
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (response.ok) {
      authStore.login(usuario.value)
      console.log('nombreUsuario es:', usuario)
      router.push('/')
      console.log('Inicio de sesión exitoso')
    } else {
      console.error(result.mensaje)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o Contraseña son incorrectas'
      })
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-8">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-2">
                <h2 class="fw-bold mb-2 text-uppercase">Ingreso</h2>
                <br />
                <form @submit.prevent="iniciarSesion">
                  <div data-mdb-input-init class="form-outline form-white mb-4">
                    <input
                      v-model="usuario"
                      inputLabel="usuario"
                      type="text"
                      id="usuario"
                      class="form-control form-control-lg"
                      placeholder="Ingrese usuario"
                    />
                  </div>
                  <div data-mdb-input-init class="form-outline form-white mb-4">
                    <input
                      v-model="contraseña"
                      inputLabel="Contraseña"
                      type="password"
                      id="contraseña"
                      class="form-control form-control-lg"
                      placeholder="Ingrese contraseña"
                    />
                  </div>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    value="login"
                  >
                    Login
                  </button>
                </form>
                <div>
                  <br />
                </div>

                <p class="mb-0">
									<router-link to="/registroUser" class="text-white-50 fw-bold" > Registrar</router-link>
                  <!-- <a href="/registroUser" class="text-white-50 fw-bold">Registrar</a> -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
