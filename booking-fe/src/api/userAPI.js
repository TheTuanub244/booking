import axios from "axios"
export const signUp = async (user) => {
    try{       
                
        const respone = await axios.post("http://localhost:8000/user/sign-up-with-email", user)
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return "Email alread in use"
        
    }
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
export const signInWithGoogle = async (user) => {
    try{       
        const respone = await axios.post("http://localhost:8000/user/sign-in-with-google", user)
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        throw new Error(error.response ? error.response.data.message : 'Sign-in failed');
        
    }
}
export const signOut = async(userId) => {
    
    try{       
        const respone = await axios.post("http://localhost:8000/session/sign-out", {userId})
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        return respone
    }
}
export const resetPassword = async(user) => {
    
    try{       
        const respone = await axios.post("http://localhost:8000/user/reset-password", user)
        console.log(respone);
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        return respone
    }
}
export const checkEmail = async (email) => {
    
    try{       
        const respone = await axios.post("http://localhost:8000/user/check-email", {data: email})
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        return respone
        
    }
}
