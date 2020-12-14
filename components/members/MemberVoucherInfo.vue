<template>
  <v-card style="margin-top: 20px">
    <v-card-title> vouchers </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Voucher Id</th>
              <th class="text-left">Status</th>
               <th class="text-left">expire on</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(voucher, $voucherIndex) in voucherList"
              :key="$voucherIndex"
            >
              <td>{{ voucher.voucherDetail.name }}</td>
              <td>{{ voucher.memberVoucherId }}</td>
              <td>{{ voucher.status }}</td>
              <td>{{ dateFormat(voucher.expireDate) }}</td>
              <td>
                <span @click="deleteVoucher(voucher)"> 
                  <v-icon 
                  color="red"
                  > 
                    mdi-delete 
                    </v-icon>
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { convertDateFormat } from '@/helper'
export default {
  props: {
    voucherList: {
      type: Array,
      required: true,
    },
  },
  methods:{
    deleteVoucher(voucher){
          this.$store.dispatch('members/deleteMemberVoucher',voucher)
    },
    dateFormat(date) {
      return convertDateFormat(date, 'YYYY/MM/DD HH:mm:ss')
    },
  }
}
</script>

<style>
</style>