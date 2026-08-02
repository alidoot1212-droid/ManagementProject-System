import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createTeam, getTeamUpsertData, showTeam, updateTeam } from '@/libs/admin/team/team'

export function useCreateTeam() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teams']
      })

      toast.success('تیم با موفقیت ایجاد شد')
    },
    onError: error => {
      console.log(error)
    }
  })

  return { mutateAsync, isPending }
}

export const useGetTeamUpsertData = () => {
  return useQuery({
    queryKey: ['member-upsert-data'],
    queryFn: getTeamUpsertData
  })
}

export const useShowTeam = (id: number | string, enabled = true) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => showTeam(id),
    enabled: enabled && !!id
  })
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTeam,

    onSuccess: () => {
      toast.success('تیم با موفقیت ویرایش شد')

      queryClient.invalidateQueries({
        queryKey: ['teams']
      })
    },

    onError: () => {
      toast.error('خطا در ویرایش تیم')
    }
  })
}
