import {firestore} from '@/firebaseInstance'
export const transactionsModule = ({
  namespaced: true,
  state: {
    transactionsList: null
  },
  mutations: {
    setTransactionsList(state, list) {
      state.transactionsList = list
    }
  },
  getters:{
    filteredTransactionList:(state)=>(attribute,searchword)=>{
         return state.transactionsList.filter(transaction=>{
            return transaction[`${attribute}`]==searchword
         })
    }
  },
  actions: {
    async fetchTransactionList({ rootState, commit }) {
      try {
        const { adminInfo } = rootState.admin
        const { docs } = await firestore.collection('transactions')
        .orderBy('timestamp','desc')
        .where('storeId', '==', adminInfo.storeId)
        .limit(20)
        .get()
        const list = docs.map(doc => doc.data())
        commit('setTransactionsList', list)
      } catch (error) {
        console.log(error)
      }
    },
    async searchTransaction({ rootState, commit }, { searchCondition, searchWord }) {
      try {
        const { adminInfo } = rootState.admin
        if (searchCondition == 'points') {
          searchWord = parseInt(searchWord)
        }
        const { docs } = await firestore.collection('transactions')
          .where('storeId', '==', adminInfo.storeId)
          .where(searchCondition, '==', searchWord)
          .get()
        const list = docs.map(doc => doc.data())
        commit('setTransactionsList', list)
      } catch (error) {
        console.log(error)
      }
    },
  }
})