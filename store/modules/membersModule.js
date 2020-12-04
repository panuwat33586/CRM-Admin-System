import { firestore } from '@/firebaseInstance'
export const membersModule = ({
  namespaced: true,
  state: {
    memberList: [],
    selectedMember: null,
    selectedMemberVoucherList: [],
    docs:null
  },
  mutations: {
    setMemberList(state, list) {
      state.memberList = list
    },
    setSelectedMember(state, memberInfo) {
      state.selectedMember = memberInfo
    },
    setSelectedMemberVoucherList(state, list) {
      state.selectedMemberVoucherList = list
    },
    setDocs(state,docs){
      state.docs=docs
    }
  },
  getters:{
       filterMemberList:(state)=>(type)=>{
             return state.memberList.sort((a,b)=>{
              return  a[type]>b[type]?-1:1
             })
       }
  },
  actions: {
    async fetchMemberList({ rootState, commit }) {
      try {
        commit('app/setSkeletonLoader',true,{root:true})
        const { adminInfo } = rootState.admin
        const { docs } = await firestore.collection('members')
          .orderBy('createAt','desc')
          .where('storeId', '==', adminInfo.storeId)
          .limit(20)
          .get()
        const list = docs.map(doc => doc.data())
        commit('setMemberList', list)
        commit('setDocs',docs)
        commit('app/setSkeletonLoader',false,{root:true})
      } catch (error) {
        console.log(error)
      }
    },
    async fetchNextMemberList({rootState,state,commit}){
       try{
        const { adminInfo } = rootState.admin
        const lastDoc=state.docs[state.docs.length-1] 
        const { docs } = await firestore.collection('members')
        .where('storeId', '==', adminInfo.storeId)
        .orderBy('createAt','desc')
        .startAfter(lastDoc)
        .limit(20)
        .get()
        const list = docs.map(doc => doc.data())
        commit('setMemberList', list)
        commit('setDocs',docs)
       }catch(error){
           console.log(error)
       }
    },
    async fetchPrevMemberList({rootState,state,commit}){
      try{
       const { adminInfo } = rootState.admin
       const lastDoc=state.docs[0] 
       const { docs } = await firestore.collection('members')
       .where('storeId', '==', adminInfo.storeId)
       .orderBy('createAt','desc')
       .endBefore(lastDoc)
       .limit(20)
       .get()
       const list = docs.map(doc => doc.data())
       commit('setMemberList', list)
       commit('setDocs',docs)
      }catch(error){
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
    async searchMember({ rootState, commit }, { searchCondition, searchWord }) {
      try {
        const { adminInfo } = rootState.admin
        if (searchCondition == 'points') {
          searchWord = parseInt(searchWord)
        }
        const { docs } = await firestore.collection('members')
          .where('storeId', '==', adminInfo.storeId)
          .where(searchCondition, '==', searchWord)
          .get()
        const list = docs.map(doc => doc.data())
        commit('setMemberList', list)
      } catch (error) {
        console.log(error)
      }
    },
    editMember({ commit, dispatch }, newMemberInfo) {
      const promise = new Promise(async (resolve, reject) => {
        try {
          commit('app/setLoading', true, { root: true })
          const { memberId, storeId } = newMemberInfo
          await firestore.collection('members')
            .doc(`${storeId}#${memberId}`).set(newMemberInfo)
          dispatch('fetchMemberList')
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