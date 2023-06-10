import axios from "axios";
import { BASE_URL } from "./adminService";

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const createMember = (memberData) => apiClient.post(`/members`, memberData);

export const getAllMembers = () => apiClient.get(`/members`);

export const getSingleMember = (memberId) => apiClient.get(`/members/${memberId}`);

export const updateMember = (memberData, memberId) => apiClient.put(`/members/${memberId}`, memberData)

export const deleteMember = (memberId) => apiClient.delete(`/members/${memberId}`)

//Request Food Api's

export const createNewRequestFood = (requestData, memberId) =>
    apiClient.post(`/members/${memberId}/request-food`, requestData)

export const getAllRequestedFoods = () => apiClient.get(`/request-food`)

export const getSingleRequestedFood = (requestId) =>
    apiClient.get(`/request-food/${requestId}`)

export const getAllRequestedFoodsByMember = (memberId) =>
    apiClient.get(`/members/${memberId}/request-food`)

export const deleteRequestedFood = (requestId) => apiClient.delete(`/request-food/${requestId}`)

export const updateRequestFood = (requestData, requestId) =>
    apiClient.put(`/request-food/${requestId}`, requestData)

//Enquiry Api's
export const createNewEnquiry = (enquiryData, memberId) =>
    apiClient.post(`/members/${memberId}/enquiries`, enquiryData)

export const getAllEnquiries = () => apiClient.get(`/enquiries`)

export const getAllEnquiriesByMember = (memberId) =>
    apiClient.get(`/members/${memberId}/enquiries`)

export const deleteEnquiry = (enquiryId) => apiClient.delete(`/enquiries/${enquiryId}`)

export const updateEnquiry = (enquiryData, enquiryId) =>
    apiClient.put(`/enquiries/${enquiryId}`, enquiryData)
