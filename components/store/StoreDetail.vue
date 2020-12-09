<template>
  <v-card>
  <v-skeleton-loader
 type="card"
 :boilerplate="true"
 :loading="app.skeletonLoader"
>
    <v-card-title>
      <v-row>
        <v-col> Information </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <p>{{storeInfo?storeInfo.name:null}}</p>
      <p>Shop details</p>
    </v-card-text>
  </v-skeleton-loader>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
        storeInfo:{
            required:true,
            default:null
        }
    },
    computed:{
       ...mapState(['app'])
    },
}
</script>

<style>
</style>