import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
      createPersistedState({
      key: 'admin',
      paths: ["admin"],
      storage:{
          getItem:(key)=>{
            return localStorage.getItem(key)
          },
          setItem:(key,value)=>{return localStorage.setItem(key,value)},
          removeItem:(key)=>{return localStorage.removeItem(key)}
      },
    })(store)
  }