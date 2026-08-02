import data from '@/data/searchData'
import { api } from '@/libs/api'

export interface CreateTeamPayload {
  name: string
  code: string
  member_ids: number[]
}

export const createTeam = async (payload: CreateTeamPayload) => {
  try {
    const response = await api.post('/teams/store', payload)

    return response.data
  } catch (error) {
    console.error('Create team error:', error)
    throw error
  }
}

export const getTeamUpsertData = async () => {
  const response = await api.get('/teams/upsert-data')

  return response.data
}

export const showTeam = async (id: number | string) => {
  const response = await api.get(`/teams/show/${id}`)

  return response.data
}

export const updateTeam = async ({ id, data }: { id: number; data: any }) => {
  const response = await api.post(`/teams/update/${id}`, data)

  return response.data
}
