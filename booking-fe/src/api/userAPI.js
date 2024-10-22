import axios from "axios"
export const signUp = async () => {

}
export const signUpWithGoogle = async () => {

}
export const signIn = async (user) => {
    try{
        const respone = await axios.post("http://localhost:8000/user/sign-in", user)
        
        return respone.data
    } catch(error){
        const respone = error.respone
        return respone.data.message
        
    }
}
export const signInWithGoogle = async () => {

}