
export const appModule=({
    namespaced:true,
    state:{
        loading:false
    },
    mutations:{
        setLoading(state,status){
            state.loading=status
        }
    }
})