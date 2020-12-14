<template>
  <v-card>
    <v-card-title> Setting </v-card-title>
    <v-card-text>
      <template v-if="storeInfo">
      <v-row>
        <v-col
        >
          <CrmAppPreview
            :storeName="storeName"
            :memberCardColor="setting.memberCardColor"
            :memberCardTextColor="setting.memberCardTextColor"
            :bannerTextColor="setting.bannerTextColor"
            :bannerColor="setting.bannerColor"
            :navigationTextColor="setting.navigationTextColor"
            :navigationColor="setting.navigationColor"
          />
        </v-col>
        <v-col
        >
          <v-row>
            <v-col cols="12">
              <ColorPickerInput
                label="Banner Text Color"
                :color.sync="setting.bannerTextColor"
              />
            </v-col>
            <v-col cols="12">
              <ColorPickerInput
                label="Banner Color"
                :color.sync="setting.bannerColor"
              />
            </v-col>
             <v-col cols="12">
              <ColorPickerInput
                label="Member Card Text Color"
                :color.sync="setting.memberCardTextColor"
              />
            </v-col>
             <v-col cols="12">
              <ColorPickerInput
                label="Member Card Color"
                :color.sync="setting.memberCardColor"
              />
            </v-col>
            <v-col cols="12">
              <ColorPickerInput
                label="Navigation Text Color"
                :color.sync="setting.navigationTextColor"
              />
            </v-col>
            <v-col cols="12">
              <ColorPickerInput
                label="Navigation Color"
                :color.sync="setting.navigationColor"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                @click="saveStoreSetting"
                color="primary"
                class="float-right"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import CrmAppPreview from '@/components/setting/CrmAppPreview'
import ColorPickerInput from '@/components/setting/ColorPickerInput'
export default {
  middleware:'routesGuard',
  components: {
    CrmAppPreview,
    ColorPickerInput,
  },
  mounted() {
    this.$store.dispatch('store/fetchStoreInfo')
  },
  computed:{
    ...mapState({
      storeInfo:(state)=>state.store.storeInfo,
      storeName:(state)=>state.store.storeInfo.name,
      setting:(state)=>state.store.storeInfo.setting
    })
  },
  methods: {
    saveStoreSetting() {
      this.$store.dispatch('store/editStoreSetting', this.setting)
    },
  },
}
</script>

<style>
</style>