<template>
  <div>
    <v-row>
      <v-col cols="3">
        <DatePicker :date.sync="startDate" label="start date" />
      </v-col>
      <v-col cols="3">
        <DatePicker :date.sync="endDate" label="end date" />
      </v-col>
      <v-col cols="3">
        <v-select
          label="sort by"
          v-model="selectType"
          @change="selectSortType"
          :items="sortTypes"
          outlined
          dense
          style="width: 200px"
        />
      </v-col>
    </v-row>
    <TransactionsTable :transactionList="transactionList" />
    <Pagination 
    :page="page" 
    :pageLength="pageLength"
    :next="nextPage"
    :previous="prevPage"
    />
  </div>
</template>

<script>
import TransactionsTable from "@/components/transactions/TransactionsTable";
import DatePicker from "@/components/DatePicker";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      page: 1,
      limit: 20,
      startDate: null,
      endDate: null,
      selectType: "timestamp",
      sortTypes: [
        { text: "create at", value: "timestamp" },
        { text: "points", value: "points" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("transactions/fetchTransactionList");
  },
  components: {
    TransactionsTable,
    DatePicker,
    Pagination,
  },
  computed: {
    sortedTransactionList() {
      return this.$store.getters["transactions/sortedTransactionsList"](
        this.startDate,
        this.endDate,
        this.selectType
      );
    },
    pageLength() {
      return Math.ceil(this.sortedTransactionList.length / this.limit);
    },
    transactionList() {
      const firstElement = this.page * this.limit - this.limit;
      const lastElement = this.page * this.limit;
      return this.sortedTransactionList.slice(firstElement, lastElement);
    },
  },
  methods: {
    selectSortType(type) {
      this.selectType = type;
    },
    searchByDate() {
      this.$store.dispatch("transactions/fetchTransactionListByDate", {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
    nextPage(){
        this.page+=1
    },
    prevPage(){
       this.page-=1
    }
  },
};
</script>

<style>
.transaction-report-container {
  margin-top: 20px;
}
</style>
