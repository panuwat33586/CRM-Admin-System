<template>
  <div>
    <v-card>
      <v-card-title> Members </v-card-title>
      <v-card-text>
         <Searchbar @onSearch="searchMember" :searchConditionList="searchConditionList" />
        <v-tabs v-model="tab">
          <v-tab>
            List
          </v-tab>
          <v-tab
          :disabled="members.selectedMember?false:true"
          >
            Member Info
          </v-tab>
        </v-tabs>
        <v-tabs-items
        v-model="tab"
        >
          <v-tab-item
          >
        <v-list three-line>
          <v-skeleton-loader
          type="list-item-avatar-three-line"
          :loading="skeletonLoader"
          >
          <template 
          v-for="(member, $memberIndex) in searchMemberList"
          >
            <Member 
            :member="member" 
            :key="'members' + $memberIndex" 
            @onSelectMember="setSelectMember"
            />
            <v-divider :key="'divider' + $memberIndex" />
          </template>
          </v-skeleton-loader>
        </v-list>
        <Pagination
        :page="page"
        :pageLength="pageLength"
        :next="nextPage"
        :previous="prevPage"
        />
        </v-tab-item>
        <v-tab-item
        >
           <MemberPersonalInfo 
           :member="members.selectedMember"
          />
           <MemberVoucherInfo :voucherList="members.selectedMemberVoucherList"/>
        </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Member from '@/components/members/Member'
import Searchbar from '@/components/Searchbar'
import MemberPersonalInfo from '@/components/members/MemberPersonalInfo'
import MemberVoucherInfo from '@/components/members/MemberVoucherInfo'
import Pagination from '@/components/Pagination'
export default {
  middleware:'routesGuard',
  components: {
    Member,
    Searchbar,
    MemberPersonalInfo,
    MemberVoucherInfo,
    Pagination
  },
  data(){
     return {
       tab:null,
       page:1,
       limit:20,
       searchConditionList:[
         {text:'Name',value:'name'},
         {text:'Mobile',value:'mobile'}
       ]
     }
  },
  computed:{
    ...mapState(
      {
      skeletonLoader:(state)=>state.app.skeletonLoader,
      members:(state)=>state.members
      }
      ),
      searchMemberList(){
        const firstElement=(this.page*this.limit)-this.limit
        const lastElement=this.page*this.limit
        return this.members.searchMemberList.slice(
          firstElement,lastElement
          )
      },
      pageLength(){
        return Math.ceil(this.members.searchMemberList.length/this.limit)
      }
  },
  beforeMount(){
    this.$store.dispatch('members/fetchMemberList')
  },
  methods:{
    setSelectMember(member){
          this.$store.dispatch('members/fetchSelectedMemberInfo',member)
          this.tab=1
    },
    searchMember(payload){
       this.$store.dispatch('members/searchMember',payload)
       this.selectMember=null
       this.tab=0
    },
    nextPage(){
        this.page+=1
    },
    prevPage(){
       this.page-=1
    }
  }
}
</script>

<style>
</style>