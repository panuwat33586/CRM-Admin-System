<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col> Vouchers </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
            <v-card>
                 <v-toolbar color="indigo">
                     <v-btn
                     @click="triggerModal"
                     >
                         create voucher
                     </v-btn>
                </v-toolbar>
               <v-card-text>
              <v-list three-line>
                <v-skeleton-loader
                type='list-item-avatar-three-line'
                :loading="app.skeletonLoader"
                >
                <template 
                v-for="(voucher,$voucherIndex) in vouchers.storeVoucherList">
                   <VoucherListItem :voucher="voucher" :key="$voucherIndex"/>
                  <v-divider :key="'divider'+ $voucherIndex" />
                </template>
                </v-skeleton-loader>
              </v-list>
              </v-card-text>
              </v-card>
      </v-card-text>
    </v-card>
    <CreateVoucherModal 
    :isOpen="createVoucherModal"
    @onCloseModal="triggerModal"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CreateVoucherModal from '@/components/vouchers/CreateVoucherModal'
import VoucherListItem from '@/components/vouchers/VoucherListItem'
export default {
  data() {
    return {
        createVoucherModal:false
    }
  },
  components:{
    CreateVoucherModal,
    VoucherListItem
  },
  created(){
      this.$store.dispatch('vouchers/fetchStoreVoucherList')
  },
  computed:{
     ...mapState(['app','vouchers'])
  },
  methods:{
    triggerModal(){
      this.createVoucherModal=!this.createVoucherModal
    }
  }
}
</script>

<style>

</style>