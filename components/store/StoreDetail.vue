<template>
  <v-card>
  <v-skeleton-loader
 type="card"
 :boilerplate="true"
 :loading="app.skeletonLoader"
>
    <v-card-title>
      <v-row>
        <v-col cols="10"> Information </v-col>
        <v-col cols="2">
          <v-btn @click="triggerStoreEditModal" text> Edit </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <p>{{storeInfo?storeInfo.name:null}}</p>
      <p>Shop details</p>
    </v-card-text>
  </v-skeleton-loader>
    <EditStoreModal 
    :storeInfo="storeInfo"
    :isOpen="storeEditModal" 
    @onCloseModal="triggerStoreEditModal"/>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import EditStoreModal from './EditStoreModal'
export default {
  components:{
     EditStoreModal
  },
  data(){
     return {
         storeEditModal:false
     }
  },
    props:{
        storeInfo:{
            required:true,
            default:null
        }
    },
    computed:{
       ...mapState(['app'])
    },
  methods:{
    triggerStoreEditModal(){
      this.storeEditModal=!this.storeEditModal
    }
  }
}
</script>

<style>
</style>