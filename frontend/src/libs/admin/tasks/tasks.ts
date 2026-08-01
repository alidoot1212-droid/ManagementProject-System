import { api } from '@/libs/api'

export const createTask = async (payload: any) => {
  try {
    const res = await api.post('/tasks/store', payload)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const getTask = async (id: number) => {
  try {
    const res = await api.get(`/tasks/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const updateTask = async ({ id, payload }: { id: number; payload: any }) => {
  try {
    const res = await api.post(`/tasks/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
