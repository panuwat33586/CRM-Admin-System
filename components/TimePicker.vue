<template>
   <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="time"
            outlined
            :rules="rules"
            dense
            label="time"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal"
          :value="time"
          full-width
          format="24hr"
          use-seconds
          @change="(time)=>$emit('update:time',time)"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
</template>

<script>
export default {
data () {
      return {
        modal: false,
      }
    },
    props:{
        time:{
            required:true
        },
        rules:{
            required:true
        }
    }
}
</script>

<style>

</style>