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
    <MemberVoucherTable :voucherList="voucherList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MemberVoucherTable from '@/components/members/MemberVoucherTable'
export default {
  components: {
    MemberVoucherTable,
  },
  data() {
    return {
      selectType: 'createAt',
      sortTypes: [
        { text: 'create at', value: 'createAt' },
        { text: 'expire date', value: 'expireDate' },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('vouchers/fetchMembersVoucherList')
  },
  computed: {
    voucherList() {
      return this.$store.getters['vouchers/filteredMembersVoucherList'](this.selectType)
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