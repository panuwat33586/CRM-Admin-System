<template>
<div>
   <v-row>
     <v-col cols="2">
       <v-subheader>
          Sort by
        </v-subheader>
     </v-col>
     <v-col cols="10">
         <v-select
         label='select'
         v-model="selectType"
         @change='selectSortType'
         :items="sortTypes"
         outlined
         dense
         style="width:200px"
         />
     </v-col>
   </v-row>
   <v-list three-line>
     <v-skeleton-loader
     type='list-item-avatar-three-line'
     :loading='app.skeletonLoader'
     >
      <template
       v-for="(member,$memberIndex) in memberList"
      >
        <v-list-item 
        :key="$memberIndex"
        >
          <v-list-item-avatar>
            <v-img 
            alt="profileImg"
            :src="member.profileImg"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >{{member.firstName}} {{member.lastName}}</v-list-item-title>
            <v-list-item-subtitle > {{member.mobile}}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="selectType=='lastVisited'">
            {{lastVisited(member.lastVisited)}}
          </v-list-item-action>
          <v-list-item-action v-else>
            {{member.points}} points
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="'divider'+$memberIndex"/>
      </template>
     </v-skeleton-loader>
    </v-list>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {convertDateFormat} from '@/helper'
import {todayDiff} from '@/helper'
export default {
  data(){
    return {
       selectType:'lastVisited',
       sortTypes:[
         {text:'last visit',value:'lastVisited'},
         {text:'points',value:'points'}]
    }
   },
   mounted(){
       this.$store.dispatch('members/fetchMemberList')
   },
   computed:{
      ...mapState(['app']),
       memberList(){
          return this.$store.getters['members/filterMemberList'](this.selectType)
      }
   },
    methods:{
         lastVisited(date){
           return convertDateFormat(date,'YYYY/MM/DD HH:mm:ss')
         },
         selectSortType(type){
             this.selectType=type
         }
    }
}
</script>

<style>

</style>