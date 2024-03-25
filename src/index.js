import { initializeApp } from "firebase/app";
import{
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where, orderBy,
    updateDoc, serverTimestamp
}from 'firebase/firestore'

import{
    getauth,
    createUserWithEmailAndPassword
} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBp3sZnAeS_9prc3WJ9KnVyFZ0B3S8XJBo",
    authDomain: "fir-7-1b64d.firebaseapp.com",
    projectId: "fir-7-1b64d",
    storageBucket: "fir-7-1b64d.appspot.com",
    messagingSenderId: "510626000971",
    appId: "1:510626000971:web:86933e669c1cfca4be1dce"
};


//init firebase app
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore()
const auth = getauth()

//collection ref
const colRef = collection(db, 'books')

//get collection data
onSnapshot(q, (snapshot) =>{
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    }) 
    console.log(books)
})


//queries
const q = query(colRef,  orderBy('createdAt'))





//adding documents

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })

    .then(() => {
        addBookForm.reset()
    })

})



//deleting documents

const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const docRef = doc (db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
    .then(() =>{
        deleteBookForm.reset()
    })

})


//udpating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc (db, 'books', updateForm.id.value)

    updateDoc(docRef,{
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })

})


// signing users up

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created:', cred.user)
        signupForm.reset()
    })

    .catch((err) =>{
        console.log(err.message)
    })
})
