import axiosInstance from "../../utilities/axios/axiosInstance";

export const fetchDashboardresponse = async () =>{
    try{
        const response = await axiosInstance.get('superuser/admin-dashboard/')
        return response.data 
    }catch(error){
        throw(error)
    }
}