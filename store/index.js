import Vuex from 'vuex'
import {appModule} from './modules/appModule.js'
import { adminModule } from './modules/adminModule.js'
import { storeModule } from './modules/storeModule.js'
import {membersModule} from './modules/membersModule'
import {vouchersModule} from './modules/vouchersModule'
import {transactionsModule} from './modules/transactionsModule'

const store=()=>{
  return new Vuex.Store({
    modules:{
      app:appModule,
      admin:adminModule,
      store:storeModule,
      members:membersModule,
      vouchers:vouchersModule,
      transactions:transactionsModule
    }
  })
} 
  
export default store