<template>
      <v-list-item>
        <v-list-item-avatar
        tile
        >
          <v-img
            :src="news.imageUrl"
            alt="news-picture"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> {{news.header}} </v-list-item-title>
          <v-list-item-subtitle> {{news.description}} </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-row>
            <v-col>
              <span @click="triggerEditNewsModal"> 
                <v-icon>
                 mdi-file-edit
                </v-icon>
                </span>
            </v-col>
            <v-col>
              <span @click="deleteNews" text> 
                <v-icon 
                color="red">
                  mdi-delete
                </v-icon>
                </span>
            </v-col>
          </v-row>
        </v-list-item-action>
        <EditNewsModal 
        :isOpen="editNewsModal" 
        @onCloseModal="triggerEditNewsModal"
        :news="news"
        />
      </v-list-item>
</template>

<script>
import EditNewsModal from './EditNewsModal'
export default {
   data(){
     return {
       editNewsModal:false
     }
   },
   components:{
     EditNewsModal
   },
   props:{
     news:{
       type:Object,
       required:true
     }
   },
   methods:{
      deleteNews(){
        this.$store.dispatch('store/deleteStoreNews',{newsId:this.news.newsId})
      },
      triggerEditNewsModal(){
           this.editNewsModal=!this.editNewsModal
      }
   }
}
</script>

<style>
</style>