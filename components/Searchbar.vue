<template>
  <v-form @submit.prevent="submitSearch">
    <v-row>
      <v-col cols="12">
         <v-input>
          <template 
          v-slot:prepend
          >
            <v-btn-toggle 
            v-model="selectedSearchCondition" 
            tile
            dense
            >
              <v-btn v-for="(searchCondition,$searchConditionIndex) in searchConditionList"
              :key="$searchConditionIndex"
               :value="searchCondition.value">
                <span>{{searchCondition.text}}</span>
              </v-btn>
            </v-btn-toggle>
          </template>
          <v-text-field
          outlined
          dense
          v-model="searchWord"
          :disabled="selectedSearchCondition?false:true"
           placeholder="search"
          />
         </v-input>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      selectedSearchCondition:null,
      searchWord:null
    }
  },
  props:{
      searchConditionList:{
          type:Array,
          required:true
      }
  },
  methods:{
      submitSearch(){
          this.$emit('onSearch',{
              searchCondition:this.selectedSearchCondition,
              searchWord:this.searchWord
          })
          this.searchWord=null
      }
  }
}
</script>

<style>
</style>