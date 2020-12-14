<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-subheader> Sort by </v-subheader>
      </v-col>
      <v-col cols="10">
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
      selectType: 'expireDate',
      sortTypes: [
        { text: 'expire date', value: 'expireDate' },
        { text: 'quantity', value: 'quantity' },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('vouchers/fetchMembersVoucherList')
  },
  computed: {
    voucherList() {
      return this.$store.getters['vouchers/sortedMembersVoucherList'](this.selectType)
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