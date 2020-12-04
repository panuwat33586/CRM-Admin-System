<template>
  <v-card>
    <v-card-title> Store </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <StoreDetail :storeInfo="store.storeInfo"/>
        </v-col>
        <v-col cols="12">
          <v-card >
            <v-card-title> NEWS </v-card-title>
            <v-card-text>
              <v-toolbar color="indigo">
                <v-btn @click="triggerNewsCreateModal"> Create </v-btn>
              </v-toolbar>
              <v-list three-line>
                <template v-for="(news, $newsIndex) in store.newsList">
                    <NewsListItem :news="news" :key="'news' + $newsIndex" />
                    <v-divider :key="'news divider' + $newsIndex" />
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <NewsCreateModal
      :isOpen="newsCreateModal"
      @onCloseModal="triggerNewsCreateModal"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import StoreDetail from '@/components/store/StoreDetail'
import NewsCreateModal from '@/components/store/NewsCreateModal'
import NewsListItem from '@/components/store/NewsListItem'
export default {
  components: {
    StoreDetail,
    NewsListItem,
    NewsCreateModal,
  },
  data() {
    return {
      newsCreateModal: false,
    }
  },
  computed: {
    ...mapState(['app','store'])
  },
  created() {
    this.$store.dispatch('store/fetchStoreInfo')
    this.$store.dispatch('store/fetchStoreNews')
  },
  methods: {
    triggerNewsCreateModal() {
      this.newsCreateModal = !this.newsCreateModal
    },
  },
}
</script>

<style>
</style>