<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-subheader> Sort by </v-subheader>
      </v-col>
      <v-col cols="10">
        <v-select
          label="select"
          @change="selectSortType"
          :items="sortTypes"
          outlined
          dense
          style="width: 200px"
        />
      </v-col>
    </v-row>
    <TransactionsTable :transactionList="transactionList" />
  </div>
</template>

<script>
import TransactionsTable from '@/components/transactions/TransactionsTable'
export default {
  data(){
    return {
       selectType:'timestamp',
       sortTypes:[
         {text:'create at',value:'timestamp'},
         {text:'points',value:'points'}]
    }
   },
    mounted(){
       this.$store.dispatch('transactions/fetchTransactionList')
   },
  components: {
    TransactionsTable,
  },
  computed: {
    transactionList() {
      return this.$store.getters['transactions/filterTransactionsList'](this.selectType)
    },
  },
  methods:{
     selectSortType(type){
             this.selectType=type
         }
  }
}
</script>

<style>
.transaction-report-container {
  margin-top: 20px;
}
</style>