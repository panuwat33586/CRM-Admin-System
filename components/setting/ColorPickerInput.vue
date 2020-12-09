<template>
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="color"
            outlined
            dense
            :label="label"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
         <v-color-picker 
              :value="color"
              dot-size="25"
              swatches-max-height="200" 
              @input="(color)=>$emit('update:color',color)"
              />
      </v-menu>
</template>

<script>
export default {
    data(){
        return {
            menu:false
        }
    },
    props:{
        label:
        {
            type:String,
            required:true
        },
        color:
        {
            required:true    
        }
    },
}
</script>

<style>

</style>