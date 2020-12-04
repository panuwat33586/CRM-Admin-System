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
                dense
                :rules="fieldRules"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label=" Exchange points"
                v-model="voucher.points"
                outlined
                dense
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
                dense
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
                dense
                :rules="fieldRules"
                required
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
              dot-size="25"
              swatches-max-height="200"
              v-model="voucher.color"
            ></v-color-picker>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-flex class="text-right">
          <v-btn @click="saveEditStoreVoucher" color="primary">Save</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      fieldRules: [(v) => !!v || 'field is required'],
      numberRules: [
        (v) => !!v || 'field is required',
        (v) => parseInt(v) >= 0 || 'value must more than 0',
      ],
    }
  },
  props: {
    voucher: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('onCloseModal')
    },
    async saveEditStoreVoucher() {
      try {
        await this.$store.dispatch('vouchers/editStoreVoucher', this.voucher)
        this.closeModal()
      } catch (error) {
        return
      }
    },
  },
}
</script>

<style>
</style>