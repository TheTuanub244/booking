import axios from "axios"

export const getSessionByUser = async (id) => {
    const respone = await axios.get(`http://localhost:8000/session/getSessionByUser/${id}`)
    return respone.data
   
}
export const getSessionHistory = async(userId) => {
    const respone = await axios.get(`http://localhost:8000/session/getSessionHistory/${userId}`)
    return respone.data
    
}
export const checkSession = async(userId, accessToken) => {
    const respone = await axios.post(`http://localhost:8000/session/refreshAccessToken/${userId}`, {accessToken})
    return respone.data
}