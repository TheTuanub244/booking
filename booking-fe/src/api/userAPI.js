import axios from "axios"
export const signUp = async (user) => {
    try{       
        console.log(user);
        
        const respone = await axios.post("http://localhost:8000/user/sign-up-with-email", user, {
            withCredentials: true
        })
        return respone.data
    } catch(error){
        const respone = error.response.data.message
        
        return respone
        
    }
}
export const signUpWithGoogle = async () => {

}
export const signIn = async (user) => {
    
    try{       
        const respone = await axios.post("http://localhost:8000/user/sign-in", user, {withCredentials: true})
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}
export const signInWithGoogle = async (user) => {
    try{       
        const respone = await axios.post("http://localhost:8000/user/sign-in-with-google", user, {withCredentials: true})
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        return respone
        
    }
}
export const signOut = async(userId) => {
    
    try{       
        const respone = await axios.post("http://localhost:8000/session/sign-out", {userId}, {withCredentials: true})
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
export const updatePartnerAccount = async (partner) => {
    const respone = await axios.post("http://localhost:8000/user/updatePartnerAccount", {partner})
    return respone.data
}
export const updateInformationForGoogle = async (user) => {
    const respone = await axios.post("http://localhost:8000/user/updateInformationForGoogle", {user}, {
        withCredentials: true
    })
    return respone.data
}