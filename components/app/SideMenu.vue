<template>
  <v-card width="256" class="mx-auto">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Menu </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group
        color="primary"
        v-model="selectedMenu"
        >
        <v-list-item
          v-for="(menu, $menuIndex) in menus"
          :key="$menuIndex"
          @click="goToPage(menu.page)"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { 
        icon: 'mdi-storefront', 
        title: 'Store', 
        page: 'store' 
        },
        { 
          icon: 'mdi-account-group',
          title: 'Members', 
          page: 'members' 
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'Transactions',
          page: 'transactions',
        },
        { 
          icon: 'mdi-ticket-percent', 
          title: 'Vouchers', 
          page: 'vouchers' 
          },
        {
          icon: 'mdi-file-document-outline',
          title: 'Reports',
          page: 'reports',
        },
        {
          icon:'mdi-cog',
          title:'Setting',
          page:'setting'
        }
      ],
      selectedMenu:0
    }
  },
  mounted(){
      this.selectedMenu=this.menus.findIndex(
        menu=>menu.page==this.$route.name
        )
  },
  methods: {
    goToPage(page) {
      this.$router.push({ name: page })
    },
  },
}
</script>

<style>
</style>