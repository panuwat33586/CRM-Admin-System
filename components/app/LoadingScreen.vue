<template>
  <v-overlay 
  :value="app.loading"
  z-index="100000"
  >
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
      Processing
    </v-overlay>
</template>

<script>
import {mapState} from 'vuex'
export default {
   computed:{
       ...mapState(['app'])
   }
}
</script>

<style>

</style>