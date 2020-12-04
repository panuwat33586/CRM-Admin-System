import {firestore} from '../../firebaseInstance'
import {genId,uploadImage,deleteImage} from '../../helper'

export const storeModule = ({
    namespaced: true,
    state: {
        storeInfo: null,
        newsList:[]
    },
    mutations: {
        setStoreInfo(state, info) {
            state.storeInfo = info
        },
        setNewsList(state,newsList){
            state.newsList=newsList
        },
        deleteNews(state,newsId){
            state.newsList=state.newsList.filter(news=>{
                return news.newsId!=newsId
            })
        }
    },
    actions: {
      async fetchStoreInfo({rootState,commit}){
         try{
            commit('app/setSkeletonLoader',true,{root:true})
            const {adminInfo}=rootState.admin
            const result=await firestore.collection('stores').doc(adminInfo.storeId).get()
            const info=result.data()
            commit('setStoreInfo',info)
            commit('app/setSkeletonLoader',false,{root:true})
         }catch(error){
             console.log(error)
         }
      },
      async editStoreInfo({rootState,commit},newInfo){
          try{
            const {adminInfo}=rootState.admin
            await firestore.collection('stores').doc(adminInfo.storeId).update({newInfo})
            commit('setStoreInfo',newInfo)
          }catch(error){
             console.log(error)
          }
      },
      async fetchStoreNews({rootState,commit}){
          try{
            const {adminInfo}=rootState.admin
             const {docs}=await firestore.collection('news')
             .where('storeId','==',adminInfo.storeId)
             .get()
             const newsList=docs.map(doc=>doc.data())
            commit('setNewsList',newsList)
          }catch(error){
              console.log(error)
          }
      },
      createStoreNews({rootState},{newsImage,header,description}){
          const promise=new Promise(async(resolve,reject)=>{
            try{
                const {adminInfo}=rootState.admin
                const newsId=genId()
                const imageUrl= await uploadImage(adminInfo.storeId,newsImage,newsId,'news')
                await firestore.collection('news')
                .doc(`${adminInfo.storeId}#${newsId}`)
                .set({
                storeId:adminInfo.storeId,
                newsId,
                header,
                description,
                imageUrl
                })
                resolve()
              }catch(error){
                  console.log(error)
                reject()
              }
          })
          return promise
      },
      async deleteStoreNews({rootState,commit},{newsId}){
        try{
           const {adminInfo}=rootState.admin
           await deleteImage(adminInfo.storeId,newsId,'news')
           await firestore.collection('news').doc(`${adminInfo.storeId}#${newsId}`).delete()
           commit('deleteNews',newsId)
        }catch(error){
           console.log(error)
        }
    },
     editStoreNews(context,{editedNews,newImage}){
        const promise=new Promise(async(resolve,reject)=>{
            const {newsId,storeId}=editedNews
            const newsCollection=firestore.collection('news').doc(`${storeId}#${newsId}`)
            try{
                if(newImage){
                    const newImageUrl=await uploadImage(storeId,newImage,newsId,'news')
                    const newData={...editedNews,imageUrl:newImageUrl}
                    await newsCollection.set(newData)
                    resolve('successfully edit news')
               }else{
                    await newsCollection.set(editedNews)
                    resolve('successfully edit news')
               }
            }catch(error){
                console.log(error)
                reject('error occured')
            }
        })
        return promise
    },
    },
})

