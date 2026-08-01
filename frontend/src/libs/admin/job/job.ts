import { api } from '@/libs/api'

export const createJob = async (payload: any) => {
  try {
    const res = await api.post('/job/store', payload)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const getJob = async (id: number) => {
  try {
    const res = await api.get(`/job/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const updateJob = async (
  data: {
    id: number
  } & Record<string, any>
) => {
  const { id, ...payload } = data

  const res = await api.post(`/job/update/${id}`, payload)

  return res.data
}
