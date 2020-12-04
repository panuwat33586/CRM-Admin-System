<template>
  <v-data-table
    :headers="headers"
    :items="transactionList"
    :hide-default-footer="true"
  >
    <template v-slot:[`item.member`]="{ item }">
      {{item.member.firstName}} {{item.member.lastName}}
    </template>
    <template v-slot:[`item.timestamp`]="{ item }">
      {{ dateFormat(item.timestamp) }}
    </template>
  </v-data-table>
</template>

<script>
import { convertDateFormat } from '@/helper'
export default {
  data() {
    return {
      headers: [
        {
          text: 'member',
          value: 'member',
          sortable:false
        },
        {
          text: 'receipt id',
          value: 'receiptId',
          sortable:false
        },
        {
          text: 'type',
          value: 'type',
          sortable:false
        },
        {
          text: 'points',
          value: 'points',
          sortable:false
        },
        {
          text:'mobile',
          value:'member.mobile',
          sortable:false
        },
        {
          text: 'create at',
          value: 'timestamp',
          sortable:false
        },
      ],
    }
  },
  props: {
    transactionList: {
      required: true,
    },
  },
  methods: {
    dateFormat(date) {
      return convertDateFormat(date,'YYYY/MM/DD HH:mm:ss')
    },
  },
}
</script>

<style>
</style>