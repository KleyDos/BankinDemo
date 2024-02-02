<script setup>
import { defineModel } from 'vue'
//  onMounted(()=>{
// emit("hello",{mensaje: "componente listo", number: 5 })
//  } )

const emit = defineEmits(['update:modelValue'])
const onInput = (e) => {
  emit(`update:modelValue`, e.target.value)
}

defineProps({
  inputLabel: {
    type: String,
    required: true,
    default: 'label'
  },
  placeholder: {
    type: String
  },
  name: {
    type: String
  },
  id: {
    type: String
  },
  type: {
		type: String
	},

  modelValue: String
})
//Conectar con Mongo Atlas
//Guardar el registro
</script>

<template>
  <p>
    <label :for="inputLabel">{{ inputLabel }}: </label>
    <input :id="id" :type= "type" :value="modelValue" @input="onInput" :name="name" :placeholder="placeholder" />
  </p>
</template>



