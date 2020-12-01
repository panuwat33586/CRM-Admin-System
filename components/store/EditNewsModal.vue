<template>
  <v-dialog :value="isOpen" @input="closeModal">
    <v-card @click:outside="closeModal">
        <v-card-title class="headline grey lighten-2">
            <h3>{{news.header}}</h3>
        </v-card-title>
      <v-card-text>
        <v-row>
            <v-col>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card height="300px" width="300px" 
              :img="previewImage?previewImage:news.imageUrl"
              >
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#424242">
                    <h1>{{ news.header }}</h1>
                    <p>{{ news.description }}</p>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
          </v-col>
          <v-col>
             <v-text-field
             label="Header"
             v-model="news.header"
             outlined
             />
             <v-text-field
             label="Description"
             v-model="news.description"
             outlined
             />
             <v-btn @click="uploadImage">
            <v-file-input
              ref="image"
              hide-input
              dense
              accept="image/png,image/jpeg"
              prepend-icon="mdi-image"
              v-model="newImage"
              @change="genPreviewImage"
            />
            News Image
          </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
          <v-flex class="text-right">
              <v-btn
              color="primary"
              @click="saveEditStoreNews"
              >Save</v-btn>
          </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data(){
     return {
         newImage:null,
         previewImage:null
     }
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    news: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('onCloseModal')
      this.$store.dispatch('store/fetchStoreNews')
    },
    uploadImage() {
      this.$refs.image.$refs.input.click()
    },
    genPreviewImage(file) {
      if (file) {
        this.previewImage = window.URL.createObjectURL(file)
      } else {
        this.previewImage = this.news.imageUrl
      }
    },
    async saveEditStoreNews(){
      try{
         const payload={
          editedNews:this.news,
          newImage:this.newImage
        }
        this.$store.commit('app/setLoading',true)
        await this.$store.dispatch('store/editStoreNews',payload)
        this.$store.commit('app/setLoading',false)
        this.closeModal()
      }catch(error){
         return
      }
    }
  },
}
</script>

<style>
</style>
