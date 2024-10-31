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
export const findRoomByProperty = async (propertyId) => {
    try{       
        
        const respone = await axios.post("http://localhost:8000/room/getRoomWithProperty", {propertyId})
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}
export const updateImageForRoom = async (roomId, image) => {
    try{       
        
        const respone = await axios.put("http://localhost:8000/room/updateImageForRoom", {roomId, image})
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}