import { api } from '@/libs/api'

export const getTaskUpsertData = async () => {
  try {
    const res = await api.get('/tasks/upsert-data')

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
