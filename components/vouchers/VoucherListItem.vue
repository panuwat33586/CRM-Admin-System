<template>
  <v-list-item>
    <v-list-item-avatar
    tile
    :color="voucher.color"
    />
    <v-list-item-content>
      <v-list-item-title> {{voucher.name}} </v-list-item-title>
      <v-list-item-subtitle> {{voucher.description}} </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-row>
        <v-col>
          <v-btn @click="deleteVoucher" text> delete </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="triggerEditVoucherModal" text> edit </v-btn>
        </v-col>
      </v-row>
    </v-list-item-action>
    <EditVoucherModal 
    :isOpen="editVoucherModal" 
    @onCloseModal="triggerEditVoucherModal"
    :voucher="voucher"
    />
  </v-list-item>
</template>

<script>
import EditVoucherModal from './EditVoucherModal'
export default {
  data(){
     return {
         editVoucherModal:false
     }
  },
   components:{
      EditVoucherModal
   },
    props:{
        voucher:{
            type:Object,
            required:true
        }
    },
    methods:{
        deleteVoucher(){
            this.$store.dispatch('vouchers/deleteStoreVoucher',this.voucher)
        },
        triggerEditVoucherModal(){
            this.editVoucherModal=!this.editVoucherModal
        }
    }
}
</script>

<style>
</style>