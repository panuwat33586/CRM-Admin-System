import { firestore } from '@/firebaseInstance'
import _ from 'lodash'
export const membersModule = ({
  namespaced: true,
  state: {
    memberList: [],
    searchMemberList:[],
    selectedMember: null,
    selectedMemberVoucherList: [],
  },
  mutations: {
    setMemberList(state, list) {
      state.memberList = list
    },
    setSearchMemberList(state,list){
       state.searchMemberList=list
    },
    setSelectedMember(state, memberInfo) {
      state.selectedMember = memberInfo
    },
    setSelectedMemberVoucherList(state, list) {
      state.selectedMemberVoucherList = list
    },
  },
  getters:{
       sortedMemberList:(state)=>(type)=>{
             return state.memberList.sort((a,b)=>{
              return  a[type]>b[type]?-1:1
             })
       }
  },
  actions: {
    async fetchMemberList({ rootState, commit }) {
      try {
        commit('app/setSkeletonLoader',true,{root:true})
        const { storeId } = rootState.admin.adminInfo
        const { docs } = await firestore.collection('members')
          .orderBy('createAt','desc')
          .where('storeId', '==', storeId)
          .get()
        const list = docs.map(doc => doc.data())
        commit('setMemberList', list)
        commit('setSearchMemberList', list)
        commit('app/setSkeletonLoader',false,{root:true})
      } catch (error) {
        console.log(error)
      }
    },
    async fetchSelectedMemberInfo({ dispatch,commit }, member) {
      try {
        const { storeId, memberId } = member
        const memberResult = await firestore.collection('members')
          .doc(`${storeId}#${memberId}`)
          .get()
        const memberInfo = memberResult.data()
        commit('setSelectedMember', memberInfo)
        await dispatch('fetchSelectedMemberVoucher',{memberId,storeId})
      } catch (error) {
        console.log(error)
      }
    },
    fetchSelectedMemberVoucher({commit},{memberId,storeId}){
      const promise=new Promise(async(resolve,reject)=>{
        try{
          const {docs}= await firestore.collection('memberVouchers')
            .where('memberId', '==', memberId)
            .where('storeId', '==', storeId)
            .get()
            const memberVouchers=docs.map(doc=>doc.data())
            commit('setSelectedMemberVoucherList', memberVouchers)
            resolve()
        }catch(error){
            console.log(error)
            reject(error)
        }
      })
      return promise
    },
    searchMember({state,commit}, { searchCondition, searchWord }) {
      let searchResult;
      if(!Boolean(searchWord)||searchWord.length<3||!searchWord.trim()){
        return
      }else{
        const check=(checkValue)=>{
          return _.includes(checkValue,searchWord.toUpperCase())
        }   
        searchResult=_.filter(state.memberList,
            (member)=>{
              let compare;
              if(searchCondition=='name'){
                const {firstName,lastName}=member
                compare=check(firstName)||check(lastName)
              }else{
                compare=check(member[`${searchCondition}`])
              }
              if(compare){
                return member
              }
            })
      }
      commit('setSearchMemberList',searchResult)
    },
    editMember({ commit, dispatch }, memberInfo) {
      const promise = new Promise(async (resolve, reject) => {
        try {
          commit('app/setLoading', true, { root: true })
          const { memberId, storeId,firstName,lastName } = memberInfo
          await firestore.collection('members')
            .doc(`${storeId}#${memberId}`).set(
              {
                ...memberInfo,
                firstName:firstName.toUpperCase(),
                lastName:lastName.toUpperCase()
              }
              )
          dispatch('fetchSelectedMemberInfo',memberInfo)
          commit('app/setLoading', false, { root: true })
          resolve()
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
      return promise
    },
    async deleteMemberVoucher({commit,dispatch}, voucher) {
      try {
        commit('app/setLoading', true, { root: true })
        const { storeId, memberVoucherId ,memberId}=voucher
        await firestore.collection('memberVouchers')
          .doc(`${storeId}#${memberVoucherId}`)
          .delete()
        await dispatch('fetchSelectedMemberVoucher',{memberId,storeId})
        commit('app/setLoading', false, { root: true })
      } catch (error) {
        console.log(error)
      }
    },
  }
})