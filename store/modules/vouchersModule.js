import { genId } from '@/helper'
import { firestore } from '~/firebaseInstance'

export const vouchersModule = ({
  namespaced: true,
  state: {
    storeVoucherList: [],
    membersVoucherList:[]
  },
  mutations: {
    setStoreVoucherList(state, list) {
      state.storeVoucherList = list
    },
    setMembersVoucherList(state,list){
      state.membersVoucherList=list
    }
  },
  getters:{
       filteredMembersVoucherList:(state)=>(type)=>{
        return state.membersVoucherList.sort((a,b)=>{
         return  a[type]>b[type]?-1:1
        })
  }
  },
  actions: {
    async fetchStoreVoucherList({ rootState, commit }) {
      try {
        commit('app/setSkeletonLoader',true,{root:true})
        const { adminInfo } = rootState.admin
        const { docs } = await firestore.collection('storeVouchers')
          .where('storeId', '==', adminInfo.storeId).get()
        const list = docs.map(doc => doc.data())
        commit('setStoreVoucherList', list)
        commit('app/setSkeletonLoader',false,{root:true})
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMembersVoucherList({rootState,commit}){
        try{
          const { adminInfo } = rootState.admin
          const { docs } = await firestore.collection('memberVouchers')
          .where('storeId', '==', adminInfo.storeId).get()
          const list=docs.map(doc=>doc.data())
          commit('setMembersVoucherList', list)
        }catch(error){
          console.log(error)
        }
    },
    createStoreVoucher({ rootState, dispatch, commit }, voucherInfo) {
      const promise = new Promise(async (resolve, reject) => {
        try {
          commit('app/setLoading', true, { root: true })
          const { adminInfo } = rootState.admin
          const storeVoucherId = genId()
          const newVoucher = {
            storeId: adminInfo.storeId,
            storeVoucherId,
            ...voucherInfo,
            points: parseInt(voucherInfo.points),
            value: parseInt(voucherInfo.value)
          }
          await firestore.collection('storeVouchers')
            .doc(`${adminInfo.storeId}#${storeVoucherId}`)
            .set(newVoucher)
          dispatch('fetchStoreVoucherList')
          commit('app/setLoading', false, { root: true })
          commit('app/setNotification',
          {
            status:true,
            type:'success',
            message:'successfully create voucher'
          },
          {root:true}
          )
          resolve()
        } catch (error) {
          commit('app/setLoading', false, { root: true })
          console.log(error)
          reject(error)
        }
      })
      return promise
    },
    editStoreVoucher({ rootState,dispatch, commit }, editedVoucher) {
      const promise =new Promise(async(resolve,reject)=>{
        try {
          commit('app/setLoading', true, { root: true })
          const { adminInfo } = rootState.admin
          await firestore.collection('storeVouchers')
            .doc(`${adminInfo.storeId}#${editedVoucher.storeVoucherId}`)
            .set({
              ...editedVoucher,
              points: parseInt(editedVoucher.points),
              value: parseInt(editedVoucher.value)
            })
            dispatch('fetchStoreVoucherList')
            commit('app/setLoading', false, { root: true })
            resolve()
        } catch (error) {
          commit('app/setLoading', false, { root: true })
          console.log(error)
          reject(error)
        }
      })
      return promise
    },
    async deleteStoreVoucher({ rootState, commit, dispatch }, voucher) {
      try {
        commit('app/setLoading', true, { root: true })
        const { adminInfo } = rootState.admin
        await firestore.collection('storeVouchers')
          .doc(`${adminInfo.storeId}#${voucher.storeVoucherId}`)
          .delete()
        dispatch('fetchStoreVoucherList')
        commit('app/setLoading', false, { root: true })
        commit('app/setNotification',
        {
          status:true,
          type:'success',
          message:'successfully delete voucher'
        },
        {root:true}
        )
      } catch (error) {
        commit('app/setLoading', false, { root: true })
        console.log(error)
      }
    }
  }
})