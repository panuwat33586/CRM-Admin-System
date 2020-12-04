<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon :color="voucher.color">mdi-ticket-percent</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title> {{voucher.name}} </v-list-item-title>
      <v-list-item-subtitle> {{voucher.description}} </v-list-item-subtitle>
       <v-list-item-subtitle> expire on {{expireDate(voucher.expireDate)}} </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-row>
        <v-col>
          <span @click="triggerEditVoucherModal"> 
            <v-icon>mdi-file-edit</v-icon>
            </span>
        </v-col>
        <v-col>
          <span @click="deleteVoucher">
            <v-icon
            color="red"
            >mdi-delete</v-icon>
           </span>
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
import {convertDateFormat} from '@/helper'
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
        },
        expireDate(date){
          return convertDateFormat(date,'YYYY/MM/DD HH:mm:ss')
        }
    }
}
</script>

<style>
</style>