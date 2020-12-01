<template>
  <v-card
  :loading="loading"
  >
    <v-card-title>
      <v-row>
        <v-col cols="10"> Information </v-col>
        <v-col cols="2">
          <v-btn text> Edit </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <p>{{storeInfo?storeInfo.name:null}}</p>
      <p>Shop details</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    props:{
        storeInfo:{
            required:true,
            default:null
        },
        loading:{
            type:Boolean,
            required:true
        }
    }
}
</script>

<style>
</style>