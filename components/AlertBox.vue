<template>
  <v-alert 
  :type='notification.type'
  transition="slide-x-reverse-transition"
  outlined
  height="100px"
  dismissible
  width="400px"
  :value="notification.status"
  >
       {{notification.message}}
  </v-alert>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            notification:(state)=>state.app.notification
        })
    }
}
</script>

<style>

</style>