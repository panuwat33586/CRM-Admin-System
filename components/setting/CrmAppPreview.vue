<template>
  <v-card height="500px">
    <v-toolbar :color="bannerColor" dense>
      <v-toolbar-title>
        <span :style="{ color: bannerTextColor }">
          {{ storeName }}
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-card
      :color="memberCardColor"
      width="350px"
      >
        <v-card-title>
          <v-avatar size="70">
            <v-icon size="70"> 
              mdi-account-circle 
            </v-icon>
          </v-avatar>
        </v-card-title>
        <v-card-text>
          <h4 :style="{color:memberCardTextColor}">point: xxx</h4>
          <h4 :style="{color:memberCardTextColor}">phone number: xxxxxx</h4>
          <h4 :style="{color:memberCardTextColor}">name: xxxxxxxxxx</h4>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-bottom-navigation absolute :background-color="navigationColor">
      <v-btn>
        <span :style="{ color: navigationTextColor }"> Home </span>
        <v-icon :style="{ color: navigationTextColor }"> mdi-home </v-icon>
      </v-btn>

      <v-btn>
        <span :style="{ color: navigationTextColor }"> Rewards </span>
        <v-icon :style="{ color: navigationTextColor }">
          mdi-gift-outline
        </v-icon>
      </v-btn>

      <v-btn>
        <span :style="{ color: navigationTextColor }"> Vouchers </span>
        <v-icon :style="{ color: navigationTextColor }"> mdi-ticket </v-icon>
      </v-btn>
      <v-btn>
        <span :style="{ color: navigationTextColor }"> History </span>
        <v-icon :style="{ color: navigationTextColor }"> mdi-history </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
export default {
  props: {
    storeName: {
      type: String,
      required: true,
    },
    memberCardColor:{
        type:String,
        required:true
    },
    memberCardTextColor:{
        type:String,
        required:true
    },
    bannerTextColor: {
      type: String,
      required: true,
    },
    bannerColor: {
      type: String,
      required: true,
    },
    navigationTextColor: {
      type: String,
      required: true,
    },
    navigationColor: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
</style>