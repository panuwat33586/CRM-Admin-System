<template>
  <div>
    <v-card>
      <v-card-title> 
        Transactions 
      </v-card-title>
      <v-card-text>
        <Searchbar :searchConditionList="searchConditionList" @onSearch="searchTransaction"/>
        <TransactionsTable :transactionList="transactions.searchTransactionList"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import TransactionsTable from '@/components/transactions/TransactionsTable'
import {mapState} from 'vuex'
export default {
  components:{
    Searchbar,
    TransactionsTable
  },
  created(){
      this.$store.dispatch('transactions/fetchTransactionList')
  }, 
  computed:{
      ...mapState(['transactions'])
  },
  data(){
    return{
      searchConditionList:[
        {text:'name',value:'name'},
        {text:'receipt Id',value:'receiptId'},
        {text:'mobile',value:'member.mobile'}
      ]
    }
  },
  methods:{
    searchTransaction(payload){
      this.$store.dispatch('transactions/searchTransaction',payload)
    }
  }
}
</script>

<style>
</style>