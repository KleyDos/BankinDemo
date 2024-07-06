import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // isAuthenticated: false,
    // usuario: null,
    usuario: localStorage.getItem('usuario') || null,
    isAuthenticated: !!localStorage.getItem('isAuthenticated')
  }),
  actions: {
    login(usuario) {
      this.isAuthenticated = true
      this.usuario = usuario
      localStorage.setItem("usuario", this.usuario)
      localStorage.setItem("isAuthenticated", true)
    },
    logout() {
      this.isAuthenticated = false
      this.usuario = null
      localStorage.removeItem('usuario')
      localStorage.removeItem('isAuthenticated')
    }
  }
})
