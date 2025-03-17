import { useQuery } from "@tanstack/react-query"
import { Provider, User } from "../user/user.types"
import axiosInstance, { ApiResponse } from "./axiosInstance"

export const userApi = {
    checkEmailAlreadyExsists: async (email: string): Promise<ApiResponse<boolean>> => {
        return axiosInstance.post('/users/check-email-already-exists', { email }).then(response => response.data)
    },

    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        return axiosInstance.get<ApiResponse<User>>('/users').then(response => response.data)
    },
    signup: async (
        payload: {
            email: string,
            firstName: string,
            lastName: string,
            phoneNumber: string,
            accessCode: string,
            password?: string
            uid?: string
        },
    ): Promise<ApiResponse<User>> => {
        return axiosInstance.post<ApiResponse<User>>('/users/signup', payload).then(response => response.data)
    },
    getProviders: async (): Promise<ApiResponse<Provider[]>> => {
        return axiosInstance.get<ApiResponse<Provider[]>>('/providers').then(response => response.data)
    },
    syncBenefits: async (
        payload: {
            provider: string
            memberId: string
            groupNumber: string
        }
    ): Promise<void> => {
        await axiosInstance.post('/users/sync', payload).then(response => response.data)
    },
    uploadBenefitCard: async (file: File) => {
        const formData = new FormData()
        formData.append('file', file, file.name)
        return await axiosInstance.post('/users/upload-benefit-card', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'

            }
        }).then(response => response.data);

    }

}

export const useUserProfile = () => {
    return useQuery<User | null>({
        queryKey: ['user'], queryFn: async () => {
            try {
                const response = await userApi.getCurrentUser()
                return response.data
            } catch (e) {
                return null
            }
        },
        retry: 3,
        retryOnMount: false,
    })
}

export const useProviders = () => {
    return useQuery<Provider[]>({
        queryKey: ['providers'], queryFn: async () => {
            const response = await userApi.getProviders()
            return response.data
        },
    })
}

