<template>
  <v-app>
    <v-app-bar 
    color="indigo"
    dark 
    app>
      <v-toolbar-title>CRM-SYSTEM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  @click="signout" text>Signout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-layout fill-height>
        <v-row>
          <v-col cols="3">
            <SideMenu/>
          </v-col>
          <v-col cols="9">
            <AlertBox/>
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
import {mapState} from 'vuex'
import AlertBox from '@/components/AlertBox'
import LoadingScreen from '@/components/app/LoadingScreen'
import SideMenu from '@/components/app/SideMenu'
export default {
  components: {
    SideMenu,
    LoadingScreen,
    AlertBox
  },
  computed:{
    ...mapState(['store'])
  },
  methods:{
    signout(){
      this.$router.push({path:'/'})
      this.$store.commit('admin/clearAdminInfo')
    }
  }
}
</script>
