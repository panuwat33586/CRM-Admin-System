<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="pageLength"
      :total-visible="1"
      @next="next"
      @previous="previous"
    ></v-pagination>
  </div>
</template>

<script>
export default {
     data(){
         return{
             page:1
         }
     },
     props:{
         pageLength:{
             type:Number,
             required:true
         },
         next:{
           type:Function,
           required:true
         },
         previous:{
           type:Function,
           required:true
         }
     }
}
</script>

<style>

</style>