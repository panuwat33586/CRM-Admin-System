<template>
  <v-data-table
    :headers="headers"
    :items="voucherList"
    :hide-default-footer="true"
  >
    <template v-slot:[`item.createAt`]="{ item }">
      {{ dateFormat(item.createAt) }}
    </template>
    <template v-slot:[`item.expireDate`]="{ item }">
      {{ dateFormat(item.expireDate) }}
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
          text: 'ID',
          value: 'memberVoucherId',
          sortable: false,
        },
        {
          text: 'status',
          value: 'status',
          sortable: false,
        },
        {
          text: 'remaining points',
          value: 'remainingPoints',
          sortable: false,
        },
        {
          text: 'create at',
          value: 'createAt',
          sortable: false,
        },
        {
          text: 'expire on',
          value: 'expireDate',
          sortable: false,
        },
      ],
    }
  },
  props: {
    voucherList: {
      required: true,
    },
  },
  methods: {
    dateFormat(date) {
      return convertDateFormat(date, 'YYYY/MM/DD HH:mm:ss')
    },
  },
}
</script>

<style>
</style>