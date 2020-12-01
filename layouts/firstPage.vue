<template>
  <v-app>
    <v-app-bar 
    color="deep-purple accent-4" 
    dark
    app
    > 
     <v-toolbar-title>NiceDining</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container 
      fluid 
      fill-height
      
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
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
