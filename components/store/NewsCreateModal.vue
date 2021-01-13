<template>
  <v-dialog 
  width="700px"
  :value="isOpen" 
  @input="closeModal">
    <v-card @click:outside="closeModal">
      <v-card-title class="headline grey lighten-2"> News</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.header"
            :rules="headerRules"
            label="Header"
            required
          />
          <v-text-field
            v-model="form.description"
            :rules="descriptionRules"
            :counter="100"
            label="Description"
            required
          />
          <v-btn @click="uploadImage">
            <v-file-input
              ref="image"
              hide-input
              dense
              accept="image/png,image/jpeg"
              prepend-icon="mdi-image"
              @change="genPreviewImage"
              v-model="form.newsImage"
            />
            News Image
          </v-btn>
          <v-row>
            <v-col>
              <h3>Preview</h3>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card height="300px" width="300px" :img="previewImage">
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#424242">
                        <h1>{{ form.header }}</h1>
                        <p>{{ form.description }}</p>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.prevent="createNews"> Create </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const nodataImage =
  'https://firebasestorage.googleapis.com/v0/b/crm-system-d726b.appspot.com/o/no_data_found%20picture.png?alt=media&token=6266234b-ad21-487b-8c5c-663749cd2d08'
export default {
  data() {
    return {
      valid: true,
      form: {
        header: '',
        description: '',
        newsImage: null,
      },
      headerRules: [(v) => !!v || 'header is required'],
      descriptionRules: [
        (v) => (v && v.length) <= 100 || 'description not more than 100 words',
      ],
      previewImage: nodataImage,
    }
  },
  props: {
    isOpen: {
      type: Boolean,
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
        this.previewImage = nodataImage
      }
    },
    async createNews() {
      if (this.$refs.form.validate()) {
        try {
          this.$store.commit('app/setLoading',true)
          await this.$store.dispatch('store/createStoreNews', this.form)
          URL.revokeObjectURL(this.previewImage)
          this.previewImage = nodataImage
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
          this.$store.commit('app/setLoading',false)
          this.closeModal()
        } catch (error) {
          return
        }
      } else {
        return
      }
    },
  },
}
</script>

<style>
</style>