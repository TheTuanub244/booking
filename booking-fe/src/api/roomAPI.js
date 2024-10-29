import axios from "axios";

export const findAvailableRoomWithSearch = async(data) => {
    try{       
        
        const respone = await axios.post("http://localhost:8000/room/findAvailableRoomWithSearch", data)
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}