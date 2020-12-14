<template>
  <div>
    <v-card>
      <v-card-title> 
        Transactions 
      </v-card-title>
      <v-card-text>
        <Searchbar :searchConditionList="searchConditionList" @onSearch="searchTransaction"/>
        <TransactionsTable :transactionList="searchTransactionList"/>
      </v-card-text>
      <Pagination
      :pageLength="pageLength"
      :page="page"
      :next="nextPage"
      :previous="prevPage"
      />
    </v-card>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
import TransactionsTable from '@/components/transactions/TransactionsTable'
import Pagination from '@/components/Pagination'
import {mapState} from 'vuex'
export default {
  middleware:'routesGuard',
  components:{
    Searchbar,
    TransactionsTable
  },
  created(){
      this.$store.dispatch('transactions/fetchTransactionList')
  }, 
  computed:{
      ...mapState(['transactions']),
      pageLength(){
        return Math.ceil(this.transactions.searchTransactionList.length/this.limit)
      },
      searchTransactionList(){
        const firstElement=(this.page*this.limit)-this.limit
        const lastElement=this.page*this.limit
        return this.transactions.searchTransactionList.slice(
          firstElement,lastElement
          )
      }
  },
  data(){
    return{
      page:1,
      limit:3,
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
    },
    nextPage(){
        this.page+=1
    },
    prevPage(){
       this.page-=1
    }
  }
}
</script>

<style>
</style>