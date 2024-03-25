__webpack_require__.r(__webpack_exports__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/esm/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/esm/index.esm.js");



const firebaseConfig = {
    apiKey: "AIzaSyBp3sZnAeS_9prc3WJ9KnVyFZ0B3S8XJBo",
    authDomain: "fir-7-1b64d.firebaseapp.com",
    projectId: "fir-7-1b64d",
    storageBucket: "fir-7-1b64d.appspot.com",
    messagingSenderId: "510626000971",
    appId: "1:510626000971:web:86933e669c1cfca4be1dce"
};


//init firebase app
(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig)

//init services
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)()

//collection ref
const colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, 'books')


//get collection data



//adding documents

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })

})



//deleting documents

const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc) (db, 'books', deleteBookForm.id.value)
    ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.deleteDoc)(docRef)
    .then(() =>{
        deleteBookForm.reset()
    })

})




;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(colRef, (snapshot) =>{
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    }) 
    console.log(books)
})

//# sourceURL=webpack://firebase/./src/index.js?