import {firebaseAuth,firestore} from '../../firebaseInstance'

export const adminModule=({
    namespaced:true,
    state:{
       adminInfo:null
    },
    mutations:{
        setAdminInfo(state,info){
             state.adminInfo=info
        },
        clearAdminInfo(state){
            state.adminInfo=null
        }
    },
    actions:{
        signin({ commit }, { email, password }) {
            const promise = new Promise(async (resolve, reject) => {
              try {
                const { user } = await firebaseAuth.signInWithEmailAndPassword(email, password)
                const {docs}=await firestore.collection('admins').
                where('adminId','==',user.uid)
                .get()
                const adminProfile=docs.map(doc=>doc.data())[0]
                commit('setAdminInfo', adminProfile)
                resolve('login success')
              } catch (err) {
                console.log(err)
                commit('app/setNotification',
                {status:true,type:'error',message:'an error occured'}
                ,{root:true}
                )
                reject('fail to login')
              }
            })
            return promise
          }
        }
})
