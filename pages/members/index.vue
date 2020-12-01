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
          <template v-for="(member, $memberIndex) in members.memberList">
            <Member 
            :member="member" 
            :key="'members' + $memberIndex" 
            @onSelectMember="setSelectMember"
            />
            <v-divider :key="'divider' + $memberIndex" />
          </template>
        </v-list>
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
export default {
  components: {
    Member,
    Searchbar,
    MemberPersonalInfo,
    MemberVoucherInfo
  },
  data(){
     return {
       tab:null,
       searchConditionList:[
         {text:'Name',value:'firstName'},
         {text:'Mobile',value:'mobile'},
         {text:'Points',value:'points'}
       ]
     }
  },
  computed: {
    ...mapState(['members']),
  },
  beforeMount() {
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
    }
  }
}
</script>

<style>
</style>