<template>
  <v-data-table 
  :headers="headers" 
  :items="voucherList"
  :hide-default-footer="true">
  <template v-slot:[`item.member`]="{ item }">
        {{`${item.member.firstName} ${item.member.lastName}` }}
  </template>
    <template v-slot:[`item.usedDate`]="{ item }">
      {{ dateFormat(item.usedDate) }}
    </template>
  </v-data-table>
</template>

<script>
import { convertDateFormat } from "@/helper";
export default {
  data() {
    return {
      headers: [
        {
          text: "member",
          value: "member",
          sortable: false,
        },
        {
          text: "voucher",
          value: "voucherDetail.name",
          sortable: false,
        },
        {
          text: "remaining points",
          value: "remainingPoints",
          sortable: false,
        },
        {
          text: "used date",
          value: "usedDate",
          sortable: false,
        },
      ],
    };
  },
  props: {
    voucherList: {
      required: true,
    },
  },
  methods: {
    dateFormat(date) {
      return convertDateFormat(date, "YYYY/MM/DD HH:mm:ss");
    }
  },
};
</script>

<style></style>
