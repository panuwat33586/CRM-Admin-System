import { storage } from './firebaseInstance'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const storageRef = storage.ref()

const saveStatePlugin= (store)=> {
    store.subscribe(
      (mutation, state) => localStorage.setItem('adminInfo', JSON.stringify(state.admin.adminInfo))
    )
  }


const genId = () => {
    return Math.random().toString(16).slice(2)
}

const convertDateFormat=(date,format)=>{
    return dayjs(date).format(format)
}


const dateDiffDuration=(date)=>{
    const today=dayjs()
    if(!date){
        date=0
    }
    date=dayjs(date)
    return today.from(date,true)
}
const convertToISOString=(date)=>{
    return dayjs(date).toISOString()
}
const genTransactionByDateInfo=(data)=>{
    const result=[]
    const dayInMonth=dayjs().daysInMonth()
    for(let i=1;i<=dayInMonth;i++){
        let day=dayjs().set('date',i).format('DD/MM/YYYY')
        if(data[day]){
            result.push([day,data[day].quantity])
        }else{
             result.push([day,0])
        }
    }
    return result
}

const uploadImage =(storeId,image,id,type) => {
    return new Promise(async(resolve,reject)=>{
        try{
            const imageRef = storageRef.child(`${type}/${storeId}/${type}${id}.jpg`)
            const metadata = {
                contentType: 'image/jpeg'
            }
            const snapshot = await imageRef.put(image,metadata)
            const url = await snapshot.ref.getDownloadURL()
            resolve(url)
        }catch(error){
              reject(error)
        }
    })
}

const deleteImage =(storeId,id,type)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const imageRef = storageRef.child(`${type}/${storeId}/${type}${id}.jpg`)
            await imageRef.delete()
            resolve('successfully delete image')
        }catch(error){
            reject(error)
        }
    })
}


export { 
    genId, 
    uploadImage,
    deleteImage, 
    convertDateFormat,
    dateDiffDuration,
    genTransactionByDateInfo,
    convertToISOString,
    saveStatePlugin
}