<template>
  <v-app>
    <v-app-bar color="deep-purple accent-4" dark app>
      <v-toolbar-title> CRM Admin System</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-height>
        <v-layout 
        align-content-space-between
        column>
          <v-flex 
          align-self-end>
            <AlertBox />
          </v-flex>
          <v-flex
          align-self-center
          >
              <nuxt/>
          </v-flex>
         </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AlertBox from '@/components/AlertBox'
export default {
  components: {
    AlertBox,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
