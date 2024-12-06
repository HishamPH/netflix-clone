
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyIQy9K_7DsUIq0rVYY11my_dmv6zpCCw",
  authDomain: "netflix-clone-18b34.firebaseapp.com",
  projectId: "netflix-clone-18b34",
  storageBucket: "netflix-clone-18b34.appspot.com",
  messagingSenderId: "356763263758",
  appId: "1:356763263758:web:bdcca10e55a295acf8ed5f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);



const signUp = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })
    }catch(e){
        console.log(e);
        alert(e);
    }
}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }catch(e){
        console.log(e);
        alert(e);
    }
}

const logout = async()=>{
    signOut(auth);
}

export {auth,db,login,signUp,logout}