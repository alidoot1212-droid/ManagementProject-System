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

// export const updateTask = async ({ id, payload }: { id: number; payload: any }) => {
//   try {
//     console.log('UPDATE PAYLOAD:', id, payload)
//     const res = await api.post(`/tasks/update/${id}`, payload)

//     return res.data
//   } catch (error: any) {
//     throw error.response?.data || error
//   }
// }

export const updateTask = async ({ id, payload }: { id: number; payload: any }) => {
  console.log('3. API REQUEST:', {
    id,
    payload
  })

  const res = await api.post(`/tasks/update/${id}`, payload)

  console.log('4. API RESPONSE:', res.data.data)

  return res.data
}

export const syncTaskTag = async ({ id, tagId }: { id: number; tagId: number }) => {
  try {
    const res = await api.post(`/tasks/sync-tags/${id}`, { tag_id: tagId })

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const completeTask = async (id: number) => {
  try {
    const res = await api.post(`/tasks/${id}/complete`)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const getTags = async () => {
  try {
    const res = await api.get('/tags')

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const assignUser = async ({
  id,
  payload
}: {
  id: number
  payload: {
    team_member_id: number
    due_date: Date | null
  }
}) => {
  try {
    const res = await api.post(`/tasks/assign-user/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
