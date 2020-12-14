<template>
  <div class="text-center">
    <v-pagination
      :value="page"
      :length="pageLength"
      @next="nextPage"
      @previous="prevPage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
     props:{
         page:{
            type:Number,
            required:true
         },
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
     },
     methods:{
       nextPage(){
              this.next()
       },
       prevPage(){
              this.previous()
       }
     }
}
</script>

<style>

</style>