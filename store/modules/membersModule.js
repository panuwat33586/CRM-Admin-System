import { firestore } from '@/firebaseInstance'
export const membersModule = ({
  namespaced: true,
  state: {
    memberList: [],
    selectedMember: null,
    selectedMemberVoucherList: [],
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
  },
  actions: {
    async fetchMemberList({ rootState, commit }) {
      try {
        const { adminInfo } = rootState.admin
        const { docs } = await firestore.collection('members')
          .orderBy('createAt','desc')
          .where('storeId', '==', adminInfo.storeId)
          .limit(20)
          .get()
        const list = docs.map(doc => doc.data())
        commit('setMemberList', list)
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