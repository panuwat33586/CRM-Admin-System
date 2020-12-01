<template>
  <v-layout
  fill-height
  align-center
  justify-center
  >
   <LoginForm/>
  </v-layout>
</template>

<script>
import LoginForm from '@/components/LoginForm'
export default {
  layout:'firstPage',
  components: {
     LoginForm
  },
}
</script>
