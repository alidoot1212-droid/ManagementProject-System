import { useQuery } from '@tanstack/react-query'

import { api } from '@/libs/api'

export const useGetStatuses = () => {
  return useQuery({
    queryKey: ['statuses'],

    queryFn: async () => {
      const response = await api.get('/status/index')

      return response.data.data
    }
  })
}
