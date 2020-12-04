<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="date"
        label="Expire Date"
        outlined
        dense
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker 
    :value="date"
    :min="minDate"
    @change="(date)=>$emit('update:date',date)"
    scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      minDate:new Date().toISOString().substr(0, 10),
      modal: false,
    }
  },
  props:{
     date:{
         required:true
     }
  }
}
</script>

<style>
</style>