import axios from "axios";

export const findRoomWithSearch = async (province, check_in, check_out, capacity) => {
    try{       
        const respone = await axios.post("http://localhost:8000/room/findRoomWithProperty", {province, check_in, check_out, capacity})
        return respone.data
    } catch(error){
        const respone = error.response.data.message 

        throw new Error(error.response ? error.response.data.message : '');
        
    }
}