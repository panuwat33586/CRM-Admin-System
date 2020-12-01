<template>
  <v-card 
  :color="voucher.color" dark>
    <v-card-title class="headline">
        {{voucher.name?voucher.name:'Name'}}
        </v-card-title>
    <v-card-text>
      {{voucher.description?voucher.description:'description'}}
    </v-card-text>
    <v-card-actions>
        <v-flex class="text-right">
        <v-row>
          <v-col> {{ voucher.points?voucher.points:'xxxx' }} points </v-col>
          <v-col>
            <v-btn> exchange </v-btn>
          </v-col>
        </v-row>
        </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props:{
       voucher:{
           type:Object,
           required:true
       }
    }
}
</script>

<style>
</style>