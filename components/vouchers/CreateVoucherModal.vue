<template>
  <v-dialog width="700px" :value="isOpen" @input="closeModal">
    <v-card @click:outside="closeModal">
      <v-card-title class="headline grey lighten-2"> New Voucher </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="name"
                v-model="voucher.name"
                outlined
                :rules="fieldRules"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Exchange points"
                v-model="voucher.points"
                outlined
                type="number"
                :rules="numberRules"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="value"
                v-model="voucher.value"
                outlined
                type="number"
                :rules="numberRules"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="description"
                v-model="voucher.description"
                outlined
                :rules="fieldRules"
                required
              />
            </v-col>
            <v-col cols="6">
              <ExpireDatePicker
              :date.sync="endDate"
              />
            </v-col>
            <v-col cols="6">
              <TimePicker 
              :rules="fieldRules"
              :time.sync="endTime"
              />
            </v-col>
          </v-row>
        </v-form>
        <h3>Preview</h3>
        <v-row>
          <v-col cols="6">
            <VoucherCard :voucher="voucher" />
          </v-col>
          <v-col cols="6">
            <v-color-picker
              hide-canvas
              show-swatches
              swatches-max-height="200"
              v-model="voucher.color"
            ></v-color-picker>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-flex class="text-right">
          <v-btn color="primary" @click="createVoucher">Create</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VoucherCard from './VoucherCard'
import ExpireDatePicker from './ExpireDatePicker'
import TimePicker from '@/components/TimePicker'
import {convertToISOString} from '@/helper'
export default {
  components: {
    VoucherCard,
    ExpireDatePicker,
    TimePicker,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      endDate: new Date().toISOString().substr(0, 10),
      endTime: null,
      voucher: {
        name: null,
        description: null,
        points: null,
        value: null,
        color: '#F10606',
      },
      fieldRules: [(v) => !!v || 'field is required'],
      numberRules: [
        (v) => !!v || 'field is required',
        (v) => parseInt(v) >= 0 || 'value must more than 0',
      ],
    }
  },
  methods: {
    closeModal() {
      this.$refs.form.reset()
      this.$emit('onCloseModal')
    },
    async createVoucher() {
      try {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch(
            'vouchers/createStoreVoucher',
            {
            ...this.voucher,
            expireDate:convertToISOString(`${this.endDate} ${this.endTime}`)
            }
          )
          this.$refs.form.reset()
          this.closeModal()
        } else {
          return
        }
      } catch (error) {
        return
      }
    },
  },
}
</script>

<style>
</style>