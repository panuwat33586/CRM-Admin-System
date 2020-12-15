import { firestore } from '@/firebaseInstance'
import {dateBetweenChecking} from '@/helper'
export const transactionsModule = ({
  namespaced: true,
  state: {
    searchTransactionList:[],
    transactionsList: [],
  },
  mutations: {
    setTransactionsList(state, list) {
      state.transactionsList = list
    },
    setSearchTransactionList(state,list){
      state.searchTransactionList=list
    }
  },
  getters: {
    filteredTransactionsByDate:(state)=>(startDate,endDate)=>{
      if(startDate&&endDate){
        return state.transactionsList.filter(transaction=>{
          if(dateBetweenChecking(transaction.timestamp,startDate,endDate)){
            return transaction
          }
      })
      }
      return state.transactionsList
    },
    sortedTransactionsList: (state,getters) => (startDate,endDate,type) => {
      return getters.filteredTransactionsByDate(startDate,endDate).sort((a, b) => {
        return a[type] > b[type] ? -1 : 1
      })
    }
  },
  actions: {
    async fetchTransactionList({ rootState, commit }) {
      try {
        const { adminInfo } = rootState.admin
        const { docs } = await firestore.collection('transactions')
          .orderBy('timestamp', 'desc')
          .where('storeId', '==', adminInfo.storeId)
          .limit(20)
          .get()
        const list = docs.map(doc => doc.data())
        commit('setTransactionsList', list)
        commit('setSearchTransactionList',list)
      } catch (error) {
        console.log(error)
      }
    },
    searchTransaction({ state, commit }, { searchCondition, searchWord }) {
      let searchResult;
      if(!Boolean(searchWord)||searchWord.length<3||!searchWord.trim()){
        return
      }else{
        const check=(checkValue)=>{
          return _.includes(checkValue,searchWord.toUpperCase())
        }   
        searchResult=_.filter(state.transactionsList,
          (transaction)=>{
            let compare;
            if(searchCondition=='name'){
              const {member}=transaction
              compare=check(member.firstName)||check(member.lastName)
            }else{
              compare=check(_.get(transaction,searchCondition))
            }
            if(compare){
              return transaction
            }
          })  
      }
      commit('setSearchTransactionList',searchResult)
    },
  }
})