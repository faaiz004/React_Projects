import React, {useState,useEffect, useContext} from 'react'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import app from '../firebase'
import { GoogleAuthProvider } from 'firebase/auth';
const AuthContext = React.createContext() // creates an authentication provider with default value 0.
// provider actually provides the value.
const auth = getAuth(app)
export function useAuth(){
    return useContext(AuthContext);
} // provides auth context

export function AuthProvider(props) {
    const [currentUser,setCurrentUser] = useState(null);
    const value = {
        currentUser,
        setCurrentUser,
        signup,
        login,
        signInGoogle
    }
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
        })
        return unsubscribe;
    },[])
    async function signInGoogle(){
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth,provider)
        return credentials.user;
    }
    async function signup(email,password){
        try {
            const user = await createUserWithEmailAndPassword(auth,email,password);
            return user.user;
        } catch (error) {
            alert(error)
        }
    }
    async function login(email,password){
        try {
            const credentials = await signInWithEmailAndPassword(auth,email,password)
            return credentials.user
        } catch (error) {
            alert(error)
        }
    }
  return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
  )
}
