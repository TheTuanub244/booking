import axios from "axios"
export const signUp = async (user) => {

}
export const signUpWithGoogle = async () => {

}
export const signIn = async (user) => {
    try{       
        const respone = await axios.post("http://localhost:8000/user/sign-in", user)
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        throw new Error(error.response ? error.response.data.message : 'Sign-in failed');
        
    }
}
export const signInWithGoogle = async () => {

}
export const updatePassword = async(password) => {
    try{       
        const respone = await axios.post("http://localhost:8000/user/update-password", {data: password})
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        throw new Error(error.response ? error.response.data.message : 'Sign-in failed');
        
    }
}
export const checkEmail = async (email) => {
    
    try{       
        const respone = await axios.post("http://localhost:8000/user/check-email", {data: email})
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        throw new Error(error.response ? error.response.data.message : 'Sign-in failed');
        
    }
}