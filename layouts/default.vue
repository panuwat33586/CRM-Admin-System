<template>
  <v-app>
    <v-app-bar color="deep-purple accent-4" dark app>
      <v-toolbar-title>NiceDining</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-layout fill-height>
        <v-row>
          <v-col cols="3">
            <SideMenu/>
          </v-col>
          <v-col cols="9">
            <nuxt />
          </v-col>
        </v-row>
        </v-layout>
      </v-container>
      <LoadingScreen/>
    </v-main>
  </v-app>
</template>

<script>
import LoadingScreen from '@/components/app/LoadingScreen'
import SideMenu from '@/components/app/SideMenu'
export default {
  components: {
    SideMenu,
    LoadingScreen
  },
}
</script>
