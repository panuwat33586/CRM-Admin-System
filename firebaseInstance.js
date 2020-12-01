import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBxpFzifw088APH1xINZBrHP-UITHoD8Hw",
    authDomain: "crm-system-d726b.firebaseapp.com",
    databaseURL: "https://crm-system-d726b.firebaseio.com",
    projectId: "crm-system-d726b",
    storageBucket: "crm-system-d726b.appspot.com",
    messagingSenderId: "57388866725",
    appId: "1:57388866725:web:01ea7305af2c4fa8fb814c",
    measurementId: "G-M3PCR0PQ49"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firebaseAuth=firebase.auth()
const firestore = firebase.firestore()
const storage=firebase.storage()

export { firestore,firebaseAuth,storage}