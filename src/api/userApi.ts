import { User } from "../user/user.types"
import axiosInstance, { ApiResponse } from "./axiosInstance"

export const userApi = {
    checkEmailAlreadyExsists: async (email: string): Promise<ApiResponse<boolean>> => {
        // return axiosInstance.post('/users/signup', { email }).then(response => response.data)

        return {
            data: false,
            message: 'email already exists',
            status: 200,
        }
    },
    signup: async (
        payload: {
            email: string,
            firstName: string,
            lastName: string,
            phoneNumber: string,
            accessCode: string,
            password?: string
        },
    ): Promise<ApiResponse<User>> => {
        return axiosInstance.post<ApiResponse<User>>('/users/signup', payload).then(response => response.data)
    },

}