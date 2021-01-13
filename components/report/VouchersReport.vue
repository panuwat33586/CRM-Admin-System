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
          label="select"
          v-model="selectType"
          @change="selectSortType"
          :items="sortTypes"
          outlined
          dense
          style="width: 200px"
        />
      </v-col>
    </v-row>
    <VouchersReportTable :voucherList="voucherList"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VouchersReportTable from './VouchersReportTable'
export default {
  components: {
    VouchersReportTable,
  },
  data() {
    return {
      startDate:null,
      endDate:null,
      selectType: 'usedDate',
      sortTypes: [
        { text: 'used date', value: 'usedDate' },
        { text: 'remaining points', value: 'remainingPoints' },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('vouchers/fetchMembersVoucherList')
  },
  computed: {
    voucherList() {
      return this.$store.getters['vouchers/sortedMembersVoucherList']
      (this.startDate,this.endDate,this.selectType)
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
</style>