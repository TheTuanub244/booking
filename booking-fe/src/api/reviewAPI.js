import axios from "axios"

export const createReview = async (data) => {
    const respone = await axios.post("http://localhost:8000/review/createReview", data) //data = { userId, roomId, rating, reviewText, reviewType }
    return respone.data
}
export const editReview = async () => {
    
}