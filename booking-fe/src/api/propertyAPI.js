import axios from "axios"

export const getAllProperty = async () => {
    const respone = await axios.get("http://localhost:8000/property/getAllProperty", {withCredentials: true})
    return respone.data
}
export const getPropertyById = async (id) => {
    const respone = await axios.get(`http://localhost:8000/property/getPropertyById/${id}`, {withCredentials: true})
    return respone.data    
    
}
export const getPropertyTypesByPlace = async (place) => {
    const respone = await axios.post('http://localhost:8000/property/getPropertyTypesByPlace', {place}, {withCredentials: true})
    
    return respone.data
}
export const getPropertyByTypeAndPlace = async (place, type) => {
    const respone = await axios.post('http://localhost:8000/property/getPropertyByTypeAndPlace', {place, type}, {withCredentials: true})
    
    return respone.data
}
export const getPropertyByRates = async () => {
    try{       
        const respone = await axios.get("http://localhost:8000/property/getPropertiesSortedByRate", {withCredentials: true})
        console.log(respone.data);
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}
export const getAllTypeOfProperties = async () => {
    const response = await axios.get("http://localhost:8000/property/getAllTypeOfProperties", {withCredentials: true})
    return response.data
}
export const updateImageForProperty = async (propertyId, image) => {
    try{       
        const respone = await axios.put("http://localhost:8000/property/updateImageForProperty", {propertyId, image}, {withCredentials: true})
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}
export const getPropertyNear = async (longitude, latitude) => {
    try{       
        const respone = await axios.post("http://localhost:8000/property/getPropertyNear", {longitude, latitude}, {withCredentials: true})
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}
export const getPropertyByplace = async (place) => {
    try{       
        const respone = await axios.post("http://localhost:8000/property/getPropertyByPlace", {place})
        
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}