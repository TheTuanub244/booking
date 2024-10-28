import axios from "axios"

export const getSessionByUser = async (id) => {
    const respone = await axios.get(`http://localhost:8000/session/getSessionByUser/${id}`)
    return respone.data
   
}
export const createSessionForLoginWithGoogle = async(user) => {
    
}