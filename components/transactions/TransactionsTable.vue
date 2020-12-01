<template>
  <v-data-table
    :headers="headers"
    :items="transactionList ? transactionList : []"
    :disable-pagination="true"
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
        },
        {
          text: 'receipt id',
          value: 'receiptId',
        },
        {
          text: 'type',
          value: 'type',
        },
        {
          text: 'points',
          value: 'points',
        },
        {
          text: 'create at',
          value: 'timestamp',
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
      return convertDateFormat(date)
    },
  },
}
</script>

<style>
</style>