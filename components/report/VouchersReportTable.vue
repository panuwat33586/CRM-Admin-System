<template>
  <v-data-table 
  :headers="headers" 
  :items="voucherList" 
  :hide-default-footer="true">
    <template v-slot:[`item.expireDate`]="{ item }">
      {{ dateFormat(item.expireDate) }}
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
          text: "id",
          value: "id",
          sortable: false,
        },
        {
          text: "name",
          value: "name",
          sortable: false,
        },
        {
          text: "quantity",
          value: "quantity",
          sortable: false,
        },
        {
          text: "expire on",
          value: "expireDate",
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
      return convertDateFormat(date, "YYYY/MM/DD");
    },
  },
};
</script>

<style></style>
