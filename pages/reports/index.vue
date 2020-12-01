<template>
  <v-card>
      <v-card-title>
          Reports
      </v-card-title>
      <v-card-text>
      <v-tabs
      v-model="tab"
      >
          <v-tab>
            members
          </v-tab>
           <v-tab>
            transactions
          </v-tab>
           <v-tab>
            vouchers
          </v-tab>
      </v-tabs>
      <v-tabs-items
      v-model="tab"
      >
          <v-tab-item>
             <MembersReport/>
          </v-tab-item>
          <v-tab-item>
              <TransactionsReport/>
          </v-tab-item>
          <v-tab-item>
             <VouchersReport/>
          </v-tab-item>
      </v-tabs-items>
      </v-card-text>
  </v-card>
</template>

<script>
import MembersReport from '@/components/report/MembersReport'
import TransactionsReport from '@/components/report/TransactionsReport'
import VouchersReport from '@/components/report/VouchersReport'
export default {
    components:{
        MembersReport,
        TransactionsReport,
        VouchersReport
    },
    data(){
        return{
            tab:null
        }
    }
}
</script>

<style>

</style>