<template>
  <v-dialog 
  width="700px"
  :value="isOpen" 
  @input="closeModal">
    <v-card @click:outside="closeModal">
      <v-card-text> 
        <v-row>
          <v-col>
         <v-text-field
         label="name"
         dense
         outlined
         />
         </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:{
     isOpen:{
       type:Boolean,
       required:true
     },
     storeInfo:{
       type:Object
     }
  },
  methods: {
    closeModal() {
      this.$emit('onCloseModal')
    },
  },
}
</script>

<style>
</style>