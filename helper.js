import { storage } from './firebaseInstance'
import dayjs from 'dayjs'

const storageRef = storage.ref()

const genId = () => {
    return Math.random().toString(16).slice(2)
}

const convertDateFormat=(date)=>{
    return dayjs(date).format('YYYY/MM/DD HH:mm:ss')
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


export { genId, uploadImage,deleteImage, convertDateFormat}